import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { IconSettingsPanel } from '@/components/icons/IconSettingsPanel'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import GuidePage from '@/pages/GuidePage'
import Home from '@/pages/Home'
import IconLibraryPage from '@/pages/IconLibraryPage'
import LicensePage from '@/pages/LicensePage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-transparent text-black">
        <SiteHeader />
        <div className="relative">
          <main className="mx-auto max-w-[1200px] px-2 lg:px-0">
            <Routes>
              <Route path="/" element={<IconLibraryPage />} />
              <Route path="/about" element={<Home />} />
              <Route path="/guide" element={<GuidePage />} />
              <Route path="/license" element={<LicensePage />} />
            </Routes>
          </main>

          <div className="fixed top-[55%] z-[30] hidden w-[240px] lg:block" style={{ left: 'calc(50% + 600px + 16px)' }}>
            <IconSettingsPanel />
          </div>
        </div>
        <SiteFooter />

        <div className="fixed bottom-4 left-4 right-4 z-40 lg:hidden">
          <IconSettingsPanel />
        </div>
      </div>
    </BrowserRouter>
  )
}
