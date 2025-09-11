'use client';

import React, { useState } from 'react';
import { Challenge } from '../data/challenges';
/* eslint-disable react/no-unescaped-entities */

interface ChallengeDisplayProps {
  challenge: Challenge;
}

export default function ChallengeDisplay({ challenge }: ChallengeDisplayProps) {
  const [activeTab, setActiveTab] = useState<'scenario' | 'challenge' | 'task'>('scenario');

  const tabs = [
    { id: 'scenario', label: 'Scenario', icon: '🔍', content: challenge.Scenario },
    { id: 'challenge', label: 'Challenge', icon: '🧠', content: challenge.Challenge },
    { id: 'task', label: 'Task', icon: '✏️', content: challenge.Task },
  ] as const;

  return (
    <div className="bg-white rounded shadow-sm">
      {/* Tab Navigation */}
      <div className="flex border-b">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
              index < tabs.length - 1 ? 'border-r' : ''
            } ${
              activeTab === tab.id 
                ? 'bg-gray-100 text-gray-900' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <span className={activeTab === tab.id ? 'text-teal-500' : ''}>{tab.icon}</span>
              <span>{tab.label}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Today's brief</h2>
        <div className="text-gray-700 leading-relaxed">
          {tabs.find(tab => tab.id === activeTab)?.content}
        </div>
      </div>
    </div>
  );
}