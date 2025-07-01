import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/lib/supabase-auth';
import { supabase } from '@/lib/supabase';
import { UserCircleIcon, CameraIcon } from '@heroicons/react/24/outline';

type ProfileFormValues = {
  name: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  zipCode: string;
  bio: string;
  occupation: string;
  interests: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [userInterests, setUserInterests] = useState<string[]>([]);
  const [newInterest, setNewInterest] = useState('');
  const [hasBusinessProfile, setHasBusinessProfile] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProfileFormValues>();

  useEffect(() => {
    // Redirect if not authenticated
    if (!user && !isLoading) {
      router.push('/signin?redirect=/account/profile');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user) {
      fetchUserProfile();
      checkBusinessProfile();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      console.log('Fetching profile for user ID:', user?.id);

      // Query user profile from Supabase
      const { data, error } = await supabase
        .from('users')
        .select("*")
        .eq('id', user?.id)
        .single();

      if (error) {
        console.error('Supabase query error:', error);
        throw error;
      }

      console.log('User profile data received:', data);

      // Set profile image URL if available
      if (data.profile_picture_url) {
        setProfileImageUrl(data.profile_picture_url);
      }

      // Set interests array
      if (data.interests && Array.isArray(data.interests)) {
        setUserInterests(data.interests);
      }

      // Reset form with user data
      reset({
        name: data.name || '',
        phone: data.phone || '',
        address: data.address || '',
        city: data.city || '',
        country: data.country || '',
        zipCode: data.zip_code || '',
        bio: data.bio || '',
        occupation: data.occupation || '',
        interests: '',
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);

      // If no user found, create a new user record
      if (user && error.code === 'PGRST116') {
        try {
          console.log('Creating new user profile for:', user.id);

          // Create a new user record
          const { data: newUser, error: createError } = await supabase
            .from('users')
            .insert([
              {
                id: user.id,
                email: user.email,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              }
            ])
            .select()
            .single();

          if (createError) {
            console.error('Error creating user profile:', createError);
            throw createError;
          }

          console.log('Created new user profile:', newUser);

          // Reset form with empty data
          reset({
            name: '',
            phone: '',
            address: '',
            city: '',
            country: '',
            zipCode: '',
            bio: '',
            occupation: '',
            interests: '',
          });
        } catch (createError) {
          console.error('Failed to create user profile:', createError);
        }
      }
    }
  };

  const checkBusinessProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('business_profiles')
        .select("*")
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error checking business profile:', error);
        return;
      }

      setHasBusinessProfile(!!data);
    } catch (error) {
      console.error('Error checking business profile:', error);
    }
  };

  const handleProfileImageClick = () => {
    // Trigger file input click
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleProfileImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const file = e.target.files[0];
    setUploadingImage(true);
    setSubmitError(null);

    try {
      const fileExt = file.name.split.pop();
      const fileName = `${user?.id}-profile-${Date.now()}.${fileExt}`;
      const filePath = fileName;

      console.log('Uploading file to path:', filePath);

      // Upload the file to Supabase Storage
      const { error: uploadError, data } = await supabase.storage
        .from('user-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) {
        console.error('Storage upload error:', uploadError);
        throw uploadError;
      }

      console.log('File uploaded successfully:', data);

      // Get the public URL of the uploaded file
      const { data: { publicUrl } } = supabase.storage
        .from('user-images')
        .getPublicUrl(filePath);

      console.log('Image URL:', publicUrl);

      // Update the profile image URL
      setProfileImageUrl(publicUrl);

      // Also update the user record with the new profile image URL
      const { error: updateError } = await supabase
        .from('users')
        .update({ profile_picture_url: publicUrl })
        .eq('id', user?.id);

      if (updateError) {
        console.error('Database update error:', updateError);
        throw updateError;
      }
    } catch (error) {
      console.error('Error uploading profile image:', error);
      setSubmitError('Failed to upload profile image. Please try again.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleAddInterest = () => {
    if (newInterest.trim() && !userInterests.includes(newInterest.trim())) {
      setUserInterests([...userInterests, newInterest.trim()]);
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (interestToRemove: string) => {
    setUserInterests(userInterests.filter(interest => interest !== interestToRemove));
  };

  const onSubmit = async (data: ProfileFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      console.log('Submitting profile data:', {
        ...data,
        profile_picture_url: profileImageUrl,
        interests: userInterests
      });

      // Use Supabase client directly instead of API route
      const { error } = await supabase
        .from('users')
        .update({
          name: data.name,
          phone: data.phone,
          address: data.address,
          city: data.city,
          country: data.country,
          zip_code: data.zipCode,
          bio: data.bio,
          occupation: data.occupation,
          interests: userInterests,
          profile_picture_url: profileImageUrl,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user?.id);

      if (error) {
        console.error('Error updating profile in Supabase:', error);
        throw new Error(error.message || 'Failed to update profile');
      }

      console.log('Profile updated successfully');
      setSubmitSuccess(true);

      // Refresh user profile data
      fetchUserProfile();
    } catch (error: any) {
      console.error('Error updating profile:', error);
      setSubmitError(error.message || 'Failed to update profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Don't render anything while checking auth status
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // If user is not logged in, don't render anything (redirect will happen)
  if (!user) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{'Edit Profile'} | Directory SLP</title>
        <meta name="description" content={'Update your profile information and address.'} />
      </Head>

      <div className="min-h-screen py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-6">
              <Link href="/account" className="text-primary hover:text-primary-dark mr-2">
                &larr; {'Back to Account'}
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">{'Edit Profile'}</h1>

              {hasBusinessProfile && (
                <Link href="/business/profile" className="ml-auto text-primary hover:text-primary-dark">
                  {'Edit Business Profile'} &rarr;
                </Link>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {submitError && (
                <div className="bg-red-50 text-red-700 p-4 border-b border-red-100">
                  {submitError}
                </div>
              )}

              {submitSuccess && (
                <div className="bg-green-50 text-green-700 p-4 border-b border-green-100">
                  {'Profile updated successfully!'}
                </div>
              )}

              <div className="flex justify-center mb-8">
                <div
                  className="relative h-32 w-32 cursor-pointer group"
                  onClick={handleProfileImageClick}
                >
                  {profileImageUrl ? (
                    <Image
                      src={profileImageUrl}
                      alt="Profile"
                      width={128}
                      height={128}
                      className="rounded-full object-cover h-32 w-32"
                    />
                  ) : (
                    <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center">
                      <UserCircleIcon className="h-20 w-20 text-gray-400" />
                    </div>
                  )}

                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <CameraIcon className="h-8 w-8 text-white" />
                  </div>

                  {uploadingImage && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-50">
                      <div className="animate-spin h-8 w-8 border-4 border-white border-t-transparent rounded-full"></div>
                    </div>
                  )}

                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleProfileImageChange}
                  />
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      {'Full Name'}
                    </label>
                    <input
                      id="name"
                      type="text"
                      {...register('name')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      {'Phone Number'}
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      {...register('phone')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-1">
                    {'Occupation'}
                  </label>
                  <input
                    id="occupation"
                    type="text"
                    {...register('occupation')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g. Software Engineer, Artist, Teacher"
                  />
                </div>

                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                    {'Biography'}
                  </label>
                  <textarea
                    id="bio"
                    {...register('bio')}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    {'Address'}
                  </label>
                  <input
                    id="address"
                    type="text"
                    {...register('address')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      {'City'}
                    </label>
                    <input
                      id="city"
                      type="text"
                      {...register('city')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                      {'Zip/Postal Code'}
                    </label>
                    <input
                      id="zipCode"
                      type="text"
                      {...register('zipCode')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                      {'Country'}
                    </label>
                    <input
                      id="country"
                      type="text"
                      {...register('country')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {'Interests'}
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {userInterests.map((interest, index) => (
                      <div
                        key={index}
                        className="bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-full text-sm flex items-center"
                      >
                        {interest}
                        <button
                          type="button"
                          className="ml-2 text-primary hover:text-primary-dark"
                          onClick={() => handleRemoveInterest(interest)}
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex">
                    <input
                      type="text"
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value)}
                      className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Add an interest (e.g. Reading, Photography)"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddInterest();
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleAddInterest}
                      className="px-4 py-2 bg-primary text-white rounded-r-lg hover:bg-primary-dark transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ }: { locale: string }) {
  try {
    return {
      props: {
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps for profile page:', error);
    return {
      props: {
        // Return empty translations object as fallback
        _nextI18Next: {
          initialI18nStore: {},
          initialLocale: locale,
        },
      },
    };
  }
}