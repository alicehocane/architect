import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CityPage from './pages/CityPage';
import ProfilePage from './pages/ProfilePage';
import AAKProfilePage from './pages/AAKProfilePage';
import TopRatedPage from './pages/TopRatedPage';
import CitiesPage from './pages/CitiesPage';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import CalculatorPage from './pages/CalculatorPage';
import SearchPalette from './components/SearchPalette';
import { Architect } from './types';

type Page = 
  | { type: 'home' } 
  | { type: 'city'; slug: string } 
  | { type: 'profile'; architect: Architect }
  | { type: 'aak-profile' }
  | { type: 'top-rated' }
  | { type: 'cities' }
  | { type: 'about' }
  | { type: 'privacy' }
  | { type: 'terms' }
  | { type: 'calculator' };

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>({ type: 'home' });
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // SEO: Global Website Schema
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "DesignDirectory Pakistan",
      "url": "https://designdirectory.pk",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://designdirectory.pk/#search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    });
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  // Handle Routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) {
        setCurrentPage({ type: 'home' });
        return;
      }
      
      const [type, slug] = hash.split('/');
      if (type === 'city') setCurrentPage({ type: 'city', slug });
      if (type === 'estimate-calculator') setCurrentPage({ type: 'calculator' });
      if (type === 'architects') {
        if (slug === 'aak-architects') {
          setCurrentPage({ type: 'aak-profile' });
          return;
        }
        import('./data').then(data => {
          const architect = data.getArchitectBySlug(slug);
          if (architect) setCurrentPage({ type: 'profile', architect });
          else setCurrentPage({ type: 'home' });
        });
      }
      if (type === 'top-rated') setCurrentPage({ type: 'top-rated' });
      if (type === 'cities') setCurrentPage({ type: 'cities' });
      if (type === 'about') setCurrentPage({ type: 'about' });
      if (type === 'privacy') setCurrentPage({ type: 'privacy' });
      if (type === 'terms') setCurrentPage({ type: 'terms' });
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: Page) => {
    if (page.type === 'home') window.location.hash = '';
    else if (page.type === 'city') window.location.hash = `city/${page.slug}`;
    else if (page.type === 'calculator') window.location.hash = 'estimate-calculator';
    else if (page.type === 'profile') window.location.hash = `architects/${page.architect.slug}`;
    else if (page.type === 'aak-profile') window.location.hash = 'architects/aak-architects';
    else if (page.type === 'top-rated') window.location.hash = 'top-rated';
    else if (page.type === 'cities') window.location.hash = 'cities';
    else if (page.type === 'about') window.location.hash = 'about';
    else if (page.type === 'privacy') window.location.hash = 'privacy';
    else if (page.type === 'terms') window.location.hash = 'terms';
    
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleArchitectClick = (architect: Architect) => {
    if (architect.slug === 'aak-architects' || architect.slug === 'aak-architects-1') {
      navigateTo({ type: 'aak-profile' });
    } else {
      navigateTo({ type: 'profile', architect });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfbfd]">
      <Header 
        onHomeClick={() => navigateTo({ type: 'home' })} 
        onSearchClick={() => setIsSearchOpen(true)}
      />
      
      <main className="flex-1">
        {currentPage.type === 'home' && (
          <HomePage onCityClick={(slug) => navigateTo({ type: 'city', slug })} onArchitectClick={handleArchitectClick} />
        )}
        {currentPage.type === 'city' && (
          <CityPage 
            citySlug={currentPage.slug} 
            onArchitectClick={handleArchitectClick}
            onBackClick={() => navigateTo({ type: 'cities' })}
          />
        )}
        {currentPage.type === 'calculator' && (
          <CalculatorPage />
        )}
        {currentPage.type === 'profile' && (
          <ProfilePage 
            architect={currentPage.architect} 
            onBackClick={() => navigateTo({ type: 'home' })}
            onArchitectClick={handleArchitectClick}
          />
        )}
        {currentPage.type === 'aak-profile' && (
          <AAKProfilePage 
            onBackClick={() => navigateTo({ type: 'home' })} 
            onArchitectClick={handleArchitectClick}
          />
        )}
        {currentPage.type === 'top-rated' && (
          <TopRatedPage onArchitectClick={handleArchitectClick} />
        )}
        {currentPage.type === 'cities' && (
          <CitiesPage onCityClick={(slug) => navigateTo({ type: 'city', slug })} />
        )}
        {currentPage.type === 'about' && <AboutPage />}
        {currentPage.type === 'privacy' && <PrivacyPage />}
        {currentPage.type === 'terms' && <TermsPage />}
      </main>

      <footer className="bg-[#f5f5f7] pt-16 pb-8 px-6 mt-20 border-t border-[#d2d2d7]/40" role="contentinfo">
        <div className="max-w-[1024px] mx-auto">
          {/* SEO Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 mb-10 text-[12px] text-[#424245]" aria-label="Breadcrumb">
            <button onClick={() => navigateTo({ type: 'home' })} className="hover:text-black transition-colors">Architecture Directory</button>
            <svg className="w-3 h-3 text-[#86868b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            <span className="text-[#86868b]">
              {currentPage.type === 'home' ? 'Pakistan Hub' : currentPage.type.charAt(0).toUpperCase() + currentPage.type.slice(1)}
            </span>
          </nav>

          {/* SEO Optimized Link Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-14">
            <nav className="space-y-4">
              <h4 className="text-[11px] font-bold text-[#1d1d1f] uppercase tracking-[0.12em]">Directory Services</h4>
              <ul className="text-[12px] text-[#424245] space-y-3">
                <li><button onClick={() => navigateTo({ type: 'home' })} className="hover:underline hover:text-black">All Architectural Firms</button></li>
                <li><button onClick={() => navigateTo({ type: 'top-rated' })} className="hover:underline hover:text-black">Top Rated Architects</button></li>
                <li><button onClick={() => navigateTo({ type: 'cities' })} className="hover:underline hover:text-black">Browse by City</button></li>
                <li><button onClick={() => navigateTo({ type: 'calculator' })} className="hover:underline hover:text-black">Construction Cost Calculator</button></li>
              </ul>
            </nav>
            <nav className="space-y-4">
              <h4 className="text-[11px] font-bold text-[#1d1d1f] uppercase tracking-[0.12em]">Major Design Hubs</h4>
              <ul className="text-[12px] text-[#424245] space-y-3">
                <li><button onClick={() => navigateTo({ type: 'city', slug: 'lahore' })} className="hover:underline hover:text-black">Architects in Lahore</button></li>
                <li><button onClick={() => navigateTo({ type: 'city', slug: 'rawalpindi' })} className="hover:underline hover:text-black">Architects in Rawalpindi</button></li>
                <li><button onClick={() => navigateTo({ type: 'city', slug: 'faisalabad' })} className="hover:underline hover:text-black">Architects in Faisalabad</button></li>
                <li><button onClick={() => navigateTo({ type: 'city', slug: 'gujranwala' })} className="hover:underline hover:text-black">Architects in Gujranwala</button></li>
              </ul>
            </nav>
            <nav className="space-y-4">
              <h4 className="text-[11px] font-bold text-[#1d1d1f] uppercase tracking-[0.12em]">Regional Branches</h4>
              <ul className="text-[12px] text-[#424245] space-y-3">
                <li><button onClick={() => navigateTo({ type: 'city', slug: 'multan' })} className="hover:underline hover:text-black">Architects in Multan</button></li>
                <li><button onClick={() => navigateTo({ type: 'city', slug: 'sialkot' })} className="hover:underline hover:text-black">Architects in Sialkot</button></li>
                <li><button onClick={() => navigateTo({ type: 'city', slug: 'bahawalpur' })} className="hover:underline hover:text-black">Architects in Bahawalpur</button></li>
                <li><button onClick={() => navigateTo({ type: 'city', slug: 'gujrat' })} className="hover:underline hover:text-black">Architects in Gujrat</button></li>
              </ul>
            </nav>
            <nav className="space-y-4">
              <h4 className="text-[11px] font-bold text-[#1d1d1f] uppercase tracking-[0.12em]">Emerging Markets</h4>
              <ul className="text-[12px] text-[#424245] space-y-3">
                <li><button onClick={() => navigateTo({ type: 'city', slug: 'attock' })} className="hover:underline hover:text-black">Architects in Attock</button></li>
                <li><button onClick={() => navigateTo({ type: 'city', slug: 'rahim-yar-khan' })} className="hover:underline hover:text-black">Architects in Rahim Yar Khan</button></li>
                <li><button onClick={() => navigateTo({ type: 'city', slug: 'jhelum' })} className="hover:underline hover:text-black">Architects in Jhelum</button></li>
                <li><button onClick={() => navigateTo({ type: 'city', slug: 'sheikhupura' })} className="hover:underline hover:text-black">Architects in Sheikhupura</button></li>
              </ul>
            </nav>
          </div>

          {/* Legal & Copyright */}
          <div className="pt-8 border-t border-[#d2d2d7]/50 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <p className="text-[11px] text-[#86868b]">Copyright © 2024 DesignDirectory Pakistan. Professional Directory for elite architects.</p>
              <div className="flex gap-4 text-[11px] text-[#424245]">
                <button onClick={() => navigateTo({ type: 'privacy' })} className="hover:underline">Privacy Policy</button>
                <span className="text-[#d2d2d7]">|</span>
                <button onClick={() => navigateTo({ type: 'terms' })} className="hover:underline">Terms of Service</button>
                <span className="text-[#d2d2d7]">|</span>
                <button className="hover:underline opacity-60">Architectural Site Map</button>
              </div>
            </div>
            <div className="flex items-center gap-2 cursor-default select-none">
               <span className="text-[11px] font-medium text-[#1d1d1f]">Pakistan (English)</span>
               <svg className="w-4 h-4 text-[#86868b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            </div>
          </div>
        </div>
      </footer>

      <SearchPalette 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectArchitect={handleArchitectClick}
        onSelectCity={(slug) => navigateTo({ type: 'city', slug })}
      />
    </div>
  );
};

export default App;
