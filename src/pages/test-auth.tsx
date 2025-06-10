export default function TestAuth() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Test Auth Page</h1>
        <p className="text-gray-600">This is a test page to debug authentication issues.</p>
        <div className="mt-4 p-4 bg-green-100 rounded">
          <p className="text-green-800">✅ Page loads successfully!</p>
        </div>
      </div>
    </div>
  );
}