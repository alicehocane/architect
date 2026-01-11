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

      <footer className="bg-[#f5f5f7] pt-24 pb-12 px-6 sm:px-12 lg:px-20 mt-20 border-t border-[#d2d2d7]/40" role="contentinfo">
        <div className="max-w-[1440px] mx-auto">
          <nav className="flex items-center gap-2 mb-14 text-[12px] font-medium text-[#424245]" aria-label="Breadcrumb">
            <button onClick={() => navigateTo({ type: 'home' })} className="hover:text-[#0071e3] transition-colors">Directory Pakistan</button>
            <svg className="w-3 h-3 text-[#d2d2d7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            <span className="text-[#86868b]">
              {currentPage.type === 'home' ? 'Main Hub' : currentPage.type.charAt(0).toUpperCase() + currentPage.type.slice(1)}
            </span>
          </nav>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <nav className="space-y-5">
              <h4 className="text-[11px] font-bold text-[#1d1d1f] uppercase tracking-[0.15em]">Directory Services</h4>
              <ul className="text-[13px] text-[#424245] space-y-4">
                <li><button onClick={() => navigateTo({ type: 'home' })} className="hover:text-[#0071e3] transition-colors">Elite Firms</button></li>
                <li><button onClick={() => navigateTo({ type: 'top-rated' })} className="hover:text-[#0071e3] transition-colors">Top Rated</button></li>
                <li><button onClick={() => navigateTo({ type: 'cities' })} className="hover:text-[#0071e3] transition-colors">Cities</button></li>
                <li><button onClick={() => navigateTo({ type: 'calculator' })} className="hover:text-[#0071e3] transition-colors">Estimate Tool</button></li>
              </ul>
            </nav>
            <nav className="space-y-5">
              <h4 className="text-[11px] font-bold text-[#1d1d1f] uppercase tracking-[0.15em]">Major Design Hubs</h4>
              <ul className="text-[13px] text-[#424245] space-y-4">
                <li><button onClick={() => navigateTo({ type: 'city', slug: 'lahore' })} className="hover:text-[#0071e3] transition-colors">Lahore</button></li>
                <li><button onClick={() => navigateTo({ type: 'city', slug: 'rawalpindi' })} className="hover:text-[#0071e3] transition-colors">Rawalpindi</button></li>
                <li><button onClick={() => navigateTo({ type: 'city', slug: 'faisalabad' })} className="hover:text-[#0071e3] transition-colors">Faisalabad</button></li>
                <li><button onClick={() => navigateTo({ type: 'city', slug: 'gujranwala' })} className="hover:text-[#0071e3] transition-colors">Gujranwala</button></li>
              </ul>
            </nav>
            <nav className="space-y-5">
              <h4 className="text-[11px] font-bold text-[#1d1d1f] uppercase tracking-[0.15em]">Regional Studios</h4>
              <ul className="text-[13px] text-[#424245] space-y-4">
                <li><button onClick={() => navigateTo({ type: 'city', slug: 'multan' })} className="hover:text-[#0071e3] transition-colors">Multan</button></li>
                <li><button onClick={() => navigateTo({ type: 'city', slug: 'sialkot' })} className="hover:text-[#0071e3] transition-colors">Sialkot</button></li>
                <li><button onClick={() => navigateTo({ type: 'city', slug: 'bahawalpur' })} className="hover:text-[#0071e3] transition-colors">Bahawalpur</button></li>
                <li><button onClick={() => navigateTo({ type: 'city', slug: 'gujrat' })} className="hover:text-[#0071e3] transition-colors">Gujrat</button></li>
              </ul>
            </nav>
            <nav className="space-y-5">
              <h4 className="text-[11px] font-bold text-[#1d1d1f] uppercase tracking-[0.15em]">Corporate Info</h4>
              <ul className="text-[13px] text-[#424245] space-y-4">
                <li><button onClick={() => navigateTo({ type: 'about' })} className="hover:text-[#0071e3] transition-colors">About Directory</button></li>
                <li><button onClick={() => navigateTo({ type: 'privacy' })} className="hover:text-[#0071e3] transition-colors">Privacy Policy</button></li>
                <li><button onClick={() => navigateTo({ type: 'terms' })} className="hover:text-[#0071e3] transition-colors">Terms of Use</button></li>
                <li><button className="text-[#86868b] opacity-60 cursor-not-allowed">Architect Login</button></li>
              </ul>
            </nav>
          </div>

          <div className="pt-10 border-t border-[#d2d2d7]/50 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <p className="text-[12px] text-[#86868b]">Copyright © 2024 DesignDirectory. All rights reserved.</p>
              <div className="flex gap-4 text-[12px] text-[#424245]">
                <button onClick={() => navigateTo({ type: 'privacy' })} className="hover:underline">Privacy</button>
                <span className="text-[#d2d2d7]">|</span>
                <button onClick={() => navigateTo({ type: 'terms' })} className="hover:underline">Terms</button>
                <span className="text-[#d2d2d7]">|</span>
                <a href="/sitemap.xml" target="_blank" className="hover:underline">Sitemap</a>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-[#d2d2d7]/50 shadow-sm">
               <svg className="w-4 h-4 text-[#0071e3]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
               <span className="text-[12px] font-bold text-[#1d1d1f]">Pakistan (EN)</span>
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
