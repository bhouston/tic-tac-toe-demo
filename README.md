# Tic Tac Toe Game

A modern, responsive Tic Tac Toe game built with Next.js, TypeScript, and Tailwind CSS. Play against an AI opponent with adjustable difficulty levels!

![Tic Tac Toe Game Screenshot](public/screenshot.png)

## Features

- **Responsive Game Board**: A clean, modern 3x3 grid that works on all screen sizes
- **AI Opponent**: Play against a computer opponent with three difficulty levels:
  - **Easy**: Makes random moves
  - **Medium**: Makes strategic moves with occasional mistakes
  - **Hard**: Uses the Minimax algorithm for optimal play
- **Score Tracking**: Keeps track of wins, losses, and draws across sessions
- **Visual Feedback**: Animations and highlighting for game actions and winning lines
- **Sound Effects**: Audio feedback for placing markers and game outcomes
- **Persistent State**: Game scores and settings are saved in localStorage

## Live Demo

Try the game online: [Tic Tac Toe Demo](https://tic-tac-toe-demo.vercel.app)

## Technologies Used

- **Next.js 15**: React framework with App Router
- **TypeScript**: For type safety and improved developer experience
- **Tailwind CSS**: For styling and responsive design
- **React Hooks**: For state management
- **Web Audio API**: For sound effects
- **LocalStorage API**: For persistence

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/bhouston/tic-tac-toe-demo.git
   cd tic-tac-toe-demo
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   # or
   bun install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the game.

## Project Structure

```
src/
├── app/                 # Next.js App Router files
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout component
│   └── page.tsx         # Main game page
├── components/          # React components
│   ├── Cell.tsx         # Individual game board cell
│   ├── DifficultySelector.tsx # Difficulty level selector
│   ├── GameBoard.tsx    # Game board component
│   ├── GameStatus.tsx   # Game status display
│   └── ScoreTracker.tsx # Score tracking component
├── hooks/               # Custom React hooks
│   └── useGameState.ts  # Game state management hook
└── utils/               # Utility functions
    └── aiOpponent.ts    # AI opponent implementation
```

## Development Guidelines

### Code Style

- Follow TypeScript best practices
- Use functional components with hooks
- Follow the naming conventions in the codebase
- Use tailwind classes for styling

### Adding Features

When adding new features:

1. Create a new branch from `main`
2. Implement your changes
3. Test thoroughly
4. Submit a PR with a clear description

### Running Tests

```bash
npm run test
# or
yarn test
# or
pnpm test
# or
bun test
```

## Building for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
```

The optimized production build will be generated in the `.next` folder.

## Deployment

This project can be easily deployed on [Vercel](https://vercel.com/new) or any other Next.js-compatible hosting platform.

## Contributing

Contributions are welcome! Please see [CONTRIBUTORS.md](CONTRIBUTORS.md) for details on how to contribute to this project.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- The Minimax algorithm implementation is based on traditional game theory approaches
- UI design inspired by modern web applications and game interfaces