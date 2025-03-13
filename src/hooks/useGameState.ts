'use client';

import { useState, useCallback } from 'react';

export type CellValue = 'X' | 'O' | null;
export type GameStatus = 'playing' | 'won' | 'draw';
export type Player = 'human' | 'ai';

interface GameState {
  board: CellValue[];
  currentPlayer: Player;
  status: GameStatus;
  winner: Player | null;
  winningLine: number[] | null;
}

// All possible winning combinations (rows, columns, diagonals)
const WINNING_COMBINATIONS = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal top-left to bottom-right
  [2, 4, 6], // diagonal top-right to bottom-left
];

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>({
    board: Array(9).fill(null),
    currentPlayer: 'human',
    status: 'playing',
    winner: null,
    winningLine: null,
  });

  // Check if the game is won or drawn
  const checkGameStatus = useCallback((board: CellValue[]): { status: GameStatus; winningLine: number[] | null } => {
    // Check for a win
    for (const combination of WINNING_COMBINATIONS) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { status: 'won', winningLine: combination };
      }
    }

    // Check for a draw
    if (board.every(cell => cell !== null)) {
      return { status: 'draw', winningLine: null };
    }

    // Game is still in progress
    return { status: 'playing', winningLine: null };
  }, []);

  // Make a move
  const makeMove = useCallback((index: number) => {
    // Don't allow moves if the game is over or the cell is already filled
    if (gameState.status !== 'playing' || gameState.board[index] !== null) {
      return false;
    }

    // Create a new board with the move
    const newBoard = [...gameState.board];
    const marker = gameState.currentPlayer === 'human' ? 'X' : 'O';
    newBoard[index] = marker;

    // Check if the game is won or drawn
    const { status, winningLine } = checkGameStatus(newBoard);

    // Update the game state
    setGameState({
      board: newBoard,
      currentPlayer: gameState.currentPlayer === 'human' ? 'ai' : 'human',
      status,
      winner: status === 'won' ? gameState.currentPlayer : null,
      winningLine,
    });

    return true;
  }, [gameState, checkGameStatus]);

  // Reset the game
  const resetGame = useCallback(() => {
    setGameState({
      board: Array(9).fill(null),
      currentPlayer: 'human',
      status: 'playing',
      winner: null,
      winningLine: null,
    });
  }, []);

  return {
    board: gameState.board,
    currentPlayer: gameState.currentPlayer,
    status: gameState.status,
    winner: gameState.winner,
    winningLine: gameState.winningLine,
    makeMove,
    resetGame,
  };
}