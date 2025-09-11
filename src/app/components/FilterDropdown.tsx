'use client';

import React, { useState, useRef, useEffect } from 'react';

interface FilterDropdownProps {
  label: string;
  options: string[];
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
  multiSelect?: boolean;
}

export default function FilterDropdown({
  label,
  options,
  selectedValues,
  onSelectionChange,
  multiSelect = false
}: FilterDropdownProps) {
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

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full md:w-40 px-4 py-2 bg-white border border-gray-300 rounded text-left flex justify-between items-center hover:border-gray-400 transition-colors"
      >
        <span className="font-medium">{label}</span>
        <span className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg z-10 max-h-60 overflow-y-auto">
          {options.map((option) => (
            <label
              key={option}
              className="block px-4 py-2 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => handleOptionClick(option)}
            >
              <input
                type={multiSelect ? 'checkbox' : 'radio'}
                className="mr-2"
                checked={selectedValues.includes(option)}
                onChange={() => {}}
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}