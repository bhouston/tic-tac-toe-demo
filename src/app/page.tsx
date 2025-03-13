'use client';

import GameBoard from '../components/GameBoard';
import { useGameState } from '../hooks/useGameState';

export default function Home() {
  const { 
    board, 
    currentPlayer, 
    status, 
    winner, 
    winningLine, 
    isAiThinking,
    makeMove, 
    resetGame 
  } = useGameState();

  const handleCellClick = (index: number) => {
    makeMove(index);
  };

  const getStatusMessage = () => {
    if (status === 'won') {
      return `${winner === 'human' ? 'You' : 'AI'} won!`;
    } else if (status === 'draw') {
      return "It's a draw!";
    } else if (isAiThinking) {
      return "AI is thinking...";
    } else {
      return `${currentPlayer === 'human' ? 'Your' : 'AI'} turn`;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">Tic Tac Toe</h1>
      <p className="text-lg mb-8">{getStatusMessage()}</p>
      
      <GameBoard 
        board={board} 
        winningLine={winningLine}
        onCellClick={handleCellClick}
        disabled={status !== 'playing' || currentPlayer !== 'human'}
      />
      
      {status !== 'playing' && (
        <button
          className="mt-8 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={resetGame}
        >
          Play Again
        </button>
      )}
    </div>
  );
}