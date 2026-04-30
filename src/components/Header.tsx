import { useState } from 'react';
import { Search, Bell, User, Users, BarChart3 } from 'lucide-react';

interface HeaderProps {
  onOpenSocial: () => void;
  onOpenAnalytics: () => void;
  onOpenAchievements: () => void;
  onLogout: () => void;
}

export function Header({ onOpenSocial, onOpenAnalytics, onOpenAchievements, onLogout }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
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
        
        <div className="flex items-center gap-4 relative">
          <Search className="w-5 h-5 cursor-pointer hover:text-gray-300" />
          <Bell className="w-5 h-5 cursor-pointer hover:text-gray-300" />
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-1 rounded-full hover:bg-white/5">
            <User className="w-5 h-5 cursor-pointer hover:text-gray-300" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-full mt-4 bg-zinc-900 border border-zinc-700 rounded-lg p-3 w-44 shadow-xl">
              <button className="w-full text-left px-3 py-2 rounded hover:bg-zinc-800" onClick={() => { setMenuOpen(false); /* profile settings placeholder */ }}>Profile Settings</button>
              <button className="w-full text-left px-3 py-2 rounded hover:bg-zinc-800" onClick={() => { setMenuOpen(false); onOpenAchievements(); }}>Achievements</button>
              <button className="w-full text-left px-3 py-2 rounded hover:bg-zinc-800" onClick={() => { setMenuOpen(false); onLogout(); }}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
