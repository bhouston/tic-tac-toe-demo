'use client';

import React from 'react';
import { CellValue } from '../hooks/useGameState';

type CellProps = {
  value: CellValue;
  onClick: () => void;
  isWinningCell: boolean;
  disabled: boolean;
};

const Cell: React.FC<CellProps> = ({ value, onClick, isWinningCell, disabled }) => {
  const baseClasses = "w-full h-full bg-white border-2 border-gray-300 rounded-md flex items-center justify-center text-4xl font-bold transition-all duration-200 aspect-square";
  const hoverClasses = !disabled && !value ? "hover:bg-gray-100 hover:shadow-md" : "";
  const focusClasses = !disabled ? "focus:outline-none focus:ring-2 focus:ring-blue-500" : "";
  const winningClasses = isWinningCell ? "bg-green-100 border-green-500 shadow-md" : "";
  const disabledClasses = disabled && !value ? "cursor-not-allowed" : "";
  
  return (
    <button
      className={`${baseClasses} ${hoverClasses} ${focusClasses} ${winningClasses} ${disabledClasses}`}
      onClick={onClick}
      disabled={disabled || value !== null}
      aria-label={`Cell ${value ? `contains ${value}` : 'empty'}`}
    >
      {value === 'X' && (
        <span className="text-blue-600 animate-pop-in">X</span>
      )}
      {value === 'O' && (
        <span className="text-red-600 animate-pop-in">O</span>
      )}
    </button>
  );
};

export default Cell;