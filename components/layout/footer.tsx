import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"

const footerLinks = {
  product: [
    { name: "Error Monitoring", href: "/product/error-monitoring" },
    { name: "Performance", href: "/product/performance" },
    { name: "Session Replay", href: "/product/session-replay" },
    { name: "Integrations", href: "/integrations" },
  ],
  developers: [
    { name: "Documentation", href: "/docs" },
    { name: "API Reference", href: "/docs/api" },
    { name: "SDKs", href: "/docs/sdks" },
    { name: "Changelog", href: "/changelog" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ],
  support: [
    { name: "Help Center", href: "/help" },
    { name: "Community", href: "/community" },
    { name: "Status", href: "/status" },
    { name: "Security", href: "/security" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and description */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">BT</span>
              </div>
              <span className="text-white font-bold text-xl">BUG-TRACKER</span>
            </Link>
            <p className="text-slate-400 text-sm mb-4">
              Application monitoring software that helps developers fix issues faster.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-slate-400 hover:text-white">
                <Github className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-white">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-white">
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Footer links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-white text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Developers</h3>
            <ul className="space-y-2">
              {footerLinks.developers.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-white text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-white text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-white text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">© 2024 BUG-TRACKER. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-slate-400 hover:text-white text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-slate-400 hover:text-white text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
