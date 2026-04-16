import { Search, Bell, User, BookOpen, Users, BarChart3 } from 'lucide-react';

interface HeaderProps {
  onOpenDiary: () => void;
  onOpenSocial: () => void;
  onOpenAnalytics: () => void;
}

export function Header({ onOpenDiary, onOpenSocial, onOpenAnalytics }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-gradient-to-b from-black to-transparent">
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-8">
          <h1 className="text-3xl font-bold text-red-600">StreamSmart</h1>
          <nav className="hidden md:flex gap-6">
            <a href="#" className="hover:text-gray-300 transition">Home</a>
            <a href="#" className="hover:text-gray-300 transition">TV Shows</a>
            <a href="#" className="hover:text-gray-300 transition">Movies</a>
            <a href="#" className="hover:text-gray-300 transition">New & Popular</a>
            <a href="#" className="hover:text-gray-300 transition">My List</a>
            <button 
              onClick={onOpenDiary}
              className="hover:text-gray-300 transition flex items-center gap-1"
            >
              <BookOpen className="w-4 h-4" />
              My Diary
            </button>
            <button 
              onClick={onOpenSocial}
              className="hover:text-gray-300 transition flex items-center gap-1"
            >
              <Users className="w-4 h-4" />
              Social
            </button>
            <button 
              onClick={onOpenAnalytics}
              className="hover:text-gray-300 transition flex items-center gap-1"
            >
              <BarChart3 className="w-4 h-4" />
              Analytics
            </button>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <Search className="w-5 h-5 cursor-pointer hover:text-gray-300" />
          <Bell className="w-5 h-5 cursor-pointer hover:text-gray-300" />
          <User className="w-5 h-5 cursor-pointer hover:text-gray-300" />
        </div>
      </div>
    </header>
  );
}