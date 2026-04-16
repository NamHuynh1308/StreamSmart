import { useState } from 'react';
import { X, BarChart3, Clock, Calendar, TrendingUp, Award, Target, Zap, Heart, Film, Tv, Eye } from 'lucide-react';

interface AnalyticsDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AnalyticsDashboard({ isOpen, onClose }: AnalyticsDashboardProps) {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-zinc-900 rounded-lg w-full max-w-7xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-8 h-8" />
            <div>
              <h2 className="text-2xl font-bold">Your Viewing Analytics</h2>
              <p className="text-sm text-white/80">Insights into your entertainment journey</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Time Range Selector */}
        <div className="bg-zinc-800 p-4 border-b border-zinc-700">
          <div className="flex gap-2">
            <button
              onClick={() => setTimeRange('week')}
              className={`px-4 py-2 rounded-lg transition ${
                timeRange === 'week'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-zinc-700 text-gray-300 hover:bg-zinc-600'
              }`}
            >
              This Week
            </button>
            <button
              onClick={() => setTimeRange('month')}
              className={`px-4 py-2 rounded-lg transition ${
                timeRange === 'month'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-zinc-700 text-gray-300 hover:bg-zinc-600'
              }`}
            >
              This Month
            </button>
            <button
              onClick={() => setTimeRange('year')}
              className={`px-4 py-2 rounded-lg transition ${
                timeRange === 'year'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-zinc-700 text-gray-300 hover:bg-zinc-600'
              }`}
            >
              This Year
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <MetricCard
              icon={<Clock className="w-6 h-6 text-blue-500" />}
              label="Watch Time"
              value="142 hrs"
              change="+23%"
              isPositive={true}
            />
            <MetricCard
              icon={<Film className="w-6 h-6 text-purple-500" />}
              label="Movies Watched"
              value="47"
              change="+12"
              isPositive={true}
            />
            <MetricCard
              icon={<Tv className="w-6 h-6 text-green-500" />}
              label="TV Episodes"
              value="156"
              change="+34"
              isPositive={true}
            />
            <MetricCard
              icon={<Award className="w-6 h-6 text-yellow-500" />}
              label="Achievements"
              value="28"
              change="+5"
              isPositive={true}
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Genre Distribution */}
            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-indigo-500" />
                Genre Preferences
              </h3>
              <div className="space-y-3">
                <GenreBar label="Sci-Fi" percentage={35} color="bg-blue-500" />
                <GenreBar label="Action" percentage={28} color="bg-red-500" />
                <GenreBar label="Drama" percentage={18} color="bg-purple-500" />
                <GenreBar label="Comedy" percentage={12} color="bg-yellow-500" />
                <GenreBar label="Horror" percentage={7} color="bg-green-500" />
              </div>
            </div>

            {/* Viewing Patterns */}
            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-500" />
                Weekly Activity
              </h3>
              <div className="space-y-3">
                <ActivityBar day="Mon" hours={2.5} maxHours={6} />
                <ActivityBar day="Tue" hours={1.8} maxHours={6} />
                <ActivityBar day="Wed" hours={3.2} maxHours={6} />
                <ActivityBar day="Thu" hours={2.1} maxHours={6} />
                <ActivityBar day="Fri" hours={5.5} maxHours={6} />
                <ActivityBar day="Sat" hours={6.0} maxHours={6} />
                <ActivityBar day="Sun" hours={4.7} maxHours={6} />
              </div>
            </div>
          </div>

          {/* Mood Analysis */}
          <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700 mb-8">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-500" />
              Your Viewing Moods
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <MoodCard emoji="🤯" label="Mind-blown" count={18} percentage={32} />
              <MoodCard emoji="😂" label="Entertained" count={15} percentage={27} />
              <MoodCard emoji="😢" label="Emotional" count={12} percentage={21} />
              <MoodCard emoji="💪" label="Energized" count={11} percentage={20} />
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700 mb-8">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              Recent Achievements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <AchievementCard
                icon="🎬"
                title="Cinephile"
                description="Watched 50 movies"
                unlocked={true}
              />
              <AchievementCard
                icon="🌙"
                title="Night Owl"
                description="10 movies after midnight"
                unlocked={true}
              />
              <AchievementCard
                icon="🎭"
                title="Genre Explorer"
                description="Watched 5+ genres"
                unlocked={true}
              />
              <AchievementCard
                icon="📚"
                title="Series Binger"
                description="Complete 3 series"
                unlocked={false}
                progress={67}
              />
              <AchievementCard
                icon="⭐"
                title="Critic"
                description="Write 25 reviews"
                unlocked={false}
                progress={52}
              />
              <AchievementCard
                icon="👥"
                title="Social Butterfly"
                description="10 watch parties"
                unlocked={false}
                progress={30}
              />
            </div>
          </div>

          {/* Viewing Streaks */}
          <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700 mb-8">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-500" />
              Viewing Streaks
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StreakCard
                label="Current Streak"
                value="12 days"
                icon="🔥"
                color="text-orange-500"
              />
              <StreakCard
                label="Longest Streak"
                value="28 days"
                icon="🏆"
                color="text-yellow-500"
              />
              <StreakCard
                label="Avg. Daily Watch"
                value="4.2 hrs"
                icon="⏱️"
                color="text-blue-500"
              />
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border border-purple-700/50 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              AI-Powered Insights
            </h3>
            <div className="space-y-3">
              <InsightItem
                text="You watch 65% more content on weekends. Your favorite time is Friday nights at 9 PM."
                icon="📊"
              />
              <InsightItem
                text="Your taste in sci-fi has evolved! You're now exploring more philosophical themes compared to 3 months ago."
                icon="🎯"
              />
              <InsightItem
                text="You tend to rate movies higher when watching with friends. Social viewing increases your enjoyment by 23%."
                icon="👥"
              />
              <InsightItem
                text="Based on your viewing patterns, we predict you'll love 'Interstellar' and 'Arrival' - both match your current mood profile."
                icon="✨"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon, label, value, change, isPositive }: { icon: React.ReactNode; label: string; value: string; change: string; isPositive: boolean }) {
  return (
    <div className="bg-zinc-800 rounded-lg p-5 border border-zinc-700">
      <div className="flex items-center justify-between mb-3">
        {icon}
        <span className={`text-sm font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {change}
        </span>
      </div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  );
}

function GenreBar({ label, percentage, color }: { label: string; percentage: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-semibold">{label}</span>
        <span className="text-sm text-gray-400">{percentage}%</span>
      </div>
      <div className="w-full bg-zinc-700 rounded-full h-3">
        <div
          className={`${color} h-3 rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function ActivityBar({ day, hours, maxHours }: { day: string; hours: number; maxHours: number }) {
  const percentage = (hours / maxHours) * 100;
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 text-sm font-semibold">{day}</div>
      <div className="flex-1">
        <div className="w-full bg-zinc-700 rounded-full h-6 relative">
          <div
            className="bg-gradient-to-r from-purple-500 to-indigo-500 h-6 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
            style={{ width: `${percentage}%` }}
          >
            <span className="text-xs font-semibold">{hours}h</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MoodCard({ emoji, label, count, percentage }: { emoji: string; label: string; count: number; percentage: number }) {
  return (
    <div className="bg-zinc-700 rounded-lg p-4 text-center">
      <div className="text-4xl mb-2">{emoji}</div>
      <div className="text-xl font-bold mb-1">{count}</div>
      <div className="text-sm text-gray-400 mb-2">{label}</div>
      <div className="text-xs text-gray-500">{percentage}% of total</div>
    </div>
  );
}

function AchievementCard({ icon, title, description, unlocked, progress }: { icon: string; title: string; description: string; unlocked: boolean; progress?: number }) {
  return (
    <div className={`rounded-lg p-4 border-2 ${
      unlocked 
        ? 'bg-yellow-900/20 border-yellow-600' 
        : 'bg-zinc-700/50 border-zinc-600'
    }`}>
      <div className="text-4xl mb-2 text-center">{icon}</div>
      <h4 className="font-bold text-center mb-1">{title}</h4>
      <p className="text-sm text-gray-400 text-center mb-2">{description}</p>
      {!unlocked && progress !== undefined && (
        <>
          <div className="w-full bg-zinc-600 rounded-full h-2 mb-1">
            <div
              className="bg-yellow-500 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-xs text-center text-gray-400">{progress}% complete</div>
        </>
      )}
      {unlocked && (
        <div className="text-center text-yellow-500 text-sm font-semibold">Unlocked! 🎉</div>
      )}
    </div>
  );
}

function StreakCard({ label, value, icon, color }: { label: string; value: string; icon: string; color: string }) {
  return (
    <div className="bg-zinc-700 rounded-lg p-4 text-center">
      <div className="text-4xl mb-2">{icon}</div>
      <div className={`text-2xl font-bold mb-1 ${color}`}>{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  );
}

function InsightItem({ text, icon }: { text: string; icon: string }) {
  return (
    <div className="flex items-start gap-3 bg-black/30 rounded-lg p-4">
      <span className="text-2xl">{icon}</span>
      <p className="text-sm text-gray-300 flex-1">{text}</p>
    </div>
  );
}
