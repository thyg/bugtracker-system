import { Metadata } from 'next'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: string
}

export function generateSEOMetadata({
  title,
  description,
  image,
  url,
  type = 'website'
}: SEOProps): Metadata {
  const siteName = "Bug Tracker Pro"
  const defaultDescription = "Plateforme professionnelle de suivi et gestion des bugs"
  const defaultImage = "/images/og-default.jpg"
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.votre-bug-tracker.com'
  
  const fullTitle = title ? `${title} | ${siteName}` : siteName
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl
  
  return {
    metadataBase: new URL(siteUrl), // ✨ Ajout de metadataBase
    title: fullTitle,
    description: description || defaultDescription,
    
    openGraph: {
      type: type as any,
      title: fullTitle,
      description: description || defaultDescription,
      url: fullUrl,
      siteName,
      images: [
        {
          url: image || defaultImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: description || defaultDescription,
      images: [image || defaultImage],
    },
    
    alternates: {
      canonical: fullUrl,
    },
    
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}