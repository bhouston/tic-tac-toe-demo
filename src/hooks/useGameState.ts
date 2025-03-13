'use client';

import { useState, useCallback, useEffect } from 'react';
import { getBestMove } from '../utils/aiOpponent';

export type CellValue = 'X' | 'O' | null;
export type GameStatus = 'playing' | 'won' | 'draw';
export type Player = 'human' | 'ai';

interface GameState {
  board: CellValue[];
  currentPlayer: Player;
  status: GameStatus;
  winner: Player | null;
  winningLine: number[] | null;
  isAiThinking: boolean;
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
    isAiThinking: false,
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
    // Don't allow moves if the game is over, the cell is already filled, or AI is thinking
    if (
      gameState.status !== 'playing' || 
      gameState.board[index] !== null || 
      gameState.currentPlayer !== 'human' ||
      gameState.isAiThinking
    ) {
      return false;
    }

    // Create a new board with the human move
    const newBoard = [...gameState.board];
    newBoard[index] = 'X';

    // Check if the game is won or drawn after human move
    const { status, winningLine } = checkGameStatus(newBoard);

    // Update the game state after human move
    setGameState(prevState => ({
      ...prevState,
      board: newBoard,
      currentPlayer: status === 'playing' ? 'ai' : 'human',
      status,
      winner: status === 'won' ? 'human' : null,
      winningLine,
      isAiThinking: status === 'playing',
    }));

    return true;
  }, [gameState, checkGameStatus]);

  // AI makes a move
  useEffect(() => {
    if (gameState.currentPlayer === 'ai' && gameState.status === 'playing' && gameState.isAiThinking) {
      // Add a slight delay to make the AI's move feel more natural
      const aiMoveTimeout = setTimeout(() => {
        // Get the best move for the AI
        const aiMoveIndex = getBestMove(gameState.board);

        // Create a new board with the AI move
        const newBoard = [...gameState.board];
        newBoard[aiMoveIndex] = 'O';

        // Check if the game is won or drawn after AI move
        const { status, winningLine } = checkGameStatus(newBoard);

        // Update the game state after AI move
        setGameState(prevState => ({
          ...prevState,
          board: newBoard,
          currentPlayer: 'human',
          status,
          winner: status === 'won' ? 'ai' : null,
          winningLine,
          isAiThinking: false,
        }));
      }, 500); // 500ms delay for AI move

      return () => clearTimeout(aiMoveTimeout);
    }
  }, [gameState, checkGameStatus]);

  // Reset the game
  const resetGame = useCallback(() => {
    setGameState({
      board: Array(9).fill(null),
      currentPlayer: 'human',
      status: 'playing',
      winner: null,
      winningLine: null,
      isAiThinking: false,
    });
  }, []);

  return {
    board: gameState.board,
    currentPlayer: gameState.currentPlayer,
    status: gameState.status,
    winner: gameState.winner,
    winningLine: gameState.winningLine,
    isAiThinking: gameState.isAiThinking,
    makeMove,
    resetGame,
  };
}