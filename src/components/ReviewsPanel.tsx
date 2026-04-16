import { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, Filter, TrendingUp, Sparkles, X } from 'lucide-react';

interface Review {
  id: number;
  userName: string;
  avatar: string;
  rating: number;
  date: string;
  content: string;
  helpful: number;
  notHelpful: number;
  aiVerified?: boolean;
  spoilerWarning?: boolean;
}

interface ReviewsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  movieTitle: string;
}

const mockReviews: Review[] = [
  {
    id: 1,
    userName: "MovieBuff2024",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
    rating: 5,
    date: "2 days ago",
    content: "Absolutely mind-blowing! The visual effects were stunning and the plot kept me guessing until the very end. Christopher Nolan has done it again!",
    helpful: 234,
    notHelpful: 12,
    aiVerified: true
  },
  {
    id: 2,
    userName: "CinemaLover",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 4,
    date: "5 days ago",
    content: "Great movie overall, but the pacing in the middle act felt a bit slow. The ending more than made up for it though. Highly recommend!",
    helpful: 156,
    notHelpful: 8,
    aiVerified: true
  },
  {
    id: 3,
    userName: "SciFiFanatic",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
    rating: 5,
    date: "1 week ago",
    content: "This is exactly what sci-fi should be - thought-provoking, visually stunning, and emotionally engaging. The quantum mechanics concepts were handled brilliantly!",
    helpful: 189,
    notHelpful: 5,
    spoilerWarning: true
  },
  {
    id: 4,
    userName: "FilmCritic101",
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop",
    rating: 3,
    date: "1 week ago",
    content: "Good but not great. The concept is interesting but execution could have been better. Some plot holes that bothered me throughout.",
    helpful: 87,
    notHelpful: 43
  },
  {
    id: 5,
    userName: "ActionJunkie",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    rating: 5,
    date: "2 weeks ago",
    content: "The heist sequences were incredibly well choreographed. Edge of my seat the entire time. Best action movie of the year!",
    helpful: 201,
    notHelpful: 15,
    aiVerified: true
  }
];

export function ReviewsPanel({ isOpen, onClose, movieTitle }: ReviewsPanelProps) {
  const [sortBy, setSortBy] = useState<'helpful' | 'recent' | 'rating'>('helpful');
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [reviewText, setReviewText] = useState('');

  // Calculate aggregate rating
  const avgRating = (mockReviews.reduce((sum, r) => sum + r.rating, 0) / mockReviews.length).toFixed(1);
  const totalReviews = mockReviews.length;
  
  // Rating distribution
  const ratingCounts = [5, 4, 3, 2, 1].map(rating => 
    mockReviews.filter(r => r.rating === rating).length
  );

  const handleSubmitReview = () => {
    if (userRating === 0 || reviewText.trim() === '') return;
    
    // In real app, this would submit to backend
    alert(`Review submitted! Rating: ${userRating} stars\n\n${reviewText}`);
    setShowWriteReview(false);
    setUserRating(0);
    setReviewText('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-zinc-900 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-pink-600 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-1">Community Reviews</h2>
            <p className="text-sm text-white/80">{movieTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Rating Summary */}
        <div className="p-6 border-b border-zinc-800 bg-zinc-800/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Overall Rating */}
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-6xl font-bold text-white">{avgRating}</div>
                <div className="flex justify-center my-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.round(parseFloat(avgRating))
                          ? 'text-yellow-500 fill-yellow-500'
                          : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-400">{totalReviews} reviews</div>
              </div>
              
              {/* Rating Distribution */}
              <div className="flex-1 space-y-2">
                {[5, 4, 3, 2, 1].map((rating, idx) => {
                  const count = ratingCounts[idx];
                  const percentage = (count / totalReviews) * 100;
                  
                  return (
                    <div key={rating} className="flex items-center gap-2 text-sm">
                      <span className="text-gray-400 w-6">{rating}</span>
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <div className="flex-1 bg-zinc-700 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-yellow-500 h-full rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-gray-400 w-8 text-right">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Write Review Button */}
            <div className="flex items-center justify-center">
              <button
                onClick={() => setShowWriteReview(!showWriteReview)}
                className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-8 py-4 rounded-lg transition font-semibold text-lg flex items-center gap-2"
              >
                <Star className="w-5 h-5" />
                {showWriteReview ? 'Cancel Review' : 'Write a Review'}
              </button>
            </div>
          </div>

          {/* Write Review Form */}
          {showWriteReview && (
            <div className="mt-6 bg-zinc-900 rounded-lg p-6 border border-zinc-700">
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Your Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      onClick={() => setUserRating(star)}
                    >
                      <Star
                        className={`w-8 h-8 transition cursor-pointer ${
                          star <= (hoveredStar || userRating)
                            ? 'text-yellow-500 fill-yellow-500'
                            : 'text-gray-600'
                        }`}
                      />
                    </button>
                  ))}
                  {userRating > 0 && (
                    <span className="ml-2 text-gray-400">{userRating} out of 5 stars</span>
                  )}
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Your Review</label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share your thoughts about this movie... (AI will help check for spoilers)"
                  className="w-full bg-zinc-800 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-600 min-h-[120px]"
                />
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  <span>AI will analyze your review for quality and spoilers</span>
                </div>
              </div>

              <button
                onClick={handleSubmitReview}
                disabled={userRating === 0 || reviewText.trim() === ''}
                className="bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg transition font-semibold"
              >
                Submit Review
              </button>
            </div>
          )}
        </div>

        {/* Filters & Sort */}
        <div className="p-4 border-b border-zinc-800 flex flex-wrap gap-4 items-center bg-zinc-900">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-semibold">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-zinc-800 text-white rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option value="helpful">Most Helpful</option>
              <option value="recent">Most Recent</option>
              <option value="rating">Highest Rating</option>
            </select>
          </div>

          <div className="flex gap-2">
            <span className="text-sm font-semibold">Filter:</span>
            {[5, 4, 3, 2, 1].map(rating => (
              <button
                key={rating}
                onClick={() => setFilterRating(filterRating === rating ? null : rating)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm transition ${
                  filterRating === rating
                    ? 'bg-yellow-500 text-black'
                    : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
                }`}
              >
                {rating}
                <Star className="w-3 h-3" fill={filterRating === rating ? 'currentColor' : 'none'} />
              </button>
            ))}
            {filterRating && (
              <button
                onClick={() => setFilterRating(null)}
                className="text-sm text-red-500 hover:text-red-400"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Reviews List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {mockReviews
            .filter(review => filterRating === null || review.rating === filterRating)
            .map(review => (
              <ReviewCard key={review.id} review={review} />
            ))}
        </div>
      </div>
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const [voted, setVoted] = useState<'helpful' | 'not' | null>(null);
  const [showSpoiler, setShowSpoiler] = useState(false);

  return (
    <div className="bg-zinc-800 rounded-lg p-5 border border-zinc-700 hover:border-zinc-600 transition">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <img
          src={review.avatar}
          alt={review.userName}
          className="w-12 h-12 rounded-full object-cover"
        />

        <div className="flex-1">
          {/* Header */}
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold">{review.userName}</span>
                {review.aiVerified && (
                  <div className="flex items-center gap-1 bg-purple-600/20 text-purple-400 px-2 py-0.5 rounded-full text-xs">
                    <Sparkles className="w-3 h-3" />
                    AI Verified
                  </div>
                )}
                {review.spoilerWarning && (
                  <div className="bg-red-600/20 text-red-400 px-2 py-0.5 rounded-full text-xs">
                    Spoiler Warning
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= review.rating
                          ? 'text-yellow-500 fill-yellow-500'
                          : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-400">{review.date}</span>
              </div>
            </div>
          </div>

          {/* Review Content */}
          <div className="mb-3">
            {review.spoilerWarning && !showSpoiler ? (
              <div className="bg-zinc-900 border-2 border-dashed border-zinc-700 rounded-lg p-4 text-center">
                <p className="text-gray-400 mb-2">This review contains spoilers</p>
                <button
                  onClick={() => setShowSpoiler(true)}
                  className="text-red-500 hover:text-red-400 text-sm font-semibold"
                >
                  Click to reveal
                </button>
              </div>
            ) : (
              <p className="text-gray-300 text-sm leading-relaxed">{review.content}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-400">Was this helpful?</span>
            <button
              onClick={() => setVoted(voted === 'helpful' ? null : 'helpful')}
              className={`flex items-center gap-1 transition ${
                voted === 'helpful'
                  ? 'text-green-500'
                  : 'text-gray-400 hover:text-green-500'
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
              <span>{review.helpful + (voted === 'helpful' ? 1 : 0)}</span>
            </button>
            <button
              onClick={() => setVoted(voted === 'not' ? null : 'not')}
              className={`flex items-center gap-1 transition ${
                voted === 'not'
                  ? 'text-red-500'
                  : 'text-gray-400 hover:text-red-500'
              }`}
            >
              <ThumbsDown className="w-4 h-4" />
              <span>{review.notHelpful + (voted === 'not' ? 1 : 0)}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
