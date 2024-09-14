'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const views = ['Projects', 'Writings', 'Activity'];

// Mock data for tiles (you'll replace this with real data)
const tileData = {
  Projects: [...Array(10)].map((_, i) => ({
    id: i,
    title: `Project ${i + 1}`,
    description: `Description for project ${i + 1}.`,
    // imageUrl: `https://source.unsplash.com/random/400x300?sig=${i}`,
    content: `Detailed content for Project ${i + 1}.`
  })),
  Writings: [...Array(5)].map((_, i) => ({
    id: i,
    title: `Article ${i + 1}`,
    description: `Summary of article ${i + 1}.`,
    // imageUrl: `https://source.unsplash.com/random/400x300?writing=${i}`,
    content: `Full content of Article ${i + 1}.`
  })),
  Activity: [...Array(30)].map((_, i) => ({
    id: i,
    title: `Activity ${i + 1}`,
    date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    type: ['Commit', 'Issue', 'Pull Request'][i % 3],
  }))
};

export default function Dashboard() {
  const [selectedView, setSelectedView] = useState('Projects');
  const [selectedTile, setSelectedTile] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleViewChange = (view) => {
    setSelectedView(view);
    setSelectedTile(null);
    setIsDropdownOpen(false);
  };

  const handleTileClick = (tile) => {
    setSelectedTile(tile);
  };

  const renderProjectsGrid = () => (
    <div className="grid grid-cols-2 gap-8 p-8 overflow-y-auto" style={{maxHeight: 'calc(100vh - 200px)'}}>
      {tileData.Projects.map((tile) => (
        <div 
          key={tile.id} 
          className="relative h-80 rounded-lg overflow-hidden shadow-md cursor-pointer"
          onClick={() => handleTileClick(tile)}
        >
          <div className="absolute inset-0 bg-gray-200"></div>
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-6 text-white">
            <h3 className="font-bold text-2xl mb-2">{tile.title}</h3>
            <p className="text-sm">{tile.description}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderWritingsGrid = () => (
    <div className="flex flex-col gap-8 p-8 overflow-y-auto" style={{maxHeight: 'calc(100vh - 200px)'}}>
      {tileData.Writings.map((tile) => (
        <div 
          key={tile.id} 
          className="relative h-128 rounded-lg overflow-hidden shadow-md cursor-pointer"
          onClick={() => handleTileClick(tile)}
        >
          <div className="absolute inset-0 bg-gray-200"></div>
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-8 text-white">
            <h3 className="font-bold text-3xl mb-3">{tile.title}</h3>
            <p className="text-base">{tile.description}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderActivityGrid = () => (
    <div className="grid grid-cols-8 gap-3 p-8 overflow-y-auto" style={{maxHeight: 'calc(100vh - 200px)'}}>
      {tileData.Activity.map((activity) => (
        <div 
          key={activity.id} 
          className="h-24 w-24 rounded-md overflow-hidden shadow-sm cursor-pointer bg-gray-200 flex flex-col items-center justify-center text-xs p-2 transition-all duration-200 ease-in-out hover:shadow-md hover:bg-gray-300 hover:scale-105"
          onClick={() => handleTileClick(activity)}
        >
          <span className="font-bold text-sm mb-1">{activity.type}</span>
          <span className="text-xs">{activity.date}</span>
        </div>
      ))}
    </div>
  );

  const renderTileDetail = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{selectedTile.title}</h2>
      {selectedTile.imageUrl && (
        <div className="relative h-64 mb-4">
          <Image
            src={selectedTile.imageUrl}
            alt={selectedTile.title}
            layout="fill"
            objectFit="cover"
          />
        </div>
      )}
      <p>{selectedTile.content || `Details for ${selectedTile.title}`}</p>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col text-black relative">
      <header className="bg-white border-b border-gray-200 p-4">
        <Link href="https://lesgreys.com" className="text-2xl font-bold text-center block text-black">
          Les Greys
        </Link>
      </header>

      <div className="flex flex-1">
        <div className="w-2/3 p-6 border-r border-gray-200">
          <div className="mb-4 flex items-center">
            <span className="text-lg font-semibold text-black">Work &gt; </span>
            <div className="relative inline-block text-left">
              <button
                type="button"
                className="inline-flex justify-center items-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {selectedView}
                <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    {views.map((view) => (
                      <button
                        key={view}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                        onClick={() => handleViewChange(view)}
                      >
                        {view}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {selectedTile && (
              <>
                <span className="text-lg font-semibold text-black"> &gt; </span>
                <span className="text-lg font-semibold text-black">{selectedTile.title}</span>
              </>
            )}
          </div>
          
          {selectedTile ? renderTileDetail() : (
            selectedView === 'Projects' ? renderProjectsGrid() :
            selectedView === 'Writings' ? renderWritingsGrid() :
            renderActivityGrid()
          )}
        </div>

        <div className="w-1/3 p-6">
          <h2 className="text-xl font-bold mb-4 text-black">AI Chat</h2>
          <p className="text-black">AI chat interface will be implemented here.</p>
        </div>
      </div>

      {/* Social Icons */}
      <div className="absolute bottom-4 left-4 flex space-x-4">
        <a href="https://github.com/lesgreys" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
        </a>
        <a href="https://warpcast.com/les" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2L2 19.5h20L12 2zm0 4.5l6.5 11.25h-13L12 6.5z"/>
          </svg>
        </a>
      </div>
    </div>
  );
}