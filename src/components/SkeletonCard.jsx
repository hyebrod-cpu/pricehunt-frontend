import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="w-full bg-white border border-slate-200/60 rounded-2xl p-4 flex flex-col justify-between shadow-sm min-h-[380px]">
      <div>
        {/* Image Box */}
        <div className="w-full h-44 rounded-xl shimmer mb-4" />
        
        {/* Badges line */}
        <div className="flex gap-2 mb-3">
          <div className="w-16 h-5 rounded-full shimmer" />
          <div className="w-24 h-5 rounded-full shimmer" />
        </div>
        
        {/* Name lines */}
        <div className="w-full h-5 rounded-md shimmer mb-2" />
        <div className="w-3/4 h-5 rounded-md shimmer mb-4" />
        
        {/* Price lines */}
        <div className="flex items-baseline gap-2 mb-2">
          <div className="w-20 h-7 rounded-md shimmer" />
          <div className="w-14 h-4 rounded-md shimmer" />
          <div className="w-10 h-4 rounded-md shimmer" />
        </div>
        
        {/* Delivery line */}
        <div className="w-32 h-4 rounded-md shimmer mt-1" />
      </div>
      
      {/* Button */}
      <div className="w-full h-11 rounded-xl shimmer mt-4" />
    </div>
  );
}

export function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-6">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}
