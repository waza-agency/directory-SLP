import { useState, useEffect } from 'react';
import Link from 'next/link';

interface DebugInfo {
  success: boolean;
  debug?: any;
  error?: string;
}

export default function BlogDebugPage() {
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [initLoading, setInitLoading] = useState(false);
  const [initResult, setInitResult] = useState<any>(null);

  const fetchDebugInfo = async () => {
    try {
      const response = await fetch('/api/blog-debug');
      const data = await response.json();
      setDebugInfo(data);
    } catch (error) {
      setDebugInfo({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  const initializeBlogData = async () => {
    setInitLoading(true);
    try {
      const response = await fetch('/api/init-blog-data', {
        method: 'POST',
      });
      const data = await response.json();
      setInitResult(data);
      // Refresh debug info after initialization
      await fetchDebugInfo();
    } catch (error) {
      setInitResult({
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setInitLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchDebugInfo();
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Blog Debug - Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Blog Debug Information</h1>

        {/* Production Issue Alert */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-red-800 mb-3">
            🚨 Solucionando Error 404 en Producción
          </h2>
          <div className="text-red-700 space-y-2">
            <p><strong>Paso 1:</strong> Haz clic en "🧪 API: Complete Blog Route Tests" abajo</p>
            <p><strong>Paso 2:</strong> Si ves errores, haz clic en "🔍 API: Production Environment Check"</p>
            <p><strong>Paso 3:</strong> Verifica que supabase.hasUrl y supabase.hasAnonKey sean true</p>
            <p><strong>Paso 4:</strong> Si publishedPostsCount es 0, haz clic en "Initialize Blog Data"</p>
            <p><strong>Paso 5:</strong> Revisa la consola del navegador (F12) por errores CSP/CORS</p>
            <p><strong>Paso 6:</strong> Comparte los resultados conmigo para ayuda adicional</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">Debug Results</h2>
          <div className="mb-4">
            <button
              onClick={initializeBlogData}
              disabled={initLoading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {initLoading ? 'Initializing...' : 'Initialize Blog Data'}
            </button>
          </div>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        </div>

        {initResult && (
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-lg font-semibold mb-4">Initialization Result</h2>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
              {JSON.stringify(initResult, null, 2)}
            </pre>
          </div>
        )}

        {debugInfo?.success && debugInfo.debug?.samplePosts && (
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-lg font-semibold mb-4">Sample Posts Found</h2>
            <div className="space-y-4">
              {debugInfo.debug.samplePosts.map((post: any) => (
                <div key={post.id} className="border p-4 rounded">
                  <h3 className="font-medium">{post.title}</h3>
                  <p className="text-sm text-gray-600">Slug: {post.slug}</p>
                  <p className="text-sm text-gray-600">Status: {post.status}</p>
                  <p className="text-sm text-gray-600">Published: {post.published_at}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Test Link →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Navigation Links</h2>
          <div className="space-y-2">
            <Link href="/blog" className="block text-blue-600 hover:underline">
              → Go to Blog Index
            </Link>
            <Link href="/blog/san-luis-rey-tranvia" className="block text-blue-600 hover:underline">
              → Test Real Blog Post: San Luis Rey
            </Link>
            <Link href="/blog/la-gran-via" className="block text-blue-600 hover:underline">
              → Test Real Blog Post: La Gran Vía
            </Link>
            <Link href="/blog/corazon-de-xoconostle" className="block text-blue-600 hover:underline">
              → Test Real Blog Post: Corazón de Xoconostle
            </Link>
          </div>
        </div>

                <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">API Endpoints (Direct Test)</h2>
          <div className="space-y-2">
            <a
              href="/api/production-debug"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-red-600 hover:underline font-bold"
            >
              🔍 API: Production Environment Check
            </a>
                        <a
              href="/api/blog-debug"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-orange-600 hover:underline font-bold"
            >
              🔍 API: Blog Connection Debug
            </a>
            <a
              href="/api/test-blog-routes"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-purple-600 hover:underline font-bold"
            >
              🧪 API: Complete Blog Route Tests
            </a>
            <a
              href="/api/blog"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-green-600 hover:underline"
            >
              → API: Get All Posts
            </a>
                        <a
              href="/api/blog/san-luis-rey-tranvia"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-green-600 hover:underline"
            >
              → API: Get Specific Post (San Luis Rey)
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}