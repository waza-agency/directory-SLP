import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/solid';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  const router = useRouter();

  // Auto-generate breadcrumbs from URL if not provided
  const breadcrumbs = items || generateBreadcrumbs(router.asPath);

  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `https://www.sanluisway.com${item.href}`
    }))
  };

  if (breadcrumbs.length <= 1) {
    return null; // Don't show breadcrumbs on homepage
  }

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Breadcrumb UI */}
      <nav aria-label="Breadcrumb" className={`flex items-center space-x-2 text-sm ${className}`}>
        <Link
          href="/"
          className="text-gray-500 hover:text-gray-700 transition-colors flex items-center"
          aria-label="Home"
        >
          <HomeIcon className="h-4 w-4" />
        </Link>

        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <React.Fragment key={item.href}>
              <ChevronRightIcon className="h-4 w-4 text-gray-400" />
              {isLast ? (
                <span className="text-gray-900 font-medium" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </>
  );
};

// Helper function to generate breadcrumbs from URL path
function generateBreadcrumbs(path: string): BreadcrumbItem[] {
  // Remove query parameters and hash
  const cleanPath = path.split('?')[0].split('#')[0];

  // Split path into segments
  const segments = cleanPath.split('/').filter(Boolean);

  const breadcrumbs: BreadcrumbItem[] = [];
  let currentPath = '';

  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;

    // Format the label (capitalize and replace hyphens)
    const label = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    breadcrumbs.push({
      label,
      href: currentPath
    });
  });

  return breadcrumbs;
}

export default Breadcrumbs;
