import { useTranslation } from 'next-i18next';

const ROWS = ['comp1', 'comp2', 'comp3', 'comp4', 'comp5'] as const;

export default function CliComparison() {
  const { t } = useTranslation('common');

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
          {t('cliPage.comparisonTitle')}
        </h2>
        <p className="text-center text-gray-600 mb-8">{t('cliPage.comparisonDesc')}</p>
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 font-semibold text-gray-700">{t('cliPage.compFeatureHeader')}</th>
                <th className="px-4 py-3 font-semibold text-secondary">{t('cliPage.compCliHeader')}</th>
                <th className="px-4 py-3 font-semibold text-secondary">{t('cliPage.compMcpHeader')}</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((key, i) => (
                <tr key={key} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3 font-medium text-gray-700">{t(`cliPage.${key}Feature`)}</td>
                  <td className="px-4 py-3 text-gray-600">{t(`cliPage.${key}Cli`)}</td>
                  <td className="px-4 py-3 text-gray-600">{t(`cliPage.${key}Mcp`)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
