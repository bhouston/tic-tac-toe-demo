'use client';

import React from 'react';
import { CellValue } from '../hooks/useGameState';

type GameBoardProps = {
  board: CellValue[];
  winningLine: number[] | null;
  onCellClick?: (index: number) => void;
  disabled?: boolean;
};

const GameBoard: React.FC<GameBoardProps> = ({ 
  board, 
  winningLine, 
  onCellClick,
  disabled = false
}) => {
  const getCellClassName = (index: number) => {
    const baseClasses = "bg-white border-2 border-gray-300 rounded-md flex items-center justify-center text-4xl font-bold transition-colors aspect-square";
    const hoverClasses = !disabled && board[index] === null ? "hover:bg-gray-100" : "";
    const focusClasses = !disabled ? "focus:outline-none focus:ring-2 focus:ring-blue-500" : "";
    const winningClasses = winningLine?.includes(index) ? "bg-green-100 border-green-500" : "";
    
    return `${baseClasses} ${hoverClasses} ${focusClasses} ${winningClasses}`;
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="grid grid-cols-3 gap-2 aspect-square">
        {board.map((cell, index) => (
          <button
            key={index}
            className={getCellClassName(index)}
            onClick={() => !disabled && onCellClick?.(index)}
            disabled={disabled || cell !== null}
            aria-label={`Cell ${index + 1}${cell ? ` contains ${cell}` : ' empty'}`}
          >
            {cell}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;