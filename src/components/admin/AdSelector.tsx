import React, { useState, useEffect } from 'react';
import { SponsorAd } from '@/types/supabase';

interface AdSelectorProps {
  adminKey: string;
  selectedAds: Record<string, string>;
  onAdSelect: (placement: string, adId: string) => void;
}

interface AdOption {
  id: string;
  name: string;
  type: string;
  preview: string;
}

export default function AdSelector({ adminKey, selectedAds, onAdSelect }: AdSelectorProps) {
  const [ads, setAds] = useState<Record<string, AdOption[]>>({
    top: [],
    middle: [],
    bottom: []
  });
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState<string | null>(null);

  const placements: { key: 'top' | 'middle' | 'bottom'; label: string }[] = [
    { key: 'top', label: 'Top' },
    { key: 'middle', label: 'Middle' },
    { key: 'bottom', label: 'Bottom' }
  ];

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/newsletter/sponsor-ads-available', {
        headers: { 'x-admin-key': adminKey }
      });
      const data = await res.json();
      
      const grouped: Record<string, AdOption[]> = {
        top: [],
        middle: [],
        bottom: []
      };

      for (const ad of data.ads || []) {
        const option: AdOption = {
          id: ad.id,
          name: ad.name,
          type: ad.ad_type,
          preview: ad.ad_type === 'image' && ad.image_url 
            ? `<img src="${ad.image_url}" style="max-height: 60px;" />`
            : ad.html_content?.substring(0, 100) + '...'
        };
        grouped[ad.placement].push(option);
      }

      setAds(grouped);
    } catch (error) {
      console.error('Failed to fetch ads:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSelectedAdName = (placement: string) => {
    const adId = selectedAds[placement];
    if (!adId) return 'None';
    for (const ad of ads[placement] || []) {
      if (ad.id === adId) return ad.name;
    }
    return 'Unknown';
  };

  const renderAdPreview = (ad: AdOption) => {
    if (ad.type === 'image') {
      return (
        <div
          style={styles.previewImg}
          dangerouslySetInnerHTML={{ __html: ad.preview }}
        />
      );
    }
    return (
      <div style={styles.previewHtml}>
        <span style={styles.previewLabel}>HTML</span>
        <span style={styles.previewText}>{ad.preview}</span>
      </div>
    );
  };

  if (loading) {
    return <div style={styles.loading}>Loading ads...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h4 style={styles.title}>Sponsor Ads</h4>
        <p style={styles.subtitle}>Select ads to include in this newsletter</p>
      </div>

      <div style={styles.placements}>
        {placements.map(({ key, label }) => (
          <div key={key} style={styles.placementRow}>
            <div style={styles.placementInfo}>
              <span style={styles.placementLabel}>{label}</span>
              <span style={styles.selectedName}>{getSelectedAdName(key)}</span>
            </div>
            <div style={styles.selectorWrapper}>
              <button
                style={styles.selectBtn}
                onClick={() => setShowDropdown(showDropdown === key ? null : key)}
              >
                {selectedAds[key] ? 'Change' : 'Select Ad'}
              </button>
              {selectedAds[key] && (
                <button
                  style={styles.clearBtn}
                  onClick={() => onAdSelect(key, '')}
                  aria-label="Clear selected ad"
                >
                  ✕
                </button>
              )}
              {showDropdown === key && (
                <div style={styles.dropdown}>
                  <button
                    style={{
                      ...styles.dropdownItem,
                      ...(selectedAds[key] === '' ? styles.dropdownItemSelected : {})
                    }}
                    onClick={() => {
                      onAdSelect(key, '');
                      setShowDropdown(null);
                    }}
                  >
                    <span style={styles.dropdownItemName}>None</span>
                  </button>
                  {ads[key].length === 0 ? (
                    <div style={styles.noAds}>No ads available for {label}</div>
                  ) : (
                    ads[key].map(ad => (
                      <button
                        key={ad.id}
                        style={{
                          ...styles.dropdownItem,
                          ...(selectedAds[key] === ad.id ? styles.dropdownItemSelected : {})
                        }}
                        onClick={() => {
                          onAdSelect(key, ad.id);
                          setShowDropdown(null);
                        }}
                      >
                        <div style={styles.dropdownItemContent}>
                          <span style={styles.dropdownItemName}>{ad.name}</span>
                          {renderAdPreview(ad)}
                        </div>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <p style={styles.hint}>
        Ads are managed in the Sponsor Ads tab. Selected ads will appear in the generated newsletter.
      </p>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: '16px',
    backgroundColor: '#F0FDF4',
    borderRadius: '8px',
    border: '1px solid #86EFAC',
  },
  header: {
    marginBottom: '16px',
  },
  title: {
    margin: '0 0 4px 0',
    fontSize: '16px',
    fontWeight: 600,
    color: '#166534',
  },
  subtitle: {
    margin: 0,
    fontSize: '13px',
    color: '#15803D',
  },
  loading: {
    padding: '20px',
    textAlign: 'center' as const,
    color: '#6b7280',
  },
  placements: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  },
  placementRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 12px',
    backgroundColor: 'white',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
  },
  placementInfo: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '2px',
  },
  placementLabel: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#374151',
    textTransform: 'uppercase' as const,
  },
  selectedName: {
    fontSize: '14px',
    color: '#111827',
  },
  selectorWrapper: {
    position: 'relative' as const,
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },
  selectBtn: {
    padding: '6px 12px',
    borderRadius: '6px',
    border: '1px solid #86EFAC',
    backgroundColor: '#22C55E',
    color: 'white',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 500,
  },
  clearBtn: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    border: '1px solid #ef4444',
    backgroundColor: 'white',
    color: '#ef4444',
    cursor: 'pointer',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdown: {
    position: 'absolute' as const,
    top: '100%',
    right: 0,
    marginTop: '4px',
    minWidth: '280px',
    maxHeight: '300px',
    overflowY: 'auto' as const,
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    border: '1px solid #e5e7eb',
    zIndex: 100,
  },
  dropdownItem: {
    width: '100%',
    padding: '12px',
    border: 'none',
    backgroundColor: 'white',
    cursor: 'pointer',
    textAlign: 'left' as const,
    borderBottom: '1px solid #f3f4f6',
    display: 'block',
  },
  dropdownItemSelected: {
    backgroundColor: '#dcfce7',
  },
  dropdownItemContent: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '6px',
  },
  dropdownItemName: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#111827',
  },
  noAds: {
    padding: '12px',
    fontSize: '13px',
    color: '#6b7280',
    textAlign: 'center' as const,
  },
  previewImg: {
    maxHeight: '50px',
    overflow: 'hidden',
  },
  previewHtml: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  previewLabel: {
    fontSize: '10px',
    fontWeight: 600,
    padding: '2px 6px',
    backgroundColor: '#fef3c7',
    color: '#92400e',
    borderRadius: '4px',
  },
  previewText: {
    fontSize: '12px',
    color: '#6b7280',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
    maxWidth: '200px',
  },
  hint: {
    marginTop: '12px',
    fontSize: '12px',
    color: '#16a34a',
  },
};
