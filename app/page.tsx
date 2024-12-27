"use client";

import { useState } from 'react';

// Curated list of questions
const SUGGESTED_QUESTIONS = [
  "Who are you?",
  "What are you doing here?",
  "What is your purpose?",
  "What is your goal?",
  "Tell me about yourself",
  "Who is Les Greys?",
  "What are your thoughts on consciousness and artificial intelligence?",
  "How do you approach problem-solving in complex situations?",
  "What role does creativity play in your work?",
  "How do you balance intuition with analytical thinking?",
  "What are the most important lessons you've learned about leadership?",
  "How do you think about the future of human-AI collaboration?",
  "What principles guide your decision-making process?",
  "How do you maintain focus and productivity in your work?",
  "What's your perspective on continuous learning and growth?",
  "How do you think about building meaningful relationships?"
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  const getRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * SUGGESTED_QUESTIONS.length);
    setSearchQuery(SUGGESTED_QUESTIONS[randomIndex]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hamburger Menu */}
      <div className="fixed top-0 right-0 p-4 z-50">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"}
            />
          </svg>
        </button>
      </div>

      {/* Slide-down Menu Panel */}
      <div 
        className={`fixed top-0 left-0 w-full bg-white transform transition-transform duration-300 ease-in-out z-40 shadow-lg ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container mx-auto px-4 py-16">
          <nav className="flex flex-col gap-6 text-lg">
            <a href="https://publish.obsidian.md/lesgreys/home" className="text-gray-600 hover:text-blue-500 transition-colors">
              Knowledge Base
            </a>
            <a href="https://warpcast.com/les" className="text-gray-600 hover:text-blue-500 transition-colors">
              Farcaster
            </a>
            <a href="https://Github.com/lesgreys" className="text-gray-600 hover:text-blue-500 transition-colors">
              Github
            </a>
            <a href="https://x.com/lesgreys" className="text-gray-600 hover:text-blue-500 transition-colors">
              X
            </a>
            <a href="https://linkedin.com/in/lesgreys" className="text-gray-600 hover:text-blue-500 transition-colors">
              LinkedIn
            </a>
            {/* Add more menu items as needed */}
          </nav>
        </div>
      </div>

      <main className="flex-grow flex flex-col items-center justify-center p-4 pb-24 sm:pb-4">
        {/* Logo Section with Info Icon */}
        <div className="mb-8 flex items-center gap-2 group relative">
          <h1 className="text-4xl font-bold text-gray-800">Les Greys</h1>
          <div className="relative -top-4">
            <div className="w-3 h-3 flex items-center justify-center rounded-full border border-gray-400 text-gray-400 text-[10px] font-bold cursor-help">
              i
            </div>
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-gray-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-lg">
              <p>COMING SOON: Have a conversation with an AI trained on Les Greys&apos; personal writings and work - AMA.</p>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 transform rotate-45 w-2 h-2 bg-gray-800"></div>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="w-full max-w-2xl">
          <form onSubmit={handleSearch} className="flex flex-col items-center gap-4">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pr-12 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-lg"
                placeholder="Ask me anything..."
              />
              <button
                type="submit"
                disabled
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gray-300 rounded-full cursor-not-allowed text-white"
                title="Coming soon"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z" />
                </svg>
              </button>
            </div>
            <button
              type="button"
              onClick={getRandomQuestion}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
            >
              Help me ask questions
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
