import { useEffect, useRef } from 'react';

/**
 * PageAgent widget - AI-powered GUI assistant for the site.
 * Connects to OpenAI through our proxy API to keep the key server-side.
 */
export default function PageAgentWidget() {
  const agentRef = useRef<any>(null);

  useEffect(() => {
    if (agentRef.current) return;
    agentRef.current = 'loading';

    import('page-agent').then(({ PageAgent }) => {
      const agent = new PageAgent({
        model: 'gpt-4o-mini',
        baseURL: '/api/page-agent-proxy',
        apiKey: 'proxy',
        language: 'en-US',
      });

      agent.panel.show();
      agentRef.current = agent;
    }).catch(err => {
      console.error('[PageAgent] Init failed:', err);
      agentRef.current = null;
    });
  }, []);

  return null;
}
