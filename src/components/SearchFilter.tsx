import { useState } from 'react';
import { FilterOptions } from '@/types';

interface SearchFilterProps {
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
}

export default function SearchFilter({ filters, setFilters }: SearchFilterProps) {
  const [searchTerm, setSearchTerm] = useState(filters.searchTerm || '');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters({...filters, searchTerm});
  };
  
  return (
    <div className="bg-white rounded-md border border-gray-200 shadow-sm">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row">
        <div className="flex-1 p-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border-0 text-sm text-gray-900 focus:ring-0 focus:border-0 placeholder-gray-500"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex justify-end md:border-l border-gray-200">
          <button
            type="submit"
            className="px-6 py-3 bg-primary text-white text-sm font-medium rounded-r-md hover:bg-primary-dark transition-colors"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
} 