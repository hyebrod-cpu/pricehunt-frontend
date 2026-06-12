import React, { useState } from 'react';

const CATEGORIES = [
  { id: 'all', label: 'All Categories' },
  { id: 'electronics', label: 'Electronics & Gadgets' },
  { id: 'groceries', label: 'Groceries & Staples' },
  { id: 'fashion', label: 'Fashion & Apparel' },
  { id: 'home', label: 'Home Decor & Furniture' },
  { id: 'beauty', label: 'Beauty & Wellness' }
];

export default function SearchBar({ onSearch, activeCategory, onCategoryChange, loading }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="w-full mb-8">
      <form onSubmit={handleSubmit} className="relative w-full max-w-3xl mx-auto mb-5">
        <div className="relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={loading}
            placeholder="Search for 'boAt Airdopes 141', 'Amul Butter', 'iPhone 15'..."
            className="w-full px-6 py-4.5 pr-28 text-slate-800 placeholder-slate-400 bg-white border border-slate-200/80 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-base disabled:bg-slate-50 disabled:text-slate-400"
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="absolute right-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-medium text-sm transition-all shadow-md active:scale-95 disabled:from-slate-200 disabled:to-slate-300 disabled:text-slate-400 disabled:shadow-none disabled:pointer-events-none flex items-center gap-2"
          >
            {loading ? (
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            )}
            Search
          </button>
        </div>
      </form>

      {/* Category Chips */}
      <div className="flex items-center justify-center gap-2 flex-wrap max-w-4xl mx-auto">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onCategoryChange(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-slate-900 border-slate-900 text-white shadow-sm hover:bg-slate-800'
                  : 'bg-white border-slate-200/80 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
