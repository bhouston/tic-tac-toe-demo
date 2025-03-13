'use client';

import { useRef, useEffect } from 'react';
import GameBoard from '../components/GameBoard';
import GameStatus from '../components/GameStatus';
import DifficultySelector from '../components/DifficultySelector';
import ScoreTracker from '../components/ScoreTracker';
import { useGameState } from '../hooks/useGameState';

export default function Home() {
  const { 
    board, 
    currentPlayer, 
    status, 
    winner, 
    winningLine, 
    isAiThinking,
    difficulty,
    scores,
    makeMove, 
    resetGame,
    resetScores,
    setDifficulty
  } = useGameState();

  // Reference to audio elements
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);
  const winSoundRef = useRef<HTMLAudioElement | null>(null);
  const loseSoundRef = useRef<HTMLAudioElement | null>(null);
  const drawSoundRef = useRef<HTMLAudioElement | null>(null);

  // Play sound effects
  useEffect(() => {
    // Initialize audio elements
    if (typeof window !== 'undefined' && !clickSoundRef.current) {
      clickSoundRef.current = new Audio('/sounds/click.mp3');
      winSoundRef.current = new Audio('/sounds/win.mp3');
      loseSoundRef.current = new Audio('/sounds/lose.mp3');
      drawSoundRef.current = new Audio('/sounds/draw.mp3');
    }
  }, []);

  // Play appropriate sound when game ends
  useEffect(() => {
    if (status === 'won') {
      if (winner === 'human' && winSoundRef.current) {
        winSoundRef.current.play().catch(() => {});
      } else if (winner === 'ai' && loseSoundRef.current) {
        loseSoundRef.current.play().catch(() => {});
      }
    } else if (status === 'draw' && drawSoundRef.current) {
      drawSoundRef.current.play().catch(() => {});
    }
  }, [status, winner]);

  const handleCellClick = (index: number) => {
    const moved = makeMove(index);
    if (moved && clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0;
      clickSoundRef.current.play().catch(() => {});
    }
  };

  const handleDifficultyChange = (newDifficulty: typeof difficulty) => {
    setDifficulty(newDifficulty);
    resetGame();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="w-full max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Tic Tac Toe</h1>
        
        <ScoreTracker
          playerScore={scores.player}
          aiScore={scores.ai}
          draws={scores.draws}
        />
        
        <DifficultySelector
          difficulty={difficulty}
          onChange={handleDifficultyChange}
          disabled={status === 'playing'}
        />
        
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
        
        <div className="flex justify-center mt-4">
          <button
            className="text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={resetScores}
          >
            Reset Scores
          </button>
        </div>
      </div>

      <footer className="mt-8 text-sm text-gray-500">
        <p>Built with Next.js, TypeScript, and Tailwind CSS</p>
      </footer>
    </div>
  );
}