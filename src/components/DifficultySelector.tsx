'use client';

import React from 'react';

export type Difficulty = 'easy' | 'medium' | 'hard';

type DifficultySelectorProps = {
  difficulty: Difficulty;
  onChange: (difficulty: Difficulty) => void;
  disabled?: boolean;
};

const DifficultySelector: React.FC<DifficultySelectorProps> = ({ 
  difficulty, 
  onChange,
  disabled = false
}) => {
  return (
    <div className="mb-6">
      <div className="text-sm font-medium text-gray-700 mb-2">Difficulty:</div>
      <div className="flex space-x-2">
        <button
          className={`px-3 py-1 rounded-md transition-colors ${
            difficulty === 'easy' 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => !disabled && onChange('easy')}
          disabled={disabled}
        >
          Easy
        </button>
        <button
          className={`px-3 py-1 rounded-md transition-colors ${
            difficulty === 'medium' 
              ? 'bg-yellow-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => !disabled && onChange('medium')}
          disabled={disabled}
        >
          Medium
        </button>
        <button
          className={`px-3 py-1 rounded-md transition-colors ${
            difficulty === 'hard' 
              ? 'bg-red-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => !disabled && onChange('hard')}
          disabled={disabled}
        >
          Hard
        </button>
      </div>
    </div>
  );
};

export default DifficultySelector;