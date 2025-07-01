/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://www.votre-bug-tracker.com',
    generateRobotsTxt: true,
    sitemapSize: 7000,
    changefreq: 'daily',
    priority: 0.7,
    
    // Exclure les pages privées/admin
    exclude: [
      '/dashboard/*',
      '/settings/*',
      '/admin/*',
      '/test/*',
      '/forgot-password',
      '/logout'
    ],
    
    // Configuration robots.txt
    robotsTxtOptions: {
      policies: [
        {
          userAgent: '*',
          allow: '/',
          disallow: ['/dashboard', '/settings', '/admin', '/api'],
        },
      ],
      additionalSitemaps: [
        'https://www.votre-bug-tracker.com/sitemap.xml',
      ],
    },
    
    // Transformation des URLs
    transform: async (config, path) => {
      // Priorité plus élevée pour les pages importantes
      const highPriorityPages = ['/', '/pricing', '/product', '/contact']
      const mediumPriorityPages = ['/docs', '/help', '/questions', '/demo']
      
      let priority = 0.5
      if (highPriorityPages.includes(path)) {
        priority = 1.0
      } else if (mediumPriorityPages.includes(path)) {
        priority = 0.8
      }
      
      return {
        loc: path,
        changefreq: config.changefreq,
        priority,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      }
    },
  }