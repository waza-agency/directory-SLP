import Head from 'next/head';

const SignInPage = () => {
  return (
    <>
      <Head>
        <title>Sign In | Directory SLP</title>
        <meta name="description" content="Sign in to your account to access all features." />
      </Head>

      <div className="min-h-screen py-12 bg-gray-100">
        <div className="container max-w-lg mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h1>
              <p className="text-gray-600">Welcome back! Please sign in to your account.</p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <p className="text-yellow-800">Debugging Mode - Page loads successfully!</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInPage;