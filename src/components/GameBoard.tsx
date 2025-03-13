'use client';

import React from 'react';

type GameBoardProps = {
  onCellClick?: (index: number) => void;
};

const GameBoard: React.FC<GameBoardProps> = ({ onCellClick }) => {
  // Create an array of 9 elements for the 3x3 grid
  const cells = Array(9).fill(null);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="grid grid-cols-3 gap-2 aspect-square">
        {cells.map((_, index) => (
          <button
            key={index}
            className="bg-white border-2 border-gray-300 rounded-md flex items-center justify-center text-4xl font-bold transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 aspect-square"
            onClick={() => onCellClick?.(index)}
            aria-label={`Cell ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;