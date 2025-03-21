import { useTranslation } from 'next-i18next';
import { Place } from '@/types';
import { useEffect } from 'react';
import PlaceImage from './PlaceImage';

interface PlaceModalProps {
  place: Place | null;
  onClose: () => void;
  activeTab?: 'description' | 'reviews' | 'call' | 'website';
  setActiveTab?: React.Dispatch<React.SetStateAction<'description' | 'reviews' | 'call' | 'website'>>;
}

export default function PlaceModal({ place, onClose, activeTab = 'description', setActiveTab }: PlaceModalProps) {
  const { t } = useTranslation('common');

  // Close on ESC key press
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // If no place is selected, don't render
  if (!place) return null;

  // Handle tab change
  const handleTabChange = (tab: 'description' | 'reviews' | 'call' | 'website') => {
    if (setActiveTab) {
      setActiveTab(tab);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Modal header with close button */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">{place.name}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b">
          <button 
            className={`px-4 py-2 ${activeTab === 'description' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
            onClick={() => handleTabChange('description')}
          >
            Description
          </button>
          <button 
            className={`px-4 py-2 ${activeTab === 'reviews' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
            onClick={() => handleTabChange('reviews')}
          >
            Reviews
          </button>
          <button 
            className={`px-4 py-2 ${activeTab === 'call' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
            onClick={() => handleTabChange('call')}
          >
            Call
          </button>
          <button 
            className={`px-4 py-2 ${activeTab === 'website' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
            onClick={() => handleTabChange('website')}
          >
            Website
          </button>
        </div>
        
        {/* Modal content with scrollable area */}
        <div className="flex-1 overflow-y-auto">
          {/* Image */}
          <div className="relative">
            <PlaceImage place={place} className="h-64" />
            
            {place.category && (
              <div className="absolute top-0 right-0 bg-gray-800 bg-opacity-75 text-white px-3 py-1 m-4 rounded-lg text-sm">
                {place.category}
              </div>
            )}
            {place.featured && (
              <div className="absolute top-0 left-0 bg-primary text-white px-3 py-1 m-4 rounded-lg">
                ★ Featured
              </div>
            )}
          </div>
          
          {/* Content based on active tab */}
          <div className="p-6">
            {activeTab === 'description' && (
              <>
                {place.description && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                    <p className="text-gray-600">{place.description}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Contact Info</h3>
                    
                    {place.address && (
                      <div className="flex items-start mb-3">
                        <svg className="w-5 h-5 text-gray-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p className="text-gray-600">{place.address}</p>
                      </div>
                    )}
                    
                    {place.phone && (
                      <div className="flex items-center mb-3">
                        <svg className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <a 
                          href={`tel:${place.phone}`} 
                          className="text-primary hover:underline"
                        >{place.phone}</a>
                      </div>
                    )}
                    
                    {place.website && (
                      <div className="flex items-center mb-3">
                        <svg className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                        <a 
                          href={place.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >Visit Website</a>
                      </div>
                    )}
                    
                    {place.instagram && (
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                        </svg>
                        <a 
                          href={`https://instagram.com/${place.instagram.replace('@', '')}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >{place.instagram}</a>
                      </div>
                    )}
                  </div>
                  
                  {place.hours && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Hours</h3>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        {place.hours.split('|').map((day, index) => (
                          <div key={index} className="mb-1 last:mb-0">
                            <p className="text-gray-600 text-sm">{day.trim()}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {place.latitude && place.longitude && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Location</h3>
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${place.latitude},${place.longitude}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                    >
                      View on Map
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                )}
              </>
            )}
            
            {activeTab === 'reviews' && (
              <div className="py-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Reviews</h3>
                {place.reviews && place.reviews.length > 0 ? (
                  <div className="space-y-4">
                    {place.reviews.map((review: { author: string; rating: number; text: string }, index: number) => (
                      <div key={index} className="border-b pb-4 last:border-0">
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">{review.author}</span>
                          <span className="text-amber-500">{'★'.repeat(review.rating)}</span>
                        </div>
                        <p className="text-gray-600">{review.text}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No reviews available yet. Be the first to leave a review!</p>
                )}
              </div>
            )}
            
            {activeTab === 'call' && (
              <div className="py-8 text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact by Phone</h3>
                {place.phone ? (
                  <>
                    <p className="text-gray-600 mb-4">Ready to call? Click below to connect directly:</p>
                    <a 
                      href={`tel:${place.phone}`} 
                      className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-lg"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {place.phone}
                    </a>
                  </>
                ) : (
                  <p className="text-gray-500">No phone number available for this place.</p>
                )}
              </div>
            )}
            
            {activeTab === 'website' && (
              <div className="py-8 text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Visit Website</h3>
                {place.website ? (
                  <>
                    <p className="text-gray-600 mb-4">Click below to visit the official website:</p>
                    <a 
                      href={place.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-lg"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Visit Website
                    </a>
                  </>
                ) : (
                  <p className="text-gray-500">No website available for this place.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 