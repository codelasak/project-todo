import React from 'react';

interface TaskFiltersProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  showCompleted: boolean;
  setShowCompleted: (show: boolean) => void;
}

export function TaskFilters({
  categories,
  selectedCategory,
  setSelectedCategory,
  showCompleted,
  setShowCompleted,
}: TaskFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex flex-wrap gap-4 items-center">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="Tümü">Tüm Kategoriler</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showCompleted}
            onChange={(e) => setShowCompleted(e.target.checked)}
            className="form-checkbox h-5 w-5 text-purple-600"
          />
          <span className="text-gray-700">Tamamlananları Göster</span>
        </label>
      </div>
    </div>
  );
}