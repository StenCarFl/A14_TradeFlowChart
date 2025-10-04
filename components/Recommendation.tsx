
import React from 'react';

interface RecommendationProps {
  recommendation: string;
}

export const Recommendation: React.FC<RecommendationProps> = ({ recommendation }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-cyan-500 shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-3">Next Step Recommendation</h2>
      <p className="text-lg text-cyan-300 font-mono bg-gray-900 p-4 rounded-md">
        {recommendation || "Enter details to get a recommendation."}
      </p>
    </div>
  );
};
