'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { Home09Icon } from '@hugeicons-pro/core-stroke-rounded';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/breadcrumb';

export default function AppBreadcrumb() {
  const pathname = usePathname();

  // Generate breadcrumb items from the current path
  const breadcrumbs = useMemo(() => {
    // Skip empty segments and remove trailing slashes
    const segments = pathname.split('/').filter((segment) => segment);

    // Remove 'dashboard' from the beginning if it exists
    const filteredSegments =
      segments[0] === 'dashboard' ? segments.slice(1) : segments;

    // Create an array of breadcrumb items with their respective paths
    return filteredSegments.map((segment, index) => {
      // Build the path for this breadcrumb (include dashboard in the path)
      const path = `/dashboard/${filteredSegments.slice(0, index + 1).join('/')}`;

      // Format the segment for display (capitalize, replace dashes with spaces)
      const label = segment
        .replace(/-/g, ' ')
        .replace(/^\w|\s\w/g, (char) => char.toUpperCase());

      return { path, label, isLast: index === filteredSegments.length - 1 };
    });
  }, [pathname]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/dashboard">
              <HugeiconsIcon
                className="size-4"
                icon={Home09Icon}
                strokeWidth={2}
              />
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {!!breadcrumbs.length && (
          <>
            <BreadcrumbSeparator />
            {breadcrumbs.map((breadcrumb) => (
              <BreadcrumbItem key={breadcrumb.path}>
                {breadcrumb.isLast ? (
                  <BreadcrumbPage className="font-medium">
                    {breadcrumb.label}
                  </BreadcrumbPage>
                ) : (
                  <>
                    <BreadcrumbLink asChild>
                      <Link className="font-medium" href={breadcrumb.path}>
                        {breadcrumb.label}
                      </Link>
                    </BreadcrumbLink>
                    <BreadcrumbSeparator />
                  </>
                )}
              </BreadcrumbItem>
            ))}
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
