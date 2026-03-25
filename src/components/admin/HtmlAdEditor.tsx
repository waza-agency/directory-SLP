import React, { useState, useEffect } from 'react';
import { SponsorAd, AdPlacement, LinkTarget } from '@/types/supabase';

interface HtmlAdEditorProps {
  ad?: Partial<SponsorAd>;
  onSave: (ad: Partial<SponsorAd>) => void;
  onCancel: () => void;
}

const AD_WIDTHS = [
  { value: '100%', label: 'Full Width (100%)' },
  { value: '90%', label: '90% Width' },
  { value: '728px', label: 'Leaderboard (728px)' },
  { value: '300px', label: 'Rectangle (300px)' },
  { value: '160px', label: 'Small Rectangle (160px)' },
  { value: '320x50', label: 'Mobile Banner (320x50)' },
];

const PLACEMENTS: { value: AdPlacement; label: string }[] = [
  { value: 'top', label: 'Top (after header)' },
  { value: 'middle', label: 'Middle (between sections)' },
  { value: 'bottom', label: 'Bottom (before footer)' },
];

export default function HtmlAdEditor({ ad, onSave, onCancel }: HtmlAdEditorProps) {
  const [formData, setFormData] = useState({
    name: ad?.name || '',
    description: ad?.description || '',
    ad_type: ad?.ad_type || 'html' as 'html' | 'image',
    html_content: ad?.html_content || '',
    image_url: ad?.image_url || '',
    image_alt: ad?.image_alt || '',
    link_url: ad?.link_url || '',
    link_target: ad?.link_target || '_blank' as LinkTarget,
    width: ad?.width || '100%',
    height: (ad as { height?: string })?.height || '',
    placement: ad?.placement || 'middle' as AdPlacement,
    priority: ad?.priority || 0,
    active: ad?.active !== false,
    start_date: ad?.start_date || '',
    end_date: ad?.end_date || '',
    impressions_limit: ad?.impressions_limit || '',
    rotation_group: ad?.rotation_group || '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [previewMode, setPreviewMode] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (formData.ad_type === 'html' && !formData.html_content.trim()) {
      newErrors.html_content = 'HTML content is required';
    }
    if (formData.ad_type === 'image' && !formData.image_url.trim()) {
      newErrors.image_url = 'Image URL is required';
    }
    if (formData.link_url && !isValidUrl(formData.link_url)) {
      newErrors.link_url = 'Invalid URL';
    }
    if (formData.impressions_limit && isNaN(Number(formData.impressions_limit))) {
      newErrors.impressions_limit = 'Must be a number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSave({
        ...formData,
        impressions_limit: formData.impressions_limit ? Number(formData.impressions_limit) : null,
      });
    }
  };

  const renderAdPreview = () => {
    const baseStyles = `display: block; width: ${formData.width}; max-width: 100%; margin: 0 auto;`;
    
    if (formData.ad_type === 'html') {
      return (
        <div
          style={{ ...styles.previewContainer, width: formData.width }}
          dangerouslySetInnerHTML={{ __html: formData.html_content }}
        />
      );
    }

    const imgStyle = `${baseStyles} height: ${formData.height || 'auto'};`;
    const content = formData.link_url ? (
      <a href={formData.link_url} target={formData.link_target} style={styles.previewLink}>
        <img
          src={formData.image_url}
          alt={formData.image_alt || formData.name}
          style={{ ...styles.previewImage, height: formData.height || 'auto' }}
        />
      </a>
    ) : (
      <img
        src={formData.image_url}
        alt={formData.image_alt || formData.name}
        style={{ ...styles.previewImage, height: formData.height || 'auto' }}
      />
    );

    return <div style={{ ...styles.previewContainer, ...styles.previewImageContainer }}>{content}</div>;
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2 style={styles.title}>{ad?.id ? 'Edit Ad' : 'Create New Ad'}</h2>
          <div style={styles.tabs}>
            <button
              type="button"
              style={{ ...styles.tab, ...(previewMode ? {} : styles.tabActive) }}
              onClick={() => setPreviewMode(false)}
            >
              Editor
            </button>
            <button
              type="button"
              style={{ ...styles.tab, ...(previewMode ? styles.tabActive : {}) }}
              onClick={() => setPreviewMode(true)}
            >
              Preview
            </button>
          </div>
        </div>

        {previewMode ? (
          <div style={styles.previewWrapper}>
            <p style={styles.previewLabel}>Ad Preview:</p>
            <div style={styles.emailPreview}>
              <div style={styles.emailHeader}>
                <span>San Luis Way Weekly</span>
              </div>
              <div style={styles.emailBody}>
                <div style={styles.sectionPlaceholder}>Newsletter Content...</div>
                {renderAdPreview()}
                <div style={styles.sectionPlaceholder}>More Content...</div>
              </div>
              <div style={styles.emailFooter}>Footer</div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGrid}>
              <div style={styles.field}>
                <label style={styles.label}>Ad Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={styles.input}
                  placeholder="Summer Sale Banner"
                />
                {errors.name && <span style={styles.error}>{errors.name}</span>}
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Description</label>
                <input
                  type="text"
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={styles.input}
                  placeholder="Optional description"
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Ad Type *</label>
                <div style={styles.radioGroup}>
                  <label style={styles.radioLabel}>
                    <input
                      type="radio"
                      checked={formData.ad_type === 'html'}
                      onChange={() => setFormData({ ...formData, ad_type: 'html' })}
                    />
                    <span style={styles.radioText}>HTML Code</span>
                  </label>
                  <label style={styles.radioLabel}>
                    <input
                      type="radio"
                      checked={formData.ad_type === 'image'}
                      onChange={() => setFormData({ ...formData, ad_type: 'image' })}
                    />
                    <span style={styles.radioText}>Image Banner</span>
                  </label>
                </div>
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Placement *</label>
                <select
                  value={formData.placement}
                  onChange={(e) => setFormData({ ...formData, placement: e.target.value as AdPlacement })}
                  style={styles.select}
                >
                  {PLACEMENTS.map((p) => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {formData.ad_type === 'html' ? (
              <div style={styles.field}>
                <label style={styles.label}>HTML Content *</label>
                <textarea
                  value={formData.html_content}
                  onChange={(e) => setFormData({ ...formData, html_content: e.target.value })}
                  style={styles.textarea}
                  placeholder="<div style='background: #f0f0f0; padding: 20px; text-align: center;'>&#10;  <a href='https://example.com'>&#10;    <img src='banner.jpg' alt='Ad' />&#10;  </a>&#10;</div>"
                  rows={10}
                />
                {errors.html_content && <span style={styles.error}>{errors.html_content}</span>}
              </div>
            ) : (
              <>
                <div style={styles.formGrid}>
                  <div style={styles.field}>
                    <label style={styles.label}>Image URL *</label>
                    <input
                      type="url"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      style={styles.input}
                      placeholder="https://example.com/banner.jpg"
                    />
                    {errors.image_url && <span style={styles.error}>{errors.image_url}</span>}
                  </div>

                  <div style={styles.field}>
                    <label style={styles.label}>Alt Text</label>
                    <input
                      type="text"
                      value={formData.image_alt || ''}
                      onChange={(e) => setFormData({ ...formData, image_alt: e.target.value })}
                      style={styles.input}
                      placeholder="Ad description"
                    />
                  </div>

                  <div style={styles.field}>
                    <label style={styles.label}>Width</label>
                    <select
                      value={formData.width}
                      onChange={(e) => setFormData({ ...formData, width: e.target.value })}
                      style={styles.select}
                    >
                      {AD_WIDTHS.map((w) => (
                        <option key={w.value} value={w.value}>{w.label}</option>
                      ))}
                    </select>
                  </div>

                  <div style={styles.field}>
                    <label style={styles.label}>Height</label>
                    <input
                      type="text"
                      value={formData.height || ''}
                      onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                      style={styles.input}
                      placeholder="e.g., 100px or auto"
                    />
                  </div>
                </div>
              </>
            )}

            <div style={styles.field}>
              <label style={styles.label}>Link URL</label>
              <input
                type="url"
                value={formData.link_url || ''}
                onChange={(e) => setFormData({ ...formData, link_url: e.target.value })}
                style={styles.input}
                placeholder="https://sponsor.com/promo"
              />
              {errors.link_url && <span style={styles.error}>{errors.link_url}</span>}
            </div>

            <div style={styles.formGrid}>
              <div style={styles.field}>
                <label style={styles.label}>Rotation Group</label>
                <input
                  type="text"
                  value={formData.rotation_group || ''}
                  onChange={(e) => setFormData({ ...formData, rotation_group: e.target.value })}
                  style={styles.input}
                  placeholder="e.g., 'sidebar' or 'header'"
                />
                <small style={styles.hint}>Ads in the same group will rotate randomly</small>
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Priority</label>
                <input
                  type="number"
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) || 0 })}
                  style={styles.input}
                  min={0}
                />
                <small style={styles.hint}>Higher numbers show first</small>
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Start Date</label>
                <input
                  type="date"
                  value={formData.start_date || ''}
                  onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>End Date</label>
                <input
                  type="date"
                  value={formData.end_date || ''}
                  onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                  style={styles.input}
                />
              </div>
            </div>

            <div style={styles.formGrid}>
              <div style={styles.field}>
                <label style={styles.label}>Impression Limit</label>
                <input
                  type="number"
                  value={formData.impressions_limit || ''}
                  onChange={(e) => setFormData({ ...formData, impressions_limit: e.target.value })}
                  style={styles.input}
                  placeholder="Leave empty for unlimited"
                  min={0}
                />
                {errors.impressions_limit && <span style={styles.error}>{errors.impressions_limit}</span>}
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Status</label>
                <label style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={formData.active}
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  />
                  <span>Active</span>
                </label>
              </div>
            </div>

            <div style={styles.actions}>
              <button type="button" onClick={onCancel} style={styles.cancelBtn}>
                Cancel
              </button>
              <button type="submit" style={styles.saveBtn}>
                {ad?.id ? 'Update Ad' : 'Create Ad'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px',
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '700px',
    maxHeight: '90vh',
    overflow: 'auto',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
  },
  header: {
    padding: '20px',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    margin: 0,
    fontSize: '20px',
    fontWeight: 600,
    color: '#1f2937',
  },
  tabs: {
    display: 'flex',
    gap: '8px',
  },
  tab: {
    padding: '8px 16px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    backgroundColor: 'white',
    cursor: 'pointer',
    fontSize: '14px',
  },
  tabActive: {
    backgroundColor: '#3b82f6',
    color: 'white',
    borderColor: '#3b82f6',
  },
  form: {
    padding: '20px',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginBottom: '16px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  label: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#374151',
  },
  input: {
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
  },
  select: {
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
    backgroundColor: 'white',
  },
  textarea: {
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    fontSize: '13px',
    fontFamily: 'monospace',
    resize: 'vertical' as const,
    minHeight: '150px',
  },
  radioGroup: {
    display: 'flex',
    gap: '16px',
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    cursor: 'pointer',
  },
  radioText: {
    fontSize: '14px',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    marginTop: '6px',
  },
  hint: {
    fontSize: '12px',
    color: '#6b7280',
  },
  error: {
    fontSize: '12px',
    color: '#ef4444',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '20px',
    paddingTop: '20px',
    borderTop: '1px solid #e5e7eb',
  },
  cancelBtn: {
    padding: '10px 20px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    backgroundColor: 'white',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 500,
  },
  saveBtn: {
    padding: '10px 20px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#3b82f6',
    color: 'white',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 500,
  },
  previewWrapper: {
    padding: '20px',
  },
  previewLabel: {
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '12px',
  },
  emailPreview: {
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  emailHeader: {
    backgroundColor: '#C75B39',
    color: 'white',
    padding: '12px 16px',
    fontWeight: 600,
  },
  emailBody: {
    padding: '16px',
  },
  sectionPlaceholder: {
    padding: '20px',
    backgroundColor: '#f3f4f6',
    borderRadius: '4px',
    textAlign: 'center' as const,
    color: '#6b7280',
    marginBottom: '16px',
  },
  previewContainer: {
    padding: '16px',
    backgroundColor: '#f9fafb',
    borderRadius: '4px',
    border: '1px dashed #d1d5db',
    marginBottom: '16px',
  },
  previewImageContainer: {
    textAlign: 'center' as const,
  },
  previewLink: {
    display: 'block',
  },
  previewImage: {
    maxWidth: '100%',
    height: 'auto',
    display: 'block',
    margin: '0 auto',
  },
  emailFooter: {
    backgroundColor: '#1f2937',
    color: 'white',
    padding: '12px 16px',
    textAlign: 'center' as const,
    fontSize: '12px',
  },
};
