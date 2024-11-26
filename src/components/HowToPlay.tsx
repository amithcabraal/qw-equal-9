import React from 'react';
import { X, PlayCircle } from 'lucide-react';
import { TourContext } from './Tour/TourProvider';

interface HowToPlayProps {
  onClose: () => void;
  onDontShowAgain: () => void;
}

export const HowToPlay: React.FC<HowToPlayProps> = ({ onClose, onDontShowAgain }) => {
  const { startTour } = React.useContext(TourContext);

  const handleStartTour = () => {
    onClose();
    startTour();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-dark-card p-8 rounded-xl shadow-2xl max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-indigo-900 dark:text-indigo-400">How to Play</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <X size={24} />
          </button>
        </div>
        
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
            Goal: Create the highest possible equal total on both sides of the balance!
          </p>
          
          <p>How to achieve this:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li>You have different numbers on each side of the balance beam</li>
            <li>Create mathematical expressions by:
              <ul className="list-circle ml-6 mt-2 space-y-1">
                <li>Selecting a number</li>
                <li>Choosing an operator (+, -, *, /)</li>
                <li>Selecting another number</li>
                <li>Clicking the play button to add your expression</li>
              </ul>
            </li>
            <li>Each operation contributes to your side's total</li>
            <li>You can remove expressions at any time to try different combinations</li>
            <li>The challenge is finding the highest possible value that can be achieved equally on both sides!</li>
          </ul>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              onChange={onDontShowAgain}
              className="form-checkbox h-5 w-5 text-indigo-600"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">Don't show this again</span>
          </label>
          <div className="flex gap-4">
            <button
              onClick={handleStartTour}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:hover:bg-indigo-900/50"
            >
              <PlayCircle size={20} />
              Take the Tour
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};