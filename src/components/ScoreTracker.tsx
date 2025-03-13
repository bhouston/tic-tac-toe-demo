'use client';

import React from 'react';

type ScoreTrackerProps = {
  playerScore: number;
  aiScore: number;
  draws: number;
};

const ScoreTracker: React.FC<ScoreTrackerProps> = ({ playerScore, aiScore, draws }) => {
  return (
    <div className="mb-6 bg-gray-100 p-3 rounded-lg shadow-sm">
      <div className="text-sm font-medium text-gray-700 mb-2 text-center">Score</div>
      <div className="flex justify-center space-x-8">
        <div className="text-center">
          <div className="text-blue-600 text-xl font-bold">{playerScore}</div>
          <div className="text-xs text-gray-600">You</div>
        </div>
        <div className="text-center">
          <div className="text-yellow-600 text-xl font-bold">{draws}</div>
          <div className="text-xs text-gray-600">Draws</div>
        </div>
        <div className="text-center">
          <div className="text-red-600 text-xl font-bold">{aiScore}</div>
          <div className="text-xs text-gray-600">AI</div>
        </div>
      </div>
    </div>
  );
};

export default ScoreTracker;