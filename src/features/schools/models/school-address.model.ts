import type { SchoolSummary } from '../school.types';

export function formatSchoolAddress(school: SchoolSummary) {
  const addressLine = [school.address, school.addressNumber]
    .filter(Boolean)
    .join(', ');
  const cityLine = [school.district, school.city, school.state]
    .filter(Boolean)
    .join(' - ');

  return [addressLine, cityLine, school.postalCode].filter(Boolean).join(', ');
}

export function createGoogleMapsUrls(school: SchoolSummary) {
  const query = encodeURIComponent(formatSchoolAddress(school));

  return {
    embedUrl: `https://www.google.com/maps?q=${query}&output=embed`,
    openUrl: `https://www.google.com/maps/search/?api=1&query=${query}`,
  };
}
