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
import { type WatchMovie, WatchPage } from './components/WatchPage';

/**
 * App
 *
 * Main application component
 *
 * This controls the top-level application including:
 * - Login/logout status
 * - Opening and closing modal panels
 * - Active smart filters
 * - Selected movie review state
 * - Watch page navigation
 * - Social post prefill behavior after watching a movie
 *
 * Most page sections are separated into smaller components, while this file
 * acts as the central coordinator for routing-like behavior and UI state.
 */
export default function App() {
  /**
   * Authentication state.
   * When false, the login page is shown instead of the main StreamSmart UI.
   */
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /**
   * Model / panel visibility states.
   * These booleans control whether optional overlay panels are visible.
   */
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [reviewsPanelOpen, setReviewsPanelOpen] = useState(false);
  const [achievementsOpen, setAchievementsOpen] = useState(false);
  const [socialHubOpen, setSocialHubOpen] = useState(false);
  const [analyticsOpen, setAnalyticsOpen] = useState(false);

  /**
   * Stores the currently selected smart filters.
   * These filters are passed into MovieGrid to adjust displayed content.
   */
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  /**
   * Stores which movie title should be shown in the reviews panel.
   * Defaults to Avengers because it is the featured hero movie.
   */
  const [selectedMovie, setSelectedMovie] = useState('Avengers');

  /**
   * Stores the movie currently being watched.
   * When this value is not null, the app renders WatchPage instead of the home UI.
   */
  const [watchMovie, setWatchMovie] = useState<WatchMovie | null>(null);

  /**
   * Stores a movie that should be prefilled into the social post composer.
   * This is used when a user finishes or exits from the watch page and chooses
   * to post about the movie.
   */
  const [socialPostMovie, setSocialPostMovie] = useState<WatchMovie | null>(null);

  /**
   * Opens the reviews panel for a selected movie.
   *
   * @param movieTitle Optional movie title to display reviews for.
   */
  const handleMovieSelect = (movieTitle?: string) => {
    if (movieTitle) {
      setSelectedMovie(movieTitle);
    }

    setReviewsPanelOpen(true);
  };

  /**
   * Starts playback for the selected movie.
   *
   * When entering the watch page, all overlay panels are closed so the viewing
   * experience is not interrupted by open modals.
   *
   * @param movie Movie object passed into the watch page.
   */
  const handleWatchMovie = (movie: WatchMovie) => {
    setIsChatOpen(false);
    setReviewsPanelOpen(false);
    setAchievementsOpen(false);
    setSocialHubOpen(false);
    setAnalyticsOpen(false);
    setWatchMovie(movie);
  };

  /**
   * If the user is not logged in, render only the login page.
   */
  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  /**
   * If a movie is currently selected for watching, render the watch page.
   * This functions like a simple route change without using a routing library.
   */
  if (watchMovie) {
    return (
      <WatchPage
        movie={watchMovie}
        onBack={() => setWatchMovie(null)}
        onPostAboutMovie={(movie) => {
          setSocialPostMovie(movie);
          setWatchMovie(null);
          setSocialHubOpen(true);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Main navigation header */}
      <Header
        onOpenAchievements={() => setAchievementsOpen(true)}
        onOpenSocial={() => {
          setSocialPostMovie(null);
          setSocialHubOpen(true);
        }}
        onOpenAnalytics={() => setAnalyticsOpen(true)}
        onLogout={() => {
          /**
           * Close all panels before logging out so the next login starts
           * from a clean state.
           */
          setIsChatOpen(false);
          setReviewsPanelOpen(false);
          setAchievementsOpen(false);
          setSocialHubOpen(false);
          setAnalyticsOpen(false);
          setIsLoggedIn(false);
        }}
      />

      {/* Featured section for the main highlighted movie */}
      <HeroSection
        onAskAI={() => setIsChatOpen(true)}
        onViewReviews={() => handleMovieSelect('Avengers')}
        onPlay={() =>
          handleWatchMovie({
            title: 'Avengers',
            image:
              'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop',
          })
        }
      />

      {/* Main content area */}
      <main className="relative">
        {/* Resume watching section */}
        <ContinueWatching onWatchMovie={handleWatchMovie} />

        {/* Smart filtering controls used to customize movie results */}
        <SmartFilters
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
        />

        {/* Movie browsing grid affected by active filters */}
        <MovieGrid
          filters={activeFilters}
          onMovieSelect={handleMovieSelect}
          onWatchMovie={handleWatchMovie}
        />
      </main>

      {/* Floating AI assistant button */}
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

      {/* AI recommendation / chat panel */}
      <AIChatPanel
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />

      {/* Reviews panel for the selected movie */}
      <ReviewsPanel
        isOpen={reviewsPanelOpen}
        onClose={() => setReviewsPanelOpen(false)}
        movieTitle={selectedMovie}
      />

      {/* Achievements and user progress panel */}
      <AchievementsPanel
        isOpen={achievementsOpen}
        onClose={() => setAchievementsOpen(false)}
      />

      {/* Social hub with optional movie prefill after watching */}
      <SocialHub
        isOpen={socialHubOpen}
        onClose={() => {
          setSocialHubOpen(false);
          setSocialPostMovie(null);
        }}
        prefillMovie={socialPostMovie}
      />

      {/* Personalized viewing analytics dashboard */}
      <AnalyticsDashboard
        isOpen={analyticsOpen}
        onClose={() => setAnalyticsOpen(false)}
      />
    </div>
  );
}
