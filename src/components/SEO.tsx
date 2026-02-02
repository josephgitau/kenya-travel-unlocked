import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  jsonLd?: Record<string, unknown>;
}

const defaultSEO = {
  title: 'Awili Safaris | Experience Kenya From Bush to Beach',
  description: 'Discover unforgettable safari experiences in Kenya. From the Maasai Mara to Diani Beach, book your dream African adventure with Kenya\'s most trusted tour operator.',
  keywords: 'Kenya safari, Maasai Mara, Diani Beach, African safari, Kenya tours, wildlife safari, Amboseli, Samburu, Nairobi National Park, Kenya holiday packages, safari packages Kenya, Awili Safaris',
  image: '/og-image.jpg',
  url: 'https://awilisafaris.co.ke',
};

const SEO = ({ 
  title = defaultSEO.title,
  description = defaultSEO.description,
  keywords = defaultSEO.keywords,
  image = defaultSEO.image,
  url = defaultSEO.url,
  type = 'website',
  jsonLd,
}: SEOProps) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const updateMeta = (name: string, content: string, property = false) => {
      const attribute = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (meta) {
        meta.setAttribute('content', content);
      } else {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    };

    updateMeta('description', description);
    updateMeta('keywords', keywords);
    updateMeta('og:title', title, true);
    updateMeta('og:description', description, true);
    updateMeta('og:image', image, true);
    updateMeta('og:url', url, true);
    updateMeta('og:type', type, true);
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', image);

    // Add JSON-LD structured data
    if (jsonLd) {
      let script = document.querySelector('script[type="application/ld+json"]');
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
    }

    // Cleanup function
    return () => {
      const script = document.querySelector('script[type="application/ld+json"]');
      if (script && jsonLd) {
        // Don't remove, just leave default
      }
    };
  }, [title, description, keywords, image, url, type, jsonLd]);

  return null; // This component doesn't render anything
};

// Pre-built JSON-LD schemas
export const createOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: 'Awili Safaris',
  description: 'Kenya\'s most trusted tour operator offering safari and beach holiday packages.',
  url: 'https://awilisafaris.co.ke',
  logo: 'https://awilisafaris.co.ke/logo.png',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Westlands Business Center',
    addressLocality: 'Nairobi',
    addressCountry: 'KE',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+254-722-792-069',
    contactType: 'customer service',
    availableLanguage: ['English', 'Swahili'],
  },
  sameAs: [
    'https://facebook.com/awilisafaris',
    'https://instagram.com/awilisafaris',
    'https://twitter.com/awilisafaris',
  ],
});

export const createPackageSchema = (pkg: {
  name: string;
  description: string;
  price: number;
  duration: string;
  location: string;
  image: string;
  rating?: number;
  reviewsCount?: number;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'TouristTrip',
  name: pkg.name,
  description: pkg.description,
  touristType: 'Safari enthusiast',
  offers: {
    '@type': 'Offer',
    price: pkg.price,
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
  itinerary: {
    '@type': 'ItemList',
    name: `${pkg.duration} Safari Experience`,
    description: `${pkg.duration} safari package in ${pkg.location}`,
  },
  image: pkg.image,
  ...(pkg.rating && {
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: pkg.rating,
      reviewCount: pkg.reviewsCount || 1,
    },
  }),
});

export const createFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

export default SEO;
