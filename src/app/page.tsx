'use client';

import GameBoard from '../components/GameBoard';
import GameStatus from '../components/GameStatus';
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="w-full max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Tic Tac Toe</h1>
        
        <div className="flex justify-center">
          <GameStatus 
            status={status} 
            winner={winner} 
            isAiThinking={isAiThinking} 
            currentPlayer={currentPlayer} 
          />
        </div>
        
        <GameBoard 
          board={board} 
          winningLine={winningLine}
          onCellClick={handleCellClick}
          disabled={status !== 'playing' || currentPlayer !== 'human'}
        />
        
        {status !== 'playing' && (
          <div className="flex justify-center mt-8 animate-fade-in">
            <button
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105 shadow-md"
              onClick={resetGame}
            >
              Play Again
            </button>
          </div>
        )}
      </div>

      <footer className="mt-8 text-sm text-gray-500">
        <p>Built with Next.js, TypeScript, and Tailwind CSS</p>
      </footer>
    </div>
  );
}