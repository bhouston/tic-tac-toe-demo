'use client';

import GameBoard from '../components/GameBoard';

export default function Home() {
  const handleCellClick = (index: number) => {
    console.log(`Cell ${index} clicked`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8">Tic Tac Toe</h1>
      <GameBoard onCellClick={handleCellClick} />
    </div>
  );
}