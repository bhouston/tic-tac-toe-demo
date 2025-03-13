'use client';

import React from 'react';
import Cell from './Cell';
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
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="grid grid-cols-3 gap-3 aspect-square bg-gray-200 p-3 rounded-lg shadow-md">
        {board.map((cell, index) => (
          <Cell
            key={index}
            value={cell}
            onClick={() => onCellClick?.(index)}
            isWinningCell={winningLine?.includes(index) || false}
            disabled={disabled || cell !== null}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;