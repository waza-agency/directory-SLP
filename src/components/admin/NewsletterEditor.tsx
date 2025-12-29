import React, { useState, useEffect } from 'react';

interface NewsletterSection {
  id: string;
  name: string;
  type: string;
  html: string;
  editable: boolean;
}

interface NewsletterEditorProps {
  htmlContent: string;
  subject: string;
  adminKey: string;
  onSave: (html: string) => void;
  onExport: (html: string, subject: string) => void;
  onClose: () => void;
}

// Section patterns for parsing (client-side version)
const SECTION_MARKERS = [
  { id: 'opening', name: '👋 Opening Hook', pattern: /Hey there! 👋/i, editable: true },
  { id: 'weather', name: '🌦️ Weather Watch', pattern: /🌦️ Weather Watch/i, editable: true },
  { id: 'news', name: '📰 The Week in SLP', pattern: /📰 The Week in SLP/i, editable: true },
  { id: 'events', name: '🌟 Top Picks', pattern: /🌟 This Week's Top Picks/i, editable: true },
  { id: 'more_events', name: '🎭 More This Week', pattern: /🎭 More This Week/i, editable: true },
  { id: 'fact', name: '🧠 Did You Know?', pattern: /🧠 Did You Know/i, editable: true },
  { id: 'around_town', name: '🏙️ Around Town', pattern: /🏙️ Around Town/i, editable: true },
  { id: 'escape', name: '🌿 Weekend Escape', pattern: /🌿 Weekend Escape/i, editable: true },
  { id: 'coming_up', name: '📅 Coming Up', pattern: /📅 Coming Up/i, editable: true },
  { id: 'tip', name: '💡 Pro Tip', pattern: /💡 Expat Pro Tip/i, editable: true },
  { id: 'blog', name: '📖 From the Blog', pattern: /📖 From the Blog/i, editable: false },
  { id: 'comunidad', name: '🤝 Comunidad', pattern: /🤝 Comunidad/i, editable: true },
];

function parseSections(html: string): NewsletterSection[] {
  const sections: NewsletterSection[] = [];
  const markers = [...SECTION_MARKERS];

  for (let i = 0; i < markers.length; i++) {
    const marker = markers[i];
    const match = html.match(marker.pattern);

    if (match && match.index !== undefined) {
      // Find the start of the <tr> containing this section
      const beforeMatch = html.substring(0, match.index);
      const trStart = beforeMatch.lastIndexOf('<tr>');
      const startIndex = trStart !== -1 ? trStart : match.index;

      // Find the next section or end
      let endIndex = html.length;
      for (let j = i + 1; j < markers.length; j++) {
        const nextMatch = html.match(markers[j].pattern);
        if (nextMatch && nextMatch.index !== undefined) {
          const beforeNext = html.substring(0, nextMatch.index);
          const nextTrStart = beforeNext.lastIndexOf('<tr>');
          endIndex = nextTrStart !== -1 ? nextTrStart : nextMatch.index;
          break;
        }
      }

      const sectionHtml = html.substring(startIndex, endIndex).trim();
      if (sectionHtml.length > 20) {
        sections.push({
          id: marker.id,
          name: marker.name,
          type: marker.id,
          html: sectionHtml,
          editable: marker.editable
        });
      }
    }
  }

  return sections;
}

export default function NewsletterEditor({
  htmlContent,
  subject,
  adminKey,
  onSave,
  onExport,
  onClose
}: NewsletterEditorProps) {
  const [sections, setSections] = useState<NewsletterSection[]>([]);
  const [fullHtml, setFullHtml] = useState(htmlContent);
  const [regenerating, setRegenerating] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const parsed = parseSections(htmlContent);
    setSections(parsed);
  }, [htmlContent]);

  const handleRegenerateSection = async (section: NewsletterSection) => {
    setRegenerating(section.id);
    try {
      const res = await fetch('/api/newsletter/regenerate-section', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey
        },
        body: JSON.stringify({
          sectionType: section.type,
          sectionId: section.id,
          currentHtml: section.html
        })
      });

      const data = await res.json();
      if (data.success && data.html) {
        // Update the section
        const updatedSections = sections.map(s =>
          s.id === section.id ? { ...s, html: data.html } : s
        );
        setSections(updatedSections);

        // Update full HTML
        const newFullHtml = fullHtml.replace(section.html, data.html);
        setFullHtml(newFullHtml);
      } else {
        alert('Failed to regenerate section: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      alert('Error regenerating section');
      console.error(error);
    }
    setRegenerating(null);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      onSave(fullHtml);
    } finally {
      setSaving(false);
    }
  };

  const getPreviewText = (html: string): string => {
    // Strip HTML tags and get first 150 chars
    const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    return text.substring(0, 150) + (text.length > 150 ? '...' : '');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-5xl w-full max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b bg-gradient-to-r from-terracotta to-terracotta/80 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">Newsletter Editor</h2>
              <p className="text-sm opacity-90">{subject}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onExport(fullHtml, subject)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium"
              >
                ⬇ Export HTML
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 bg-white text-terracotta rounded-lg hover:bg-gray-100 text-sm font-medium disabled:opacity-50"
              >
                {saving ? 'Saving...' : '💾 Save Draft'}
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 text-sm"
              >
                ✕ Close
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex">
          {/* Sections List */}
          <div className="w-1/2 border-r overflow-y-auto p-4 space-y-3">
            <p className="text-sm text-gray-500 mb-4">
              Click on a section to expand it. Use "Regenerate" to create new content for that section.
            </p>

            {sections.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <p>No sections detected.</p>
                <p className="text-sm mt-2">The newsletter may use a different format.</p>
              </div>
            ) : (
              sections.map((section) => (
                <div
                  key={section.id}
                  className={`border rounded-lg overflow-hidden transition-all ${
                    expandedSection === section.id ? 'ring-2 ring-terracotta' : ''
                  }`}
                >
                  <div
                    className="p-3 bg-gray-50 flex items-center justify-between cursor-pointer hover:bg-gray-100"
                    onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{section.name.split(' ')[0]}</span>
                      <span className="font-medium text-gray-700">{section.name.substring(2)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {section.editable && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRegenerateSection(section);
                          }}
                          disabled={regenerating === section.id}
                          className={`px-3 py-1 text-xs rounded-full font-medium ${
                            regenerating === section.id
                              ? 'bg-gray-200 text-gray-500'
                              : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                          }`}
                        >
                          {regenerating === section.id ? '⟳ Regenerating...' : '🔄 Regenerate'}
                        </button>
                      )}
                      <span className="text-gray-400">
                        {expandedSection === section.id ? '▼' : '▶'}
                      </span>
                    </div>
                  </div>

                  {expandedSection === section.id && (
                    <div className="p-3 bg-white border-t">
                      <p className="text-sm text-gray-600 mb-2">Preview:</p>
                      <p className="text-sm text-gray-800 bg-gray-50 p-2 rounded">
                        {getPreviewText(section.html)}
                      </p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Preview Panel */}
          <div className="w-1/2 overflow-y-auto bg-gray-100">
            <div className="p-4">
              <h3 className="font-medium text-gray-700 mb-3">Live Preview</h3>
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <iframe
                  srcDoc={fullHtml}
                  className="w-full h-[600px] border-0"
                  title="Newsletter Preview"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
