import React, { useState, useEffect } from 'react';
import { SponsorAd } from '@/types/supabase';
import HtmlAdEditor from './HtmlAdEditor';

interface SponsorAdsManagerProps {
  adminKey: string;
}

export default function SponsorAdsManager({ adminKey }: SponsorAdsManagerProps) {
  const [ads, setAds] = useState<SponsorAd[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editingAd, setEditingAd] = useState<Partial<SponsorAd> | undefined>();
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/newsletter/sponsor-ads', {
        headers: { 'x-admin-key': adminKey }
      });
      const data = await res.json();
      setAds(data.ads || []);
    } catch (error) {
      console.error('Failed to fetch ads:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingAd({});
    setShowEditor(true);
  };

  const handleEdit = (ad: SponsorAd) => {
    setEditingAd(ad);
    setShowEditor(true);
  };

  const handleSave = async (adData: Partial<SponsorAd>) => {
    const isUpdate = Boolean(editingAd?.id);
    try {
      const url = isUpdate
        ? `/api/newsletter/sponsor-ads/${editingAd!.id}`
        : '/api/newsletter/sponsor-ads';
      const res = await fetch(url, {
        method: isUpdate ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey
        },
        body: JSON.stringify(adData)
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message || `${isUpdate ? 'Update' : 'Create'} failed (${res.status})`);
      }
      setShowEditor(false);
      setEditingAd(undefined);
      fetchAds();
    } catch (error) {
      console.error('Failed to save ad:', error);
      const msg = error instanceof Error ? error.message : 'Unknown error';
      alert(`Failed to save ad: ${msg}`);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/newsletter/sponsor-ads/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-key': adminKey }
      });
      if (!res.ok) throw new Error('Failed to delete');
      setDeleteConfirm(null);
      fetchAds();
    } catch (error) {
      console.error('Failed to delete ad:', error);
      alert('Failed to delete ad. Please try again.');
    }
  };

  const toggleActive = async (ad: SponsorAd) => {
    try {
      const res = await fetch(`/api/newsletter/sponsor-ads/${ad.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey
        },
        body: JSON.stringify({ active: !ad.active })
      });
      if (!res.ok) throw new Error('Failed to update');
      fetchAds();
    } catch (error) {
      console.error('Failed to toggle active:', error);
    }
  };

  const filteredAds = ads.filter(ad => {
    if (filter === 'active') return ad.active;
    if (filter === 'inactive') return !ad.active;
    return true;
  });

  const getPlacementBadge = (placement: string) => {
    const colors: Record<string, string> = {
      top: '#3b82f6',
      middle: '#8b5cf6',
      bottom: '#10b981'
    };
    return {
      backgroundColor: colors[placement] || '#6b7280',
      color: 'white',
      padding: '2px 8px',
      borderRadius: '4px',
      fontSize: '12px',
      textTransform: 'capitalize' as const
    };
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString();
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p>Loading ads...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h3 style={styles.title}>Sponsor Ads</h3>
          <div style={styles.filterTabs}>
            {(['all', 'active', 'inactive'] as const).map(f => (
              <button
                key={f}
                style={{ ...styles.filterTab, ...(filter === f ? styles.filterTabActive : {}) }}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
                <span style={styles.badge}>
                  {f === 'all' ? ads.length : ads.filter(a => f === 'active' ? a.active : !a.active).length}
                </span>
              </button>
            ))}
          </div>
        </div>
        <button style={styles.createBtn} onClick={handleCreate}>
          + New Ad
        </button>
      </div>

      {filteredAds.length === 0 ? (
        <div style={styles.emptyState}>
          <p>No sponsor ads yet. Create your first ad to get started!</p>
        </div>
      ) : (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Type</th>
                <th style={styles.th}>Placement</th>
                <th style={styles.th}>Stats</th>
                <th style={styles.th}>Date Range</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAds.map(ad => (
                <tr key={ad.id} style={styles.tr}>
                  <td style={styles.td}>
                    <div style={styles.adName}>{ad.name}</div>
                    {ad.description && <div style={styles.adDesc}>{ad.description}</div>}
                    {ad.rotation_group && (
                      <span style={styles.rotationBadge}>Group: {ad.rotation_group}</span>
                    )}
                  </td>
                  <td style={styles.td}>
                    <span style={{
                      ...styles.typeBadge,
                      backgroundColor: ad.ad_type === 'html' ? '#fef3c7' : '#dbeafe',
                      color: ad.ad_type === 'html' ? '#92400e' : '#1e40af'
                    }}>
                      {ad.ad_type.toUpperCase()}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <span style={getPlacementBadge(ad.placement)}>{ad.placement}</span>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.stats}>
                      <span title="Impressions">
                        <span style={styles.statIcon}>👁</span> {ad.impressions_count.toLocaleString()}
                      </span>
                      <span title="Clicks">
                        <span style={styles.statIcon}>👆</span> {ad.clicks_count.toLocaleString()}
                      </span>
                      {ad.impressions_count > 0 && (
                        <span style={styles.ctr} title="Click-through rate">
                          {((ad.clicks_count / ad.impressions_count) * 100).toFixed(1)}% CTR
                        </span>
                      )}
                    </div>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.dateRange}>
                      <span>{formatDate(ad.start_date)}</span>
                      <span style={styles.dateSeparator}>to</span>
                      <span>{formatDate(ad.end_date)}</span>
                    </div>
                  </td>
                  <td style={styles.td}>
                    <button
                      style={{
                        ...styles.statusToggle,
                        backgroundColor: ad.active ? '#d1fae5' : '#fee2e2',
                        color: ad.active ? '#065f46' : '#991b1b'
                      }}
                      onClick={() => toggleActive(ad)}
                    >
                      {ad.active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.actions}>
                      <button style={styles.editBtn} onClick={() => handleEdit(ad)}>
                        Edit
                      </button>
                      {deleteConfirm === ad.id ? (
                        <div style={styles.deleteConfirm}>
                          <span>Delete?</span>
                          <button style={styles.confirmYes} onClick={() => handleDelete(ad.id)}>Yes</button>
                          <button style={styles.confirmNo} onClick={() => setDeleteConfirm(null)}>No</button>
                        </div>
                      ) : (
                        <button style={styles.deleteBtn} onClick={() => setDeleteConfirm(ad.id)}>
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showEditor && (
        <HtmlAdEditor
          ad={editingAd}
          onSave={handleSave}
          onCancel={() => {
            setShowEditor(false);
            setEditingAd(undefined);
          }}
        />
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    borderBottom: '1px solid #e5e7eb',
    flexWrap: 'wrap' as const,
    gap: '12px',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap' as const,
  },
  title: {
    margin: 0,
    fontSize: '18px',
    fontWeight: 600,
    color: '#1f2937',
  },
  filterTabs: {
    display: 'flex',
    gap: '8px',
  },
  filterTab: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    backgroundColor: 'white',
    cursor: 'pointer',
    fontSize: '13px',
    color: '#6b7280',
  },
  filterTabActive: {
    backgroundColor: '#3b82f6',
    color: 'white',
    borderColor: '#3b82f6',
  },
  badge: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: '2px 6px',
    borderRadius: '10px',
    fontSize: '11px',
    fontWeight: 600,
  },
  createBtn: {
    padding: '8px 16px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#10b981',
    color: 'white',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 500,
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
    color: '#6b7280',
  },
  spinner: {
    width: '32px',
    height: '32px',
    border: '3px solid #e5e7eb',
    borderTopColor: '#3b82f6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  emptyState: {
    padding: '40px 20px',
    textAlign: 'center' as const,
    color: '#6b7280',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    padding: '12px 16px',
    textAlign: 'left' as const,
    fontSize: '12px',
    fontWeight: 600,
    color: '#6b7280',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    backgroundColor: '#f9fafb',
    borderBottom: '1px solid #e5e7eb',
  },
  tr: {
    borderBottom: '1px solid #e5e7eb',
  },
  td: {
    padding: '16px',
    fontSize: '14px',
    color: '#374151',
  },
  adName: {
    fontWeight: 500,
    color: '#111827',
  },
  adDesc: {
    fontSize: '12px',
    color: '#6b7280',
    marginTop: '2px',
  },
  rotationBadge: {
    display: 'inline-block',
    marginTop: '4px',
    padding: '2px 6px',
    backgroundColor: '#f3f4f6',
    borderRadius: '4px',
    fontSize: '11px',
    color: '#6b7280',
  },
  typeBadge: {
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: 600,
  },
  stats: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
    fontSize: '13px',
  },
  statIcon: {
    marginRight: '4px',
  },
  ctr: {
    color: '#059669',
    fontWeight: 500,
    fontSize: '12px',
  },
  dateRange: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '2px',
    fontSize: '12px',
    color: '#6b7280',
  },
  dateSeparator: {
    color: '#9ca3af',
  },
  statusToggle: {
    padding: '4px 10px',
    borderRadius: '9999px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 500,
  },
  actions: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },
  editBtn: {
    padding: '6px 12px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    backgroundColor: 'white',
    cursor: 'pointer',
    fontSize: '13px',
    color: '#374151',
  },
  deleteBtn: {
    padding: '6px 12px',
    borderRadius: '6px',
    border: '1px solid #fca5a5',
    backgroundColor: 'white',
    cursor: 'pointer',
    fontSize: '13px',
    color: '#dc2626',
  },
  deleteConfirm: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
  },
  confirmYes: {
    padding: '4px 8px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#dc2626',
    color: 'white',
    cursor: 'pointer',
    fontSize: '12px',
  },
  confirmNo: {
    padding: '4px 8px',
    borderRadius: '4px',
    border: '1px solid #d1d5db',
    backgroundColor: 'white',
    cursor: 'pointer',
    fontSize: '12px',
  },
};
