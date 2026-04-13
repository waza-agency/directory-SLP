import { useTranslation } from 'next-i18next';

const TOOLS: { name: string; key: string; params: string }[] = [
  { name: 'get_events', key: 'tool_get_events', params: 'limit, offset' },
  { name: 'get_event', key: 'tool_get_event', params: 'slug' },
  { name: 'get_places', key: 'tool_get_places', params: 'category, limit' },
  { name: 'get_place', key: 'tool_get_place', params: 'slug' },
  { name: 'get_guides', key: 'tool_get_guides', params: 'limit' },
  { name: 'get_guide', key: 'tool_get_guide', params: 'slug' },
  { name: 'get_outdoor', key: 'tool_get_outdoor', params: 'limit' },
  { name: 'get_culture', key: 'tool_get_culture', params: 'limit' },
  { name: 'get_weather', key: 'tool_get_weather', params: '--' },
  { name: 'get_news', key: 'tool_get_news', params: 'limit, lang' },
  { name: 'get_exchange_rates', key: 'tool_get_exchange_rates', params: '--' },
  { name: 'search', key: 'tool_search', params: 'query, type' },
];

export default function ToolsTable() {
  const { t } = useTranslation('common');

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
          {t('mcpPage.toolsTitle')}
        </h2>
        <p className="text-center text-gray-500 mb-8">{t('mcpPage.toolsDesc')}</p>
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 font-semibold text-gray-700">{t('mcpPage.toolHeader')}</th>
                <th className="px-4 py-3 font-semibold text-gray-700">{t('mcpPage.descHeader')}</th>
                <th className="px-4 py-3 font-semibold text-gray-700">{t('mcpPage.paramsHeader')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {TOOLS.map(({ name, key, params }) => (
                <tr key={name} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-secondary">{name}</td>
                  <td className="px-4 py-3 text-gray-600">{t(`mcpPage.${key}`)}</td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">{params}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
