import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Header } from './components/Header';
import { LoginPage } from './components/LoginPage';
import { HeroSection } from './components/HeroSection';
import { ContinueWatching } from './components/ContinueWatching';
import { SmartFilters } from './components/SmartFilters';
import { MovieGrid } from './components/MovieGrid';
import { AIChatPanel } from './components/AIChatPanel';
import { ReviewsPanel } from './components/ReviewsPanel';
import { AchievementsPanel } from './components/AchievementsPanel';
import { SocialHub } from './components/SocialHub';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [reviewsPanelOpen, setReviewsPanelOpen] = useState(false);
  const [achievementsOpen, setAchievementsOpen] = useState(false);
  const [socialHubOpen, setSocialHubOpen] = useState(false);
  const [analyticsOpen, setAnalyticsOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState('The Quantum Heist');

  const handleMovieSelect = (movieTitle?: string) => {
    if (movieTitle) {
      setSelectedMovie(movieTitle);
    }
    setReviewsPanelOpen(true);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header 
        onOpenAchievements={() => setAchievementsOpen(true)}
        onOpenSocial={() => setSocialHubOpen(true)}
        onOpenAnalytics={() => setAnalyticsOpen(true)}
        onLogout={() => {
          setIsChatOpen(false);
          setReviewsPanelOpen(false);
          setAchievementsOpen(false);
          setSocialHubOpen(false);
          setAnalyticsOpen(false);
          setIsLoggedIn(false);
        }}
      />
      
      <HeroSection 
        onAskAI={() => setIsChatOpen(true)} 
        onViewReviews={() => handleMovieSelect('The Quantum Heist')} 
      />
      
      <main className="relative">
        <ContinueWatching />
        
        <SmartFilters 
          activeFilters={activeFilters} 
          setActiveFilters={setActiveFilters} 
        />
        
        <MovieGrid 
          filters={activeFilters} 
          onMovieSelect={handleMovieSelect} 
        />
      </main>

      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 flex items-center gap-2"
        aria-label="Toggle AI Assistant"
      >
        {isChatOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6" />
            <span className="text-sm font-semibold pr-1">AI Assistant</span>
          </>
        )}
      </button>

      <AIChatPanel 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
      
      <ReviewsPanel 
        isOpen={reviewsPanelOpen} 
        onClose={() => setReviewsPanelOpen(false)}
        movieTitle={selectedMovie}
      />
      
      <AchievementsPanel
        isOpen={achievementsOpen}
        onClose={() => setAchievementsOpen(false)}
      />
      
      <SocialHub 
        isOpen={socialHubOpen}
        onClose={() => setSocialHubOpen(false)}
      />
      
      <AnalyticsDashboard 
        isOpen={analyticsOpen}
        onClose={() => setAnalyticsOpen(false)}
      />
    </div>
  );
}
