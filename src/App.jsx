import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import ResultCard from './components/ResultCard';
import { SkeletonGrid } from './components/SkeletonCard';
import SavingsSummary from './components/SavingsSummary';
import PlatformStatus from './components/PlatformStatus';

export default function App() {
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  
  // App Control States
  const [useMock, setUseMock] = useState(true); // Default to Mock mode for easy sandbox testing
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('price-asc');

  // Trigger search on component mount (default search)
  useEffect(() => {
    handleSearch('wireless earphones');
  }, [useMock]);

  const handleSearch = async (searchQuery) => {
    setLoading(true);
    setError(null);
    setQuery(searchQuery);
    
    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://pricehunt-r082.onrender.com';
      const response = await fetch(`${API_BASE_URL}/api/compare?q=${encodeURIComponent(searchQuery)}&mock=${useMock}`);
      if (!response.ok) {
        throw new Error(`Server returned error: ${response.statusText}`);
      }
      
      const data = await response.json();
      setResults(data.results || []);
      setStatus(data.status || null);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message || 'Failed to fetch price comparison. Please try again.');
      setResults([]);
      setStatus(null);
    } finally {
      setLoading(false);
    }
  };

  // Client-side categorization helper
  const matchesCategory = (item, cat) => {
    if (cat === 'all') return true;
    const name = item.name.toLowerCase();
    
    if (cat === 'electronics') {
      return name.includes('ear') || name.includes('buds') || name.includes('phone') || 
             name.includes('watch') || name.includes('laptop') || name.includes('charger') || 
             name.includes('cable') || name.includes('wireless') || name.includes('tv') || 
             name.includes('headphone') || name.includes('sound') || name.includes('speaker') ||
             name.includes('anc') || name.includes('bluetooth') || name.includes('pro');
    }
    
    if (cat === 'groceries') {
      return name.includes('milk') || name.includes('bread') || name.includes('butter') || 
             name.includes('chips') || name.includes('biscuit') || name.includes('maggi') || 
             name.includes('coke') || name.includes('oil') || name.includes('shampoo') || 
             name.includes('soap') || name.includes('organic') || name.includes('pack') ||
             name.includes('salt') || name.includes('sugar') || name.includes('tea') || 
             name.includes('coffee') || name.includes('fresh') || name.includes('onion') ||
             name.includes('potato') || name.includes('tomato') || name.includes('spices');
    }

    if (cat === 'fashion') {
      return name.includes('shirt') || name.includes('tshirt') || name.includes('jeans') || 
             name.includes('shoes') || name.includes('dress') || name.includes('saree') || 
             name.includes('kurta') || name.includes('jacket') || name.includes('cotton') || 
             name.includes('men') || name.includes('women') || name.includes('sneaker') ||
             name.includes('wear') || name.includes('top') || name.includes('trouser');
    }

    if (cat === 'beauty') {
      return name.includes('cream') || name.includes('shampoo') || name.includes('soap') || 
             name.includes('lipstick') || name.includes('perfume') || name.includes('lotion') ||
             name.includes('glow') || name.includes('moisturizer') || name.includes('care') ||
             name.includes('face') || name.includes('serum') || name.includes('scrub');
    }

    if (cat === 'home') {
      return name.includes('sofa') || name.includes('chair') || name.includes('table') || 
             name.includes('bed') || name.includes('curtain') || name.includes('sheet') || 
             name.includes('towel') || name.includes('clock') || name.includes('cushion') ||
             name.includes('lamp') || name.includes('light') || name.includes('bottle');
    }

    return false;
  };

  // Filter & Sort Results
  const filteredResults = results.filter(item => matchesCategory(item, category));
  
  const sortedResults = [...filteredResults].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'savings-desc') return b.discount - a.discount;
    return 0;
  });

  const bestResult = sortedResults.length > 0 ? sortedResults[0] : null;

  // Render platform availability warnings (if live and failed)
  const failedPlatforms = status 
    ? Object.entries(status).filter(([_, val]) => val === 'failed').map(([key]) => key) 
    : [];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-indigo-500/20 selection:text-indigo-900">
      
      {/* Premium Header */}
      <header className="sticky top-0 z-50 glass-panel border-b border-slate-200/80 shadow-sm px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white font-extrabold shadow-md shadow-indigo-600/20">
              PH
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-slate-900 leading-none">PriceHunt</h1>
              <span className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase">Deals in Real Time</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-500 hidden sm:inline">Simulation Mode</span>
            <button
              onClick={() => setUseMock(!useMock)}
              className={`relative inline-flex h-7 w-13 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                useMock ? 'bg-indigo-600' : 'bg-slate-200'
              }`}
              title={useMock ? "Switch to Live Scrapers" : "Switch to Mock Simulator"}
            >
              <span className="sr-only">Toggle Mock Mode</span>
              <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                  useMock ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <span className="text-xs font-bold text-slate-800">
              {useMock ? 'Mock Mode' : 'Live Mode'}
            </span>
          </div>

        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-6 py-8">
        
        {/* Banner info */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Compare prices instantly, <br />
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              hunt down the best deal.
            </span>
          </h2>
          <p className="text-slate-500 text-sm mt-3">
            Search once. Scrape parallel across Amazon, Flipkart, Meesho, Blinkit, Zepto, and Instamart. Get the lowest price.
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar
          onSearch={handleSearch}
          activeCategory={category}
          onCategoryChange={setCategory}
          loading={loading}
        />

        {/* Failed Scrapers Warning Banner */}
        {!loading && failedPlatforms.length > 0 && (
          <div className="w-full bg-amber-50 border border-amber-300/60 text-amber-900 rounded-2xl p-4 mb-6 text-sm flex items-center gap-3 animate-slide-up">
            <svg className="h-5 w-5 text-amber-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <span className="font-bold">Scraping issue:</span> Some platforms took too long or blocked the requests: {failedPlatforms.map(p => p.toUpperCase()).join(', ')}. Try enabling <span className="font-semibold underline">Mock Mode</span> for testing.
            </div>
          </div>
        )}

        {/* Network Status Bar */}
        <PlatformStatus status={status} loading={loading} />

        {/* Savings Bar */}
        {!loading && sortedResults.length > 0 && (
          <SavingsSummary bestResult={bestResult} allResults={sortedResults} />
        )}

        {/* Results Container */}
        <div className="mt-4">
          
          {/* Sorting Header */}
          {!loading && sortedResults.length > 0 && (
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-4 mb-6">
              <h3 className="text-sm font-bold text-slate-800">
                Found {sortedResults.length} matches
              </h3>
              
              <div className="flex items-center gap-2">
                <label htmlFor="sort-select" className="text-xs font-semibold text-slate-500">Sort By:</label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="savings-desc">Highest Discount %</option>
                </select>
              </div>
            </div>
          )}

          {/* Content Loading / Error / Empty States */}
          {loading ? (
            <SkeletonGrid />
          ) : error ? (
            <div className="w-full text-center py-16 bg-white border border-slate-200/60 rounded-3xl shadow-sm animate-scale-in">
              <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-slate-800 font-bold text-lg">Search Failed</h3>
              <p className="text-slate-500 text-sm mt-1 max-w-md mx-auto px-4">{error}</p>
              <button 
                onClick={() => handleSearch(query || 'wireless earphones')}
                className="mt-5 px-5 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 active:scale-95 transition-all cursor-pointer"
              >
                Retry Search
              </button>
            </div>
          ) : sortedResults.length === 0 ? (
            <div className="w-full text-center py-16 bg-white border border-slate-200/60 rounded-3xl shadow-sm animate-scale-in">
              <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-slate-800 font-bold text-lg">No Results Found</h3>
              <p className="text-slate-500 text-sm mt-1 max-w-sm mx-auto px-4">
                We couldn't find any products matching your query or selected filters. Try adjusting your query or category chips.
              </p>
            </div>
          ) : (
            /* Card Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {sortedResults.map((item, index) => (
                <ResultCard
                  key={`${item.platform}-${index}-${item.price}`}
                  result={item}
                  isBestPrice={index === 0 && sortBy === 'price-asc'}
                />
              ))}
            </div>
          )}

        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 bg-white/70 py-6 text-center text-xs font-medium text-slate-500">
        <div className="max-w-7xl mx-auto px-6">
          <p>© 2026 PriceHunt. Side-by-side e-commerce price comparative engine.</p>
        </div>
      </footer>

    </div>
  );
}
