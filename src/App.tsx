import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import AboutPage from '@/pages/AboutPage'
import GuidePage from '@/pages/GuidePage'
import IconLibraryPage from '@/pages/IconLibraryPage'
import IconRequestPage from '@/pages/IconRequestPage'
import LicensePage from '@/pages/LicensePage'
import SupportPage from '@/pages/SupportPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-transparent text-black">
        <SiteHeader />
        <div className="relative">
          <main className="mx-auto max-w-[1200px] px-2 lg:px-0">
            <Routes>
              <Route path="/" element={<IconLibraryPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/guide" element={<GuidePage />} />
              <Route path="/license" element={<LicensePage />} />
              <Route path="/request" element={<IconRequestPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/favorites" element={<Navigate to="/" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
        <SiteFooter />
      </div>
    </BrowserRouter>
  )
}
