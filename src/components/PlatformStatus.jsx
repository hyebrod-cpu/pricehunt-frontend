import React from 'react';

const PLATFORM_CONFIGS = {
  amazon: { label: 'Amazon', color: '#FF9900', bgClass: 'platform-badge-amazon' },
  flipkart: { label: 'Flipkart', color: '#2874F0', bgClass: 'platform-badge-flipkart' },
  meesho: { label: 'Meesho', color: '#A42096', bgClass: 'platform-badge-meesho' },
  blinkit: { label: 'Blinkit', color: '#ECDC0C', bgClass: 'platform-badge-blinkit' },
  zepto: { label: 'Zepto', color: '#5C0C9C', bgClass: 'platform-badge-zepto' },
  instamart: { label: 'Instamart', color: '#FC5C14', bgClass: 'platform-badge-instamart' }
};

export default function PlatformStatus({ status, loading }) {
  return (
    <div className="w-full glass-panel border border-slate-200/80 rounded-xl p-4 mb-6 shadow-sm animate-scale-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">Scraper Network Status</h3>
          <p className="text-xs text-slate-500 mt-0.5">Real-time status of product crawlers across platforms</p>
        </div>
        
        <div className="flex flex-wrap gap-2 items-center">
          {Object.entries(PLATFORM_CONFIGS).map(([key, config]) => {
            let dotColor = 'bg-slate-300';
            let statusText = 'Idle';
            let title = 'Waiting for search';

            if (loading) {
              dotColor = 'bg-sky-400 animate-pulse';
              statusText = 'Scraping...';
              title = 'Currently extracting pricing info';
            } else if (status && status[key]) {
              const s = status[key];
              if (s === 'success') {
                dotColor = 'bg-emerald-500';
                statusText = 'Live';
                title = 'Live pricing data fetched successfully';
              } else if (s === 'mocked') {
                dotColor = 'bg-indigo-500';
                statusText = 'Mocked';
                title = 'Mock data active for this search';
              } else if (s === 'no_results') {
                dotColor = 'bg-amber-500';
                statusText = 'No Results';
                title = 'Scraper completed but no products matched the query';
              } else if (s === 'failed') {
                dotColor = 'bg-rose-500';
                statusText = 'Unavailable';
                title = 'Scraper timed out or was blocked by anti-bot firewall';
              }
            }

            return (
              <div
                key={key}
                title={title}
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border border-slate-100 shadow-sm transition-all duration-200 hover:scale-105 select-none ${config.bgClass}`}
              >
                <span className={`w-2 h-2 rounded-full ${dotColor}`} />
                <span className="opacity-90">{config.label}</span>
                <span className="text-[10px] opacity-60 font-normal">({statusText})</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export { PLATFORM_CONFIGS };
