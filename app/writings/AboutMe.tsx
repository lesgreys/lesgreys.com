import React from 'react';
import SocialIcons from '../../components/SocialIcons';

interface AboutMeProps {
  onClose: () => void;
}

const AboutMe: React.FC<AboutMeProps> = ({ onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center p-8 z-50">
    <div className="max-w-2xl text-center text-white">
      <h2 className="text-3xl font-bold mb-6">About Me</h2>
      <p className="text-lg mb-6">
        Hello! I'm Les, a life long problem-solver, learner, and renewed technocapitalist. Currently based in Miami, FL. I work on products leveraging data layers on blockchain and AI primitives.
      </p>
      <p className="text-lg mb-6">
        The purpose of this site is to create a digital home of information for future generations.
      </p>
      <p className="text-lg mb-6">
        You can ask "me" questions here, or read more about me.
      </p>
    </div>
    <button 
      onClick={onClose}
      className="mt-8 bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded"
    >
      Close
    </button>
    <div className="absolute bottom-4 left-4">
      <SocialIcons />
    </div>
  </div>
);

export default AboutMe;