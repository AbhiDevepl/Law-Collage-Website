"use client";
import React from 'react';

const ParagraphSkeletonLoader = () => {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-4 bg-gray-200 rounded-full w-3/4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded-full"></div>
        <div className="h-4 bg-gray-200 rounded-full w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded-full w-4/6"></div>
      </div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded-full w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded-full"></div>
        <div className="h-4 bg-gray-200 rounded-full w-4/6"></div>
      </div>
    </div>
  );
};

export default ParagraphSkeletonLoader;