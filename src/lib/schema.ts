import { getAbsoluteLocaleUrl } from 'astro:i18n';
import type { Lang } from '../i18n/ui';

const PHONE = '+971544381939';
const EMAIL = 'howida.yo.ho@gmail.com';

export function organizationSchema(lang: Lang) {
  const url = getAbsoluteLocaleUrl(lang, '');
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': `${url}#organization`,
    name: 'Howida design studio',
    alternateName: 'Howida Design Studio',
    description:
      lang === 'ar'
        ? 'استوديو تصميم داخلي في أبوظبي يقدم خدمات التصميم الداخلي والتصميم ثلاثي الأبعاد وتخطيط المساحات والتنفيذ المتكامل للمشاريع السكنية والتجارية في جميع أنحاء دولة الإمارات.'
        : 'Interior design studio based in Abu Dhabi, providing interior design, 3D visualization, space planning and turnkey execution for residential and commercial projects across the UAE.',
    url,
    logo: new URL('/apple-touch-icon.png', url).toString(),
    image: new URL('/og-image.jpg', url).toString(),
    telephone: PHONE,
    email: EMAIL,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Abu Dhabi',
      addressCountry: 'AE',
    },
    areaServed: {
      '@type': 'Country',
      name: 'United Arab Emirates',
    },
  };
}

export function serviceSchema(
  lang: Lang,
  service: { title: string; summary: string; slug: string },
) {
  const orgUrl = getAbsoluteLocaleUrl(lang, '');
  const serviceUrl = getAbsoluteLocaleUrl(lang, `services/${service.slug}`);
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.title,
    name: service.title,
    description: service.summary,
    url: serviceUrl,
    provider: {
      '@type': 'HomeAndConstructionBusiness',
      name: 'Howida design studio',
      url: orgUrl,
      telephone: PHONE,
      email: EMAIL,
    },
    areaServed: {
      '@type': 'Country',
      name: 'United Arab Emirates',
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[], lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: getAbsoluteLocaleUrl(lang, item.path),
    })),
  };
}
