import Link from "next/link";
import { FileText, Github, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
          <div className="col-span-2 md:col-span-1 space-y-5">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-black">RecordHub</span>
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed">
              A modern and secure record management system built with Next.js.
            </p>
          </div>

          <div className="space-y-5">
            <h4 className="text-sm font-semibold text-black uppercase tracking-wider">Product</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/dashboard" className="text-gray-600 hover:text-black transition-colors">Dashboard</Link></li>
              <li><Link href="/records" className="text-gray-600 hover:text-black transition-colors">Records</Link></li>
              <li><Link href="/categories" className="text-gray-600 hover:text-black transition-colors">Categories</Link></li>
            </ul>
          </div>

          <div className="space-y-5">
            <h4 className="text-sm font-semibold text-black uppercase tracking-wider">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/docs" className="text-gray-600 hover:text-black transition-colors">Documentation</Link></li>
              <li><Link href="/api-docs" className="text-gray-600 hover:text-black transition-colors">API Reference</Link></li>
              <li><Link href="/changelog" className="text-gray-600 hover:text-black transition-colors">Changelog</Link></li>
            </ul>
          </div>

          <div className="space-y-5">
            <h4 className="text-sm font-semibold text-black uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/privacy" className="text-gray-600 hover:text-black transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-600 hover:text-black transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-600">
                Built with ❤️ by{" "}
                <span className="font-semibold text-black">Sayandeep Paul</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                SDE-1 at Anotech India Solutions (Ex)
              </p>
              <p className="text-xs text-gray-500 mt-1">
                © {new Date().getFullYear()} RecordHub. All rights reserved.
              </p>
            </div>
            <div className="flex items-center gap-5">
              <Link
                href="https://github.com/officialsayandeeppaul"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-black transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://linkedin.com/in/sayandeeppaul"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-black transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
