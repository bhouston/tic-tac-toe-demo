'use client';

import React from 'react';
import type { GameStatus, Player } from '../hooks/useGameState';

type GameStatusProps = {
  status: GameStatus;
  winner: Player | null;
  isAiThinking: boolean;
  currentPlayer: Player;
};

const GameStatus: React.FC<GameStatusProps> = ({ 
  status, 
  winner, 
  isAiThinking, 
  currentPlayer 
}) => {
  const getStatusText = () => {
    if (status === 'won') {
      return winner === 'human' ? 'You won!' : 'AI won!';
    } else if (status === 'draw') {
      return "It's a draw!";
    } else if (isAiThinking) {
      return "AI is thinking...";
    } else {
      return currentPlayer === 'human' ? 'Your turn' : 'AI turn';
    }
  };

  const getStatusClass = () => {
    if (status === 'won') {
      return winner === 'human' ? 'text-green-600' : 'text-red-600';
    } else if (status === 'draw') {
      return 'text-yellow-600';
    } else if (isAiThinking) {
      return 'text-blue-600 animate-pulse';
    } else {
      return 'text-gray-700';
    }
  };

  return (
    <div className={`text-lg font-medium mb-6 transition-colors duration-300 ${getStatusClass()}`}>
      {getStatusText()}
    </div>
  );
};

export default GameStatus;