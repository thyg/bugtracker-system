/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // Gardez cette config si nécessaire
    // Cette option désactive l'optimisation automatique des images de Next.js.
    // Si vous l'avez mise pour des raisons spécifiques (hébergement statique, etc.), gardez-la.
    // Sinon, vous pouvez la supprimer pour bénéficier des optimisations SEO des images.
    //  avec le code suivant:
    
    // formats: ['image/webp', 'image/avif'], // Formats modernes
    // deviceSizes: [640, 750, 828, 1080, 1200, 1920], // Tailles responsive
    domains: ['votre-domaine.com', 'cdn.example.com'], // Ajoutez vos domaines d'images externes
  },
  // Nouvelles options SEO
  compress: true, // Compression gzip
  poweredByHeader: false, // Supprime le header "X-Powered-By"
  
  // Redirections SEO si nécessaire
  async redirects() {
    return [
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true, // 301 redirect
      },
    ]
  },
  
  // Headers SEO
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
    ]
  },
}

export default nextConfig