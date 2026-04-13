import { useTranslation } from 'next-i18next';

const COMMANDS = [
  { cmd: 'events', key: 'cmd_events' },
  { cmd: 'event <slug>', key: 'cmd_event' },
  { cmd: 'places', key: 'cmd_places' },
  { cmd: 'place <slug>', key: 'cmd_place' },
  { cmd: 'guides', key: 'cmd_guides' },
  { cmd: 'guide <slug>', key: 'cmd_guide' },
  { cmd: 'outdoor', key: 'cmd_outdoor' },
  { cmd: 'culture', key: 'cmd_culture' },
  { cmd: 'weather', key: 'cmd_weather' },
  { cmd: 'news', key: 'cmd_news' },
  { cmd: 'exchange-rates', key: 'cmd_exchange_rates' },
  { cmd: 'search <query>', key: 'cmd_search' },
] as const;

export default function CliCommandsTable() {
  const { t } = useTranslation('common');

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
          {t('cliPage.commandsTitle')}
        </h2>
        <p className="text-center text-gray-600 mb-8">{t('cliPage.commandsDesc')}</p>
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 font-semibold text-gray-700">{t('cliPage.cmdHeader')}</th>
                <th className="px-4 py-3 font-semibold text-gray-700">{t('cliPage.descHeader')}</th>
                <th className="px-4 py-3 font-semibold text-gray-700">{t('cliPage.flagsHeader')}</th>
              </tr>
            </thead>
            <tbody>
              {COMMANDS.map(({ cmd, key }, i) => (
                <tr key={key} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3 font-mono text-secondary whitespace-nowrap">{cmd}</td>
                  <td className="px-4 py-3 text-gray-600">{t(`cliPage.${key}`)}</td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">{t(`cliPage.${key}_flags`)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
