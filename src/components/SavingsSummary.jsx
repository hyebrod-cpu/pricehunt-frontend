import React from 'react';

export default function SavingsSummary({ bestResult, allResults }) {
  if (!bestResult) return null;

  const { price, mrp, platform, name } = bestResult;
  const savingsVsMrp = mrp - price;
  const savingsPct = mrp > 0 ? Math.round((savingsVsMrp / mrp) * 100) : 0;

  // Let's calculate comparison with other platforms
  // Find other platforms' prices for similar items or just the overall maximum price found
  const prices = allResults.map(r => r.price);
  const maxPrice = Math.max(...prices);
  const savingsVsMax = maxPrice - price;
  const savingsVsMaxPct = maxPrice > 0 ? Math.round((savingsVsMax / maxPrice) * 100) : 0;

  // If there are no savings at all, do not render or show a subtle message
  if (savingsVsMrp <= 0 && savingsVsMax <= 0) {
    return (
      <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-6 text-center text-sm text-slate-500 font-medium">
        Showing direct live prices. No active discounts found.
      </div>
    );
  }

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="w-full bg-gradient-to-r from-emerald-500/10 to-teal-500/5 border border-emerald-500/20 rounded-2xl p-5 mb-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 animate-scale-in">
      <div className="flex items-start gap-3.5">
        <div className="p-2.5 rounded-xl bg-emerald-500 text-white shadow-md shadow-emerald-500/20 mt-0.5">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        </div>
        <div>
          <h4 className="text-slate-800 font-bold text-sm leading-snug">Best Deal Identified!</h4>
          <p className="text-slate-600 text-xs mt-1">
            Cheapest deal is on <span className="font-semibold text-slate-800">{capitalize(platform)}</span> for <span className="text-slate-700 italic">"{name.length > 40 ? name.substring(0, 40) + '...' : name}"</span>
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
        {savingsVsMrp > 0 && (
          <div className="bg-emerald-500/10 text-emerald-800 px-3.5 py-2 rounded-xl border border-emerald-500/20 shadow-sm">
            Save <span className="text-base font-extrabold">₹{savingsVsMrp.toLocaleString('en-IN')}</span> ({savingsPct}% Off vs MRP)
          </div>
        )}
        
        {savingsVsMax > 0 && (
          <div className="bg-indigo-500/10 text-indigo-800 px-3.5 py-2 rounded-xl border border-indigo-500/20 shadow-sm">
            Save <span className="text-base font-extrabold">₹{savingsVsMax.toLocaleString('en-IN')}</span> ({savingsVsMaxPct}% vs other platforms)
          </div>
        )}
      </div>
    </div>
  );
}
