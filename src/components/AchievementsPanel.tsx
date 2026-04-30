import React from 'react';
import { X } from 'lucide-react';

interface AchievementsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockAchievements = [
  { id: 'act_1', title: 'First Post', description: 'Create your first activity post', achieved: true, progress: 1 },
  { id: 'act_2', title: 'Social Starter', description: 'Follow 5 people', achieved: false, progress: 0.4 },
  { id: 'act_3', title: 'Marathon Viewer', description: 'Watch 10 movies', achieved: false, progress: 0.7 },
  { id: 'act_4', title: 'Critic', description: 'Write 5 reviews', achieved: true, progress: 1 },
  { id: 'act_5', title: 'Collector', description: 'Create 3 lists', achieved: false, progress: 0.2 },
];

export function AchievementsPanel({ isOpen, onClose }: AchievementsPanelProps) {
  if (!isOpen) return null;

  const achieved = mockAchievements.filter(a => a.achieved);
  const notAchieved = mockAchievements.filter(a => !a.achieved);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-zinc-900 rounded-lg w-full max-w-2xl p-6 border border-zinc-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Achievements</h3>
          <button
            onClick={onClose}
            className="bg-white/10 hover:bg-white/20 rounded-full p-2 transition"
            aria-label="Close achievements"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Unlocked</h4>
            <div className="grid grid-cols-1 gap-2">
              {achieved.map(a => (
                <div key={a.id} className="bg-zinc-800 p-3 rounded border border-zinc-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{a.title}</div>
                      <div className="text-xs text-gray-400">{a.description}</div>
                    </div>
                    <div className="text-sm text-green-400 font-semibold">Unlocked</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">In Progress</h4>
            <div className="grid grid-cols-1 gap-2">
              {notAchieved.map(a => (
                <div key={a.id} className="bg-zinc-800 p-3 rounded border border-zinc-700">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-semibold">{a.title}</div>
                      <div className="text-xs text-gray-400">{a.description}</div>
                    </div>
                    <div className="text-xs text-gray-300">{Math.round(a.progress * 100)}%</div>
                  </div>
                  <div className="w-full bg-zinc-700 h-2 rounded overflow-hidden">
                    <div className="h-2 bg-red-600" style={{ width: `${a.progress * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
