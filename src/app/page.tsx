'use client';

import React, { useState, useRef, useEffect } from 'react';
/* eslint-disable react/no-unescaped-entities */

// Define the Challenge interface
interface Challenge {
  Ref: number;
  Skill: string;
  Specialism: string;
  Experience: string;
  Scenario: string;
  Challenge: string;
  Task: string;
}

// Google Sheets configuration
const SHEET_ID = '1STA109HST7I-uvol9uqruCbq9KduRJJunDHj4mHIW2Y';
const API_KEY = 'AIzaSyDGfxAJHC-7-R12aScBUSo1zwwEAH9exTE'; // your actual API key
const RANGE = 'Sheet1!A2:G'; // Assuming your data starts in row 2

const skillOptions = ["Strategy", "Prioritisation", "Discovery", "Launch Planning", "Metrics"];
const industryOptions = ["Healthcare", "Technology", "Media", "AI", "Retail", "Finance"];
const experienceOptions = ["Entry", "Mid", "Senior"];

// Filter Dropdown Component matching your exact designs
function FilterDropdown({ label, options, selectedValues, onSelectionChange, multiSelect = false }: {
  label: string;
  options: string[];
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
  multiSelect?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = (option: string) => {
    if (multiSelect) {
      const newValues = selectedValues.includes(option)
        ? selectedValues.filter(v => v !== option)
        : [...selectedValues, option];
      onSelectionChange(newValues);
    } else {
      onSelectionChange(selectedValues.includes(option) ? [] : [option]);
      setIsOpen(false);
    }
  };

  const getDisplayText = () => {
    if (selectedValues.length === 0) {
      return label;
    }
    
    if (multiSelect) {
      if (selectedValues.length === 1) {
        return selectedValues[0];
      }
      return `${selectedValues.length} selected`;
    } else {
      return selectedValues[0];
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`min-w-[160px] px-4 py-2.5 bg-white border rounded text-left flex justify-between items-center transition-colors text-sm font-medium cursor-pointer focus:border-teal-400 focus:outline-none ${
  selectedValues.length > 0
    ? 'border-teal-400 text-gray-900'
    : 'border-gray-300 text-gray-700 hover:border-teal-400'
}`}
      >
        <span className="truncate pr-2">{getDisplayText()}</span>
        <svg 
          className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50 py-1">
          {options.map((option) => (
            <label
              key={option}
              className={`flex items-center px-4 py-2 cursor-pointer text-sm transition-colors ${
                selectedValues.includes(option) 
                  ? 'bg-teal-400 text-white' 
                  : 'text-gray-700 hover:bg-teal-100 hover:text-teal-700'
              }`}
              onClick={() => handleOptionClick(option)}
            >
              <input
                type={multiSelect ? 'checkbox' : 'radio'}
                className="mr-3 w-4 h-4 text-teal-600"
                checked={selectedValues.includes(option)}
                onChange={() => {}}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [activeTab, setActiveTab] = useState<'scenario' | 'challenge' | 'task'>('scenario');
  const [showMission, setShowMission] = useState(false);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchChallenges = async () => {
    try {
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`
      );
      
      const data = await response.json();
      
      if (data.values) {
        const formattedChallenges = data.values.map((row: string[]) => ({
          Ref: parseInt(row[0]),
          Skill: row[1],
          Specialism: row[2],
          Experience: row[3],
          Scenario: row[4],
          Challenge: row[5],
          Task: row[6]
        }));
        
        setChallenges(formattedChallenges);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching challenges:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  const resetFilters = () => {
    setSelectedSkills([]);
    setSelectedIndustry([]);
    setSelectedExperience([]);
    setCurrentChallenge(null);
    setActiveTab('scenario');
  };

  const filterChallenges = (): Challenge[] => {
    const filtered = challenges.filter(challenge => {
      const skillMatch = selectedSkills.length === 0 || selectedSkills.includes(challenge.Skill);
      const industryMatch = selectedIndustry.length === 0 || selectedIndustry.includes(challenge.Specialism);
      const experienceMatch = selectedExperience.length === 0 || selectedExperience.includes(challenge.Experience);
      
      return skillMatch && industryMatch && experienceMatch;
    });

    if (filtered.length === 0) {
      return challenges;
    }
    return filtered;
  };

  const generateNewChallenge = () => {
    const availableChallenges = filterChallenges();
    const randomIndex = Math.floor(Math.random() * availableChallenges.length);
    setCurrentChallenge(availableChallenges[randomIndex]);
    setActiveTab('scenario');
  };

  const getTabContent = () => {
    if (!currentChallenge) return '';
    switch (activeTab) {
      case 'scenario': return currentChallenge.Scenario;
      case 'challenge': return currentChallenge.Challenge;
      case 'task': return currentChallenge.Task;
      default: return '';
    }
  };

if (showMission) {
  return (
    <div className="min-h-screen" style={{backgroundColor: '#fdfce9'}}>
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <button 
              onClick={() => setShowMission(false)}
              className="text-xl font-semibold tracking-wide text-gray-900 hover:text-gray-700 transition-colors cursor-pointer"
            >
              MVPBRIEF
            </button>
            <div className="hidden md:block text-sm text-gray-600 font-medium">Real-world Product challenges</div>
            <button 
              onClick={() => setShowMission(false)}
              className="text-sm text-teal-600 font-medium hover:text-teal-700 transition-colors cursor-pointer"
            >
              Back
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          
          <div className="prose max-w-none text-gray-700 leading-relaxed space-y-6">
            <p>Hi,</p>
            
            <p>MVPBrief sparked as a frustration I had early on as an aspiring product manager. All I wanted to do was practice outside of work or prepare for interview exercises, but nothing existed.</p>
            
            <p>This is and always will be a FREE tool. It's designed to be simple, just select the filters and hit "generate", to see a realistic challenge you can take on offline.</p>
            
            <p>Hope it helps you in some form and good luck! It's my small contribution to a fantastic community!</p>
            
            <p>Always open to connect or to receive feedback on MVPBrief: find me on <a href="https://www.linkedin.com/in/nicholas-osorio-okraku-5a184277/" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 underline">LinkedIn</a></p>
            
            <p>Nick</p>
          </div>
        </div>
      </main>
    </div>
  );
}

  return (
    <div className="min-h-screen" style={{backgroundColor: '#fdfce9'}}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold tracking-wide text-gray-900">MVPBRIEF</h1>
            <div className="hidden md:block text-sm text-gray-600 font-medium">Real-world Product challenges</div>
            <button onClick={() => setShowMission(true)} className="text-sm text-teal-600 font-medium hover:text-teal-700 transition-colors cursor-pointer">
              Mission
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters Section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <FilterDropdown
            label="SKILL"
            options={skillOptions}
            selectedValues={selectedSkills}
            onSelectionChange={setSelectedSkills}
            multiSelect={true}
          />
          <FilterDropdown
            label="INDUSTRY"
            options={industryOptions}
            selectedValues={selectedIndustry}
            onSelectionChange={setSelectedIndustry}
            multiSelect={false}
          />
          <FilterDropdown
            label="EXPERIENCE"
            options={experienceOptions}
            selectedValues={selectedExperience}
            onSelectionChange={setSelectedExperience}
            multiSelect={false}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={generateNewChallenge}
            className="bg-black text-white px-8 py-3 rounded-md font-medium text-sm tracking-wide hover:bg-gray-800 transition-all cursor-pointer transform hover:translate-x-1"
            disabled={loading}
          >
            NEW CHALLENGE
          </button>
          <button
            onClick={resetFilters}
            className="bg-gray-400 text-white px-6 py-3 rounded-md font-medium text-sm tracking-wide hover:bg-gray-500 transition-all cursor-pointer"
          >
            RESET
          </button>
        </div>

        {/* Challenge Content */}
        {loading ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">⏳</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Loading challenges...
            </h2>
          </div>
        ) : currentChallenge ? (
          <div className="bg-white rounded-lg shadow-sm">
            {/* Tab Navigation */}
<div className="border-b border-gray-200">
  <div className="flex overflow-x-auto">
    {[
      { id: 'scenario', label: 'Scenario', icon: '🔍' },
      { id: 'challenge', label: 'Challenge', icon: '🧠' },
      { id: 'task', label: 'Task', icon: '✏️' }
    ].map((tab, index) => (
      <button
        key={tab.id}
        onClick={() => setActiveTab(tab.id as 'scenario' | 'challenge' | 'task')}
        className={`flex-shrink-0 min-w-0 px-4 sm:px-6 py-4 text-center font-medium text-sm transition-all cursor-pointer ${
          index < 2 ? 'border-r border-gray-200' : ''
        } ${
          activeTab === tab.id 
            ? 'text-gray-900 bg-gray-50 border-b-2 border-teal-400' 
            : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
        }`}
        style={{ flex: '1 1 33.333%' }}
      >
        <div className="flex items-center justify-center gap-1 sm:gap-2">
          <span className="text-sm sm:text-base">{tab.icon}</span>
          <span className="text-xs sm:text-sm truncate">{tab.label}</span>
        </div>
      </button>
    ))}
  </div>
</div>

            {/* Tab Content */}
            <div className="p-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Today's brief</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed text-base">
                  {getTabContent()}
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Default State */
          <div className="text-center py-20">
            <div className="text-6xl mb-6" role="img" aria-label="Search">🔍</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Choose some filters and start a new challenge!
            </h2>
            <p className="text-gray-600 text-sm max-w-md mx-auto">
              Select your skill areas, industry focus, and experience level above, then click "NEW CHALLENGE"
            </p>
          </div>
        )}
      </main>
    </div>
  );
}