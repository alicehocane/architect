import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CityPage from './pages/CityPage';
import ProfilePage from './pages/ProfilePage';
import AAKProfilePage from './pages/AAKProfilePage';
import TopRatedPage from './pages/TopRatedPage';
import CitiesPage from './pages/CitiesPage';
import CategoriesPage from './pages/CategoriesPage';
import CategoryDetailsPage from './pages/CategoryDetailsPage';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import CalculatorPage from './pages/CalculatorPage';
import SitemapPage from './pages/SitemapPage';
import SearchPalette from './components/SearchPalette';
import { Architect } from './types';
import { getSitemapXML } from './sitemap';


type Page = 
  | { type: 'home' } 
  | { type: 'city'; slug: string } 
  | { type: 'profile'; architect: Architect }
  | { type: 'aak-profile' }
  | { type: 'top-rated' }
  | { type: 'cities' }
  | { type: 'categories' }
  | { type: 'category-details'; slug: string }
  | { type: 'about' }
  | { type: 'privacy' }
  | { type: 'terms' }
  | { type: 'calculator' }
  | { type: 'sitemap' };

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>({ type: 'home' });
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Synchronize state with URL Pathname
  const handleRouting = async () => {
    const path = window.location.pathname;
    
    if (path === '/' || !path) {
      setCurrentPage({ type: 'home' });
    } else if (path.startsWith('/city/')) {
      const slug = path.split('/')[2];
      setCurrentPage({ type: 'city', slug });
    } else if (path === '/categories') {
      setCurrentPage({ type: 'categories' });
    } else if (path.startsWith('/category/')) {
      const slug = path.split('/')[2];
      setCurrentPage({ type: 'category-details', slug });
    } else if (path === '/estimate-calculator') {
      setCurrentPage({ type: 'calculator' });
    } else if (path === '/sitemap') {
      setCurrentPage({ type: 'sitemap' });
    } else if (path.startsWith('/architects/')) {
      const slug = path.split('/')[2];
      if (slug === 'aak-architects') {
        setCurrentPage({ type: 'aak-profile' });
      } else {
        const { getArchitectBySlug } = await import('./data');
        const architect = getArchitectBySlug(slug);
        if (architect) setCurrentPage({ type: 'profile', architect });
        else setCurrentPage({ type: 'home' });
      }
    } else if (path === '/top-rated') {
      setCurrentPage({ type: 'top-rated' });
    } else if (path === '/cities') {
      setCurrentPage({ type: 'cities' });
    } else if (path === '/about') {
      setCurrentPage({ type: 'about' });
    } else if (path === '/privacy') {
      setCurrentPage({ type: 'privacy' });
    } else if (path === '/terms') {
      setCurrentPage({ type: 'terms' });
    } else {
      setCurrentPage({ type: 'home' });
    }
  };

  useEffect(() => {
    window.addEventListener('popstate', handleRouting);
    handleRouting(); // Initial load

    // Developer helper: Generate sitemap XML for copy-paste
    (window as any).getLatestSitemap = () => {
      console.log('--- GENERATING SITEMAP XML ---');
      console.log(getSitemapXML());
      console.log('--- END OF SITEMAP XML ---');
      return "Copied XML to console! Check your developer tools (F12).";
    };


    return () => window.removeEventListener('popstate', handleRouting);
  }, []);

  const navigateTo = (page: Page) => {
    let url = '/';
    if (page.type === 'home') url = '/';
    else if (page.type === 'city') url = `/city/${page.slug}`;
    else if (page.type === 'categories') url = '/categories';
    else if (page.type === 'category-details') url = `/category/${page.slug}`;
    else if (page.type === 'calculator') url = '/estimate-calculator';
    else if (page.type === 'sitemap') url = '/sitemap';
    else if (page.type === 'profile') url = `/architects/${page.architect.slug}`;
    else if (page.type === 'aak-profile') url = '/architects/aak-architects';
    else if (page.type === 'top-rated') url = '/top-rated';
    else if (page.type === 'cities') url = '/cities';
    else if (page.type === 'about') url = '/about';
    else if (page.type === 'privacy') url = '/privacy';
    else if (page.type === 'terms') url = '/terms';
    
    window.history.pushState({}, '', url);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleArchitectClick = (architect: Architect) => {
    if (architect.slug === 'aak-architects') {
      navigateTo({ type: 'aak-profile' });
    } else {
      navigateTo({ type: 'profile', architect });
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Architectorly Pakistan",
      "url": "https://architectorly.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://architectorly.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    });
    document.head.appendChild(script);
    return () => { if(document.head.contains(script)) document.head.removeChild(script); };
  }, []);

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
        {currentPage.type === 'categories' && (
          <CategoriesPage onCategoryClick={(slug) => navigateTo({ type: 'category-details', slug })} />
        )}
        {currentPage.type === 'category-details' && (
          <CategoryDetailsPage 
            categorySlug={currentPage.slug}
            onArchitectClick={handleArchitectClick}
            onBackClick={() => navigateTo({ type: 'categories' })}
          />
        )}
        {currentPage.type === 'calculator' && (
          <CalculatorPage />
        )}
        {currentPage.type === 'sitemap' && (
          <SitemapPage onCityClick={(slug) => navigateTo({ type: 'city', slug })} />
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
          <nav className="flex items-center gap-2 mb-10 text-[12px] text-[#424245]" aria-label="Breadcrumb">
            <button onClick={() => navigateTo({ type: 'home' })} className="hover:text-black transition-colors">Architecture Directory</button>
            <svg className="w-3 h-3 text-[#86868b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            <span className="text-[#86868b]">
              {currentPage.type === 'home' ? 'Pakistan Hub' : currentPage.type.charAt(0).toUpperCase() + currentPage.type.slice(1)}
            </span>
          </nav>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-14">
            <nav className="space-y-4">
              <h4 className="text-[11px] font-bold text-[#1d1d1f] uppercase tracking-[0.12em]">Directory Services</h4>
              <ul className="text-[12px] text-[#424245] space-y-3">
                <li><button onClick={() => navigateTo({ type: 'home' })} className="hover:underline hover:text-black">All Architectural Firms</button></li>
                <li><button onClick={() => navigateTo({ type: 'top-rated' })} className="hover:underline hover:text-black">Top Rated Architects</button></li>
                <li><button onClick={() => navigateTo({ type: 'cities' })} className="hover:underline hover:text-black">Browse by City</button></li>
                <li><button onClick={() => navigateTo({ type: 'categories' })} className="hover:underline hover:text-black">Professional Specialties</button></li>
                <li><button onClick={() => navigateTo({ type: 'calculator' })} className="hover:underline hover:text-black text-left">Construction Cost Calculator</button></li>

              </ul>
            </nav>
            <nav className="space-y-4">
              <h4 className="text-[11px] font-bold text-[#1d1d1f] uppercase tracking-[0.12em]">Major Design Hubs</h4>
              <ul className="text-[12px] text-[#424245] space-y-3">
                <li><button onClick={() => navigateTo({ type: 'city', slug: 'lahore' })} className="hover:underline hover:text-black">Architects in Lahore</button></li>
                <li><button onClick={() => navigateTo({ type: 'city', slug: 'karachi' })} className="hover:underline hover:text-black">Architects in Karachi</button></li>
                <li><button onClick={() => navigateTo({ type: 'city', slug: 'islamabad' })} className="hover:underline hover:text-black">Architects in Islamabad</button></li>
                <li><button onClick={() => navigateTo({ type: 'city', slug: 'rawalpindi' })} className="hover:underline hover:text-black">Architects in Rawalpindi</button></li>
                <li><button onClick={() => navigateTo({ type: 'city', slug: 'faisalabad' })} className="hover:underline hover:text-black">Architects in Faisalabad</button></li>

              </ul>
            </nav>
            <nav className="space-y-4">
              <h4 className="text-[11px] font-bold text-[#1d1d1f] uppercase tracking-[0.12em]">Regional Branches</h4>
              <ul className="text-[12px] text-[#424245] space-y-3">
                <li><button onClick={() => navigateTo({ type: 'city', slug: 'multan' })} className="hover:underline hover:text-black">Architects in Multan</button></li>
                <li><button onClick={() => navigateTo({ type: 'city', slug: 'gujranwala' })} className="hover:underline hover:text-black">Architects in Gujranwala</button></li>
                <li><button onClick={() => navigateTo({ type: 'city', slug: 'attock' })} className="hover:underline hover:text-black">Architects in Attock</button></li>
                <li><button onClick={() => navigateTo({ type: 'city', slug: 'rahim-yar-khan' })} className="hover:underline hover:text-black text-left">Architects in Rahim Yar Khan</button></li>
                <li><button onClick={() => navigateTo({ type: 'city', slug: 'kasur' })} className="hover:underline hover:text-black">Architects in Kasur</button></li>

              </ul>
            </nav>
            <nav className="space-y-4">
              <h4 className="text-[11px] font-bold text-[#1d1d1f] uppercase tracking-[0.12em]">Emerging Markets</h4>
              <ul className="text-[12px] text-[#424245] space-y-3">
                <li><button onClick={() => navigateTo({ type: 'city', slug: 'mandi-bahauddin' })} className="hover:underline hover:text-black text-left">Architects in Mandi Bahauddin</button></li>
                <li><button onClick={() => navigateTo({ type: 'city', slug: 'sahiwal' })} className="hover:underline hover:text-black">Architects in Sahiwal</button></li>
                <li><button onClick={() => navigateTo({ type: 'city', slug: 'bahawalpur' })} className="hover:underline hover:text-black">Architects in Bahawalpur</button></li>
                <li><button onClick={() => navigateTo({ type: 'city', slug: 'jhelum' })} className="hover:underline hover:text-black">Architects in Jhelum</button></li>
                <li><button onClick={() => navigateTo({ type: 'city', slug: 'sialkot' })} className="hover:underline hover:text-black">Architects in Sialkot</button></li>

              </ul>
            </nav>
          </div>

          <div className="pt-8 border-t border-[#d2d2d7]/50 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <p className="text-[11px] text-[#86868b]">Copyright © 2026 Architectorly Pakistan.</p>
              <div className="flex gap-4 text-[11px] text-[#424245]">
                <button onClick={() => navigateTo({ type: 'privacy' })} className="hover:underline">Privacy Policy</button>
                <span className="text-[#d2d2d7]">|</span>
                <button onClick={() => navigateTo({ type: 'terms' })} className="hover:underline">Terms of Service</button>
                <span className="text-[#d2d2d7]">|</span>
                <button onClick={() => navigateTo({ type: 'about' })} className="hover:underline">About Us</button>
                <span className="text-[#d2d2d7]">|</span>
                <button onClick={() => navigateTo({ type: 'sitemap' })} className="hover:underline">Architectural Site Map</button>
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