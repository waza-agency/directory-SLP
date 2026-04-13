import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import CopyButton from './CopyButton';

const MCP_CONFIG = `{
  "mcpServers": {
    "SanLuisWay": {
      "command": "npx",
      "args": ["-y", "@sanluisway/mcp-server"]
    }
  }
}`;

const CURSOR_CONFIG = `{
  "mcpServers": {
    "SanLuisWay": {
      "command": "npx",
      "args": ["-y", "@sanluisway/mcp-server"]
    }
  }
}`;

const CLAUDE_CODE_CMD = 'claude mcp add sanluisway -- npx -y @sanluisway/mcp-server';

const WINDSURF_CONFIG = `{
  "mcpServers": {
    "SanLuisWay": {
      "command": "npx",
      "args": ["-y", "@sanluisway/mcp-server"]
    }
  }
}`;

const GEMINI_CONFIG = `{
  "mcpServers": {
    "SanLuisWay": {
      "command": "npx",
      "args": ["-y", "@sanluisway/mcp-server"]
    }
  }
}`;

const CODEX_CONFIG = `{
  "mcpServers": {
    "SanLuisWay": {
      "command": "npx",
      "args": ["-y", "@sanluisway/mcp-server"]
    }
  }
}`;

type ClientKey = 'claude' | 'cursor' | 'claudeCode' | 'windsurf' | 'gemini' | 'codex';

const CLIENTS: { key: ClientKey; i18nKey: string; config: string; isCmd?: boolean; descKey: string }[] = [
  { key: 'claude', i18nKey: 'clientClaude', config: MCP_CONFIG, descKey: 'quickStartDesc' },
  { key: 'cursor', i18nKey: 'clientCursor', config: CURSOR_CONFIG, descKey: 'cursorDesc' },
  { key: 'claudeCode', i18nKey: 'clientClaudeCode', config: CLAUDE_CODE_CMD, isCmd: true, descKey: 'claudeCodeDesc' },
  { key: 'windsurf', i18nKey: 'clientWindsurf', config: WINDSURF_CONFIG, descKey: 'windsurfDesc' },
  { key: 'gemini', i18nKey: 'clientGemini', config: GEMINI_CONFIG, descKey: 'geminiDesc' },
  { key: 'codex', i18nKey: 'clientCodex', config: CODEX_CONFIG, descKey: 'codexDesc' },
];

export default function ClientTabs() {
  const { t } = useTranslation('common');
  const [active, setActive] = useState<ClientKey>('claude');
  const current = CLIENTS.find((c) => c.key === active)!;

  return (
    <section className="py-16 bg-[#0d1117]">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          {t('mcpPage.otherClientsTitle')}
        </h2>
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {CLIENTS.map(({ key, i18nKey }) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                active === key
                  ? 'bg-secondary text-white'
                  : 'bg-[#161b22] text-[#8b949e] hover:text-white border border-[#30363d]'
              }`}
            >
              {t(`mcpPage.${i18nKey}`)}
            </button>
          ))}
        </div>
        <div>
          <p className="text-sm text-[#8b949e] mb-2">{t(`mcpPage.${current.descKey}`)}</p>
          {current.isCmd ? (
            <div className="bg-[#161b22] rounded-lg p-4 font-mono text-xs text-primary overflow-x-auto relative border border-[#30363d]">
              <CopyButton text={current.config} />
              <span className="text-[#8b949e]">$ </span>{current.config}
            </div>
          ) : (
            <div className="bg-[#161b22] rounded-lg p-4 font-mono text-xs text-[#e6edf3] overflow-x-auto relative border border-[#30363d]">
              <CopyButton text={current.config} />
              <pre>{current.config}</pre>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
