import React from 'react';

const PLATFORM_COLORS = {
  amazon: { bg: '#FF9900', text: '#ffffff', name: 'Amazon', badge: 'platform-badge-amazon' },
  flipkart: { bg: '#2874F0', text: '#ffffff', name: 'Flipkart', badge: 'platform-badge-flipkart' },
  meesho: { bg: '#A42096', text: '#ffffff', name: 'Meesho', badge: 'platform-badge-meesho' },
  blinkit: { bg: '#ECDC0C', text: '#000000', name: 'Blinkit', badge: 'platform-badge-blinkit' },
  zepto: { bg: '#5C0C9C', text: '#ffffff', name: 'Zepto', badge: 'platform-badge-zepto' },
  instamart: { bg: '#FC5C14', text: '#ffffff', name: 'Instamart', badge: 'platform-badge-instamart' }
};

export default function ResultCard({ result, isBestPrice }) {
  const { platform, name, price, mrp, discount, delivery, url, imageUrl } = result;
  const config = PLATFORM_COLORS[platform] || { bg: '#64748b', text: '#ffffff', name: platform, badge: '' };

  const fallbackImage = 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=300&auto=format&fit=crop&q=60';

  return (
    <div 
      className={`relative bg-white rounded-2xl flex flex-col justify-between overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 group animate-scale-in min-h-[400px] ${
        isBestPrice 
          ? 'border-2 border-[#3949AB] ring-4 ring-[#3949AB]/5' 
          : 'border border-slate-200/60'
      }`}
    >
      {/* Best Price Badge */}
      {isBestPrice && (
        <span className="absolute top-3 left-3 z-10 bg-[#3949AB] text-white text-[11px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1.5 animate-pulse">
          <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
          </svg>
          Best Price
        </span>
      )}

      {/* Card Header & Image */}
      <div className="p-4 flex-grow flex flex-col">
        <div className="relative w-full h-44 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center mb-4">
          <img 
            src={imageUrl || fallbackImage} 
            alt={name} 
            loading="lazy"
            className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = fallbackImage;
            }}
          />
        </div>

        {/* Platform Badge & Info */}
        <div className="flex items-center gap-2 mb-2.5">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase shadow-sm select-none ${config.badge}`}>
            <span 
              className="w-1.5 h-1.5 rounded-full" 
              style={{ backgroundColor: config.bg }} 
            />
            {config.name}
          </span>
          {discount > 0 && (
            <span className="bg-emerald-500/10 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Product Name */}
        <h3 
          title={name}
          className="text-slate-800 font-bold text-sm leading-snug tracking-tight line-clamp-2 mb-3.5 group-hover:text-indigo-600 transition-colors"
        >
          {name}
        </h3>

        {/* Price & Details */}
        <div className="mt-auto">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-2xl font-extrabold text-slate-900">
              ₹{price.toLocaleString('en-IN')}
            </span>
            {mrp > price && (
              <span className="text-slate-400 line-through text-xs">
                ₹{mrp.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-medium mt-1.5">
            <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
            <span className="line-clamp-1">{delivery}</span>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="p-4 pt-0 border-t border-slate-100 bg-slate-50/50">
        <a 
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 font-bold text-xs hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all flex items-center justify-center gap-1.5 active:scale-98 shadow-sm group-hover:border-slate-300"
        >
          <span>Buy Now</span>
          <svg className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </div>
  );
}
export { PLATFORM_COLORS };
