import { CellValue } from '../hooks/useGameState';

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

// Check if the game is over (win or draw)
function checkGameOver(board: CellValue[]): { isOver: boolean; winner: CellValue } {
  // Check for a win
  for (const [a, b, c] of WINNING_COMBINATIONS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { isOver: true, winner: board[a] };
    }
  }

  // Check for a draw
  if (board.every(cell => cell !== null)) {
    return { isOver: true, winner: null };
  }

  // Game is still in progress
  return { isOver: false, winner: null };
}

// Get all available moves (empty cells)
function getAvailableMoves(board: CellValue[]): number[] {
  return board.reduce<number[]>((moves, cell, index) => {
    if (cell === null) {
      moves.push(index);
    }
    return moves;
  }, []);
}

// Make a move on a new board
function makeMove(board: CellValue[], index: number, player: CellValue): CellValue[] {
  const newBoard = [...board];
  newBoard[index] = player;
  return newBoard;
}

// Minimax algorithm
function minimax(
  board: CellValue[],
  depth: number,
  isMaximizing: boolean,
  alpha: number = -Infinity,
  beta: number = Infinity
): { score: number; move?: number } {
  const { isOver, winner } = checkGameOver(board);

  // Terminal states
  if (isOver) {
    if (winner === 'O') return { score: 10 - depth }; // AI wins
    if (winner === 'X') return { score: depth - 10 }; // Human wins
    return { score: 0 }; // Draw
  }

  // Maximum depth reached
  if (depth >= 9) {
    return { score: 0 };
  }

  const availableMoves = getAvailableMoves(board);
  let bestMove: number | undefined;
  let bestScore: number;

  if (isMaximizing) {
    // AI's turn (maximize score)
    bestScore = -Infinity;
    for (const move of availableMoves) {
      const newBoard = makeMove(board, move, 'O');
      const { score } = minimax(newBoard, depth + 1, false, alpha, beta);
      
      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
      
      // Alpha-beta pruning
      alpha = Math.max(alpha, bestScore);
      if (beta <= alpha) break;
    }
  } else {
    // Human's turn (minimize score)
    bestScore = Infinity;
    for (const move of availableMoves) {
      const newBoard = makeMove(board, move, 'X');
      const { score } = minimax(newBoard, depth + 1, true, alpha, beta);
      
      if (score < bestScore) {
        bestScore = score;
        bestMove = move;
      }
      
      // Alpha-beta pruning
      beta = Math.min(beta, bestScore);
      if (beta <= alpha) break;
    }
  }

  return { score: bestScore, move: bestMove };
}

// Get the best move for the AI
export function getBestMove(board: CellValue[]): number {
  // If the board is empty, choose a corner or the center
  if (board.every(cell => cell === null)) {
    const firstMoves = [0, 2, 4, 6, 8]; // Corners and center
    return firstMoves[Math.floor(Math.random() * firstMoves.length)];
  }

  const { move } = minimax(board, 0, true);
  return move !== undefined ? move : getAvailableMoves(board)[0];
}