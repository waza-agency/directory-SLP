import { useEffect, useRef } from 'react';

/** Override page-agent panel position: bottom-right instead of bottom-center */
const POSITION_CSS = `
  ._wrapper_gtdpc_1 {
    left: auto !important;
    right: 20px !important;
    bottom: 20px !important;
  }
`;

/**
 * PageAgent widget - AI-powered GUI assistant for the site.
 * Connects to OpenAI through our proxy API to keep the key server-side.
 */
export default function PageAgentWidget() {
  const agentRef = useRef<any>(null);

  useEffect(() => {
    if (agentRef.current) return;
    agentRef.current = 'loading';

    const style = document.createElement('style');
    style.textContent = POSITION_CSS;
    document.head.appendChild(style);

    import('page-agent').then(({ PageAgent }) => {
      const agent = new PageAgent({
        model: 'gpt-4o-mini',
        baseURL: '/api/page-agent-proxy',
        apiKey: 'proxy',
        language: 'en-US',
      });

      agent.panel.show();

      // Patch inline transforms to remove translateX(-50%) centering
      const wrapper = agent.panel.wrapper;
      if (wrapper) {
        const origShow = agent.panel.show.bind(agent.panel);
        const origHide = agent.panel.hide.bind(agent.panel);
        agent.panel.show = () => {
          origShow();
          wrapper.style.transform = 'translateY(0)';
        };
        agent.panel.hide = () => {
          origHide();
          wrapper.style.transform = 'translateY(20px)';
        };
        // Fix initial show transform
        wrapper.style.transform = 'translateY(0)';
      }

      agentRef.current = agent;
    }).catch(err => {
      console.error('[PageAgent] Init failed:', err);
      agentRef.current = null;
    });
  }, []);

  return null;
}
