import { useState } from 'react';
import { X, Users, Heart, MessageCircle, Share2, Play, Clock, TrendingUp, Award, Zap, Eye, UserPlus, Settings } from 'lucide-react';

interface SocialHubProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Activity {
  id: number;
  user: {
    name: string;
    avatar: string;
    isFollowing: boolean;
  };
  type: 'watched' | 'rated' | 'diary' | 'list' | 'achievement';
  movieTitle: string;
  movieImage: string;
  rating?: number;
  comment?: string;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked: boolean;
}

interface WatchParty {
  id: number;
  host: string;
  hostAvatar: string;
  movieTitle: string;
  movieImage: string;
  startTime: string;
  participants: number;
  maxParticipants: number;
  isLive: boolean;
}

const mockActivities: Activity[] = [
  {
    id: 1,
    user: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      isFollowing: true
    },
    type: 'watched',
    movieTitle: "The Quantum Heist",
    movieImage: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop",
    rating: 5,
    comment: "Mind-blowing! The ending completely caught me off guard. Anyone else notice the quantum equation on the whiteboard in scene 3?",
    timestamp: "2 hours ago",
    likes: 24,
    comments: 8,
    isLiked: false
  },
  {
    id: 2,
    user: {
      name: "Mike Johnson",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
      isFollowing: true
    },
    type: 'achievement',
    movieTitle: "Action Thriller Marathon",
    movieImage: "https://images.unsplash.com/photo-1574267432644-f610f5bb13d5?w=300&h=450&fit=crop",
    comment: "Unlocked 'Action Junkie' badge - Watched 50 action movies! 🏆",
    timestamp: "5 hours ago",
    likes: 42,
    comments: 12,
    isLiked: true
  },
  {
    id: 3,
    user: {
      name: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      isFollowing: false
    },
    type: 'list',
    movieTitle: "Ultimate Sci-Fi Collection",
    movieImage: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=300&h=450&fit=crop",
    comment: "Created a new list: 'Mind-Bending Sci-Fi' - 25 movies that will make you question reality",
    timestamp: "1 day ago",
    likes: 67,
    comments: 15,
    isLiked: false
  }
];

const mockWatchParties: WatchParty[] = [
  {
    id: 1,
    host: "Alex Rivera",
    hostAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    movieTitle: "The Quantum Heist",
    movieImage: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop",
    startTime: "Starting in 15 min",
    participants: 8,
    maxParticipants: 10,
    isLive: false
  },
  {
    id: 2,
    host: "Jamie Lee",
    hostAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    movieTitle: "Horror Night Marathon",
    movieImage: "https://images.unsplash.com/photo-1543536448-d209d2d13a1c?w=300&h=450&fit=crop",
    startTime: "Live Now",
    participants: 15,
    maxParticipants: 20,
    isLive: true
  }
];

export function SocialHub({ isOpen, onClose }: SocialHubProps) {
  const [activeTab, setActiveTab] = useState<'feed' | 'parties' | 'friends'>('feed');
  const [activities, setActivities] = useState(mockActivities);

  const handleLike = (id: number) => {
    setActivities(activities.map(activity => 
      activity.id === id 
        ? { ...activity, isLiked: !activity.isLiked, likes: activity.isLiked ? activity.likes - 1 : activity.likes + 1 }
        : activity
    ));
  };

  const handleFollow = (id: number) => {
    setActivities(activities.map(activity => 
      activity.id === id 
        ? { ...activity, user: { ...activity.user, isFollowing: !activity.user.isFollowing } }
        : activity
    ));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-zinc-900 rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8" />
            <div>
              <h2 className="text-2xl font-bold">Social Hub</h2>
              <p className="text-sm text-white/80">Connect with friends and movie lovers</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-zinc-800 bg-zinc-900">
          <button
            onClick={() => setActiveTab('feed')}
            className={`flex-1 px-6 py-4 font-semibold transition ${
              activeTab === 'feed'
                ? 'bg-zinc-800 text-white border-b-2 border-blue-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Activity Feed
            </div>
          </button>
          <button
            onClick={() => setActiveTab('parties')}
            className={`flex-1 px-6 py-4 font-semibold transition ${
              activeTab === 'parties'
                ? 'bg-zinc-800 text-white border-b-2 border-blue-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Play className="w-5 h-5" />
              Watch Parties
              <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">LIVE</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('friends')}
            className={`flex-1 px-6 py-4 font-semibold transition ${
              activeTab === 'friends'
                ? 'bg-zinc-800 text-white border-b-2 border-blue-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Users className="w-5 h-5" />
              Friends
            </div>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'feed' && (
            <div className="p-6 space-y-6">
              {/* Quick Stats Bar */}
              <div className="grid grid-cols-4 gap-4 bg-zinc-800/50 rounded-lg p-4">
                <div className="text-center">
                  <Eye className="w-6 h-6 mx-auto mb-1 text-blue-500" />
                  <div className="text-2xl font-bold">127</div>
                  <div className="text-xs text-gray-400">Friends Active</div>
                </div>
                <div className="text-center">
                  <Zap className="w-6 h-6 mx-auto mb-1 text-yellow-500" />
                  <div className="text-2xl font-bold">45</div>
                  <div className="text-xs text-gray-400">New Activities</div>
                </div>
                <div className="text-center">
                  <Award className="w-6 h-6 mx-auto mb-1 text-purple-500" />
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-xs text-gray-400">Achievements</div>
                </div>
                <div className="text-center">
                  <Users className="w-6 h-6 mx-auto mb-1 text-green-500" />
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-xs text-gray-400">Watch Parties</div>
                </div>
              </div>

              {/* Activity Feed */}
              {activities.map(activity => (
                <ActivityCard 
                  key={activity.id} 
                  activity={activity} 
                  onLike={handleLike}
                  onFollow={handleFollow}
                />
              ))}
            </div>
          )}

          {activeTab === 'parties' && (
            <div className="p-6 space-y-6">
              <div className="bg-gradient-to-r from-red-900/50 to-purple-900/50 border border-red-700/50 rounded-lg p-6">
                <div className="flex items-start gap-3 mb-4">
                  <Play className="w-6 h-6 text-red-500 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Watch Together with Friends</h3>
                    <p className="text-gray-300">Host or join watch parties to enjoy movies simultaneously with friends. Real-time reactions, chat, and shared experiences!</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockWatchParties.map(party => (
                  <WatchPartyCard key={party.id} party={party} />
                ))}
              </div>

              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-4 rounded-lg transition font-semibold flex items-center justify-center gap-2">
                <Play className="w-5 h-5" />
                Create Your Own Watch Party
              </button>
            </div>
          )}

          {activeTab === 'friends' && (
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Your Friends (248)</h3>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition flex items-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  Find Friends
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockActivities.map(activity => (
                  <FriendCard 
                    key={activity.id} 
                    user={activity.user}
                    onFollow={() => handleFollow(activity.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ActivityCard({ activity, onLike, onFollow }: { activity: Activity; onLike: (id: number) => void; onFollow: (id: number) => void }) {
  return (
    <div className="bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700">
      <div className="p-5">
        {/* User Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <img
              src={activity.user.avatar}
              alt={activity.user.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{activity.user.name}</span>
                {activity.type === 'achievement' && (
                  <Award className="w-4 h-4 text-yellow-500" />
                )}
              </div>
              <div className="text-sm text-gray-400">{activity.timestamp}</div>
            </div>
          </div>
          {!activity.user.isFollowing && (
            <button 
              onClick={() => onFollow(activity.id)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg transition text-sm"
            >
              Follow
            </button>
          )}
        </div>

        {/* Content */}
        <div className="flex gap-4">
          <img
            src={activity.movieImage}
            alt={activity.movieTitle}
            className="w-24 h-36 object-cover rounded flex-shrink-0"
          />
          <div className="flex-1">
            <h4 className="font-bold mb-2">{activity.movieTitle}</h4>
            {activity.rating && (
              <div className="flex gap-1 mb-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <Heart
                    key={star}
                    className={`w-4 h-4 ${
                      star <= activity.rating!
                        ? 'text-red-500 fill-red-500'
                        : 'text-gray-600'
                    }`}
                  />
                ))}
              </div>
            )}
            {activity.comment && (
              <p className="text-gray-300 text-sm">{activity.comment}</p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6 pt-4 mt-4 border-t border-zinc-700">
          <button
            onClick={() => onLike(activity.id)}
            className={`flex items-center gap-2 transition ${
              activity.isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
            }`}
          >
            <Heart className={activity.isLiked ? 'fill-red-500' : ''} />
            <span className="text-sm font-semibold">{activity.likes}</span>
          </button>
          <button className="flex items-center gap-2 text-gray-400 hover:text-white transition">
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-semibold">{activity.comments}</span>
          </button>
          <button className="flex items-center gap-2 text-gray-400 hover:text-white transition ml-auto">
            <Share2 className="w-5 h-5" />
            <span className="text-sm font-semibold">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function WatchPartyCard({ party }: { party: WatchParty }) {
  return (
    <div className="bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700 hover:border-blue-600 transition">
      <div className="relative">
        <img
          src={party.movieImage}
          alt={party.movieTitle}
          className="w-full h-40 object-cover"
        />
        {party.isLive && (
          <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 animate-pulse">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            LIVE
          </div>
        )}
      </div>
      <div className="p-4">
        <h4 className="font-bold mb-2">{party.movieTitle}</h4>
        <div className="flex items-center gap-2 mb-3">
          <img
            src={party.hostAvatar}
            alt={party.host}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-sm text-gray-400">Hosted by {party.host}</span>
        </div>
        <div className="flex items-center justify-between text-sm mb-3">
          <div className="flex items-center gap-2 text-gray-400">
            <Clock className="w-4 h-4" />
            {party.startTime}
          </div>
          <div className="text-gray-400">
            {party.participants}/{party.maxParticipants} joined
          </div>
        </div>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition font-semibold">
          {party.isLive ? 'Join Now' : 'Reserve Spot'}
        </button>
      </div>
    </div>
  );
}

function FriendCard({ user, onFollow }: { user: Activity['user']; onFollow: () => void }) {
  return (
    <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700 hover:border-zinc-600 transition">
      <div className="flex items-center gap-3">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="font-semibold">{user.name}</div>
          <div className="text-sm text-gray-400">Watched 47 movies this month</div>
        </div>
        <button
          onClick={onFollow}
          className={`px-4 py-2 rounded-lg transition text-sm font-semibold ${
            user.isFollowing
              ? 'bg-zinc-700 hover:bg-zinc-600 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {user.isFollowing ? 'Following' : 'Follow'}
        </button>
      </div>
    </div>
  );
}
