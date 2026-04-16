import { Smile, Zap, Heart, Brain, Users, Sparkles } from 'lucide-react';

interface SmartFiltersProps {
  activeFilters: string[];
  setActiveFilters: (filters: string[]) => void;
}

const filters = [
  { id: 'happy', label: 'Feel Good', icon: Smile, color: 'from-yellow-500 to-orange-500' },
  { id: 'intense', label: 'High Energy', icon: Zap, color: 'from-purple-500 to-pink-500' },
  { id: 'romantic', label: 'Romantic', icon: Heart, color: 'from-red-500 to-pink-500' },
  { id: 'thoughtful', label: 'Mind Bending', icon: Brain, color: 'from-blue-500 to-cyan-500' },
  { id: 'social', label: 'Watch Party', icon: Users, color: 'from-green-500 to-emerald-500' },
  { id: 'surprise', label: 'Surprise Me', icon: Sparkles, color: 'from-indigo-500 to-purple-500' },
];

export function SmartFilters({ activeFilters, setActiveFilters }: SmartFiltersProps) {
  const toggleFilter = (filterId: string) => {
    if (filterId === 'surprise') {
      // Clear all and select surprise
      setActiveFilters(['surprise']);
      return;
    }
    
    if (activeFilters.includes(filterId)) {
      setActiveFilters(activeFilters.filter(f => f !== filterId));
    } else {
      setActiveFilters([...activeFilters.filter(f => f !== 'surprise'), filterId]);
    }
  };

  return (
    <div className="px-8 mb-8 relative z-20">
      <div className="flex items-center gap-3 mb-3">
        <Sparkles className="w-5 h-5 text-red-500" />
        <h3 className="text-xl font-semibold">AI Smart Filters</h3>
      </div>
      <div className="flex flex-wrap gap-3">
        {filters.map((filter) => {
          const Icon = filter.icon;
          const isActive = activeFilters.includes(filter.id);
          
          return (
            <button
              key={filter.id}
              onClick={() => toggleFilter(filter.id)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full transition-all
                ${isActive 
                  ? `bg-gradient-to-r ${filter.color} text-white shadow-lg scale-105` 
                  : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
                }
              `}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{filter.label}</span>
            </button>
          );
        })}
      </div>
      {activeFilters.length > 0 && activeFilters[0] !== 'surprise' && (
        <p className="text-xs text-gray-400 mt-3">
          AI is personalizing your content based on: {activeFilters.join(', ')}
        </p>
      )}
      {activeFilters.includes('surprise') && (
        <p className="text-xs text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 mt-3 font-semibold">
          ✨ AI is selecting a random gem just for you...
        </p>
      )}
    </div>
  );
}
