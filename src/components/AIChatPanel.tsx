import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Mic, Clock, Users, Search, X } from 'lucide-react';

// Define structure for AI movie recommendation
interface MovieRecommendation {
  title: string;
  description: string;
}

// Define quick action types (buttons under each movie)
interface QuickAction {
  type: 'play' | 'add' | 'remind' | 'party';
  label: string;
  movieTitle?: string;
}

// Define message structure for chat system
interface Message {
  id: number;
  text?: string; // Plain text message
  sender: 'user' | 'ai'; // Who sent the message
  timestamp: Date;
  suggestions?: string[]; // Suggested prompts for user
  movies?: MovieRecommendation[]; // Structured movie list
}

// Props to control panel visibility
interface AIChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

// Initial AI greeting message when panel opens
const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hi! I'm your AI movie assistant. I can help you find the perfect movie or show. What are you in the mood for today?",
    sender: 'ai',
    timestamp: new Date(),
    suggestions: [
      "Something funny to watch with family",
      "Sci-fi movies like Inception",
      "What's trending this week?",
      "Find a specific scene for me"
    ]
  }
];

export function AIChatPanel({ isOpen, onClose }: AIChatPanelProps) {

  // Store all chat messages (user + AI)
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  // Store current input text from user
  const [inputValue, setInputValue] = useState('');

  // Track AI typing state for loading indicator
  const [isTyping, setIsTyping] = useState(false);

  // Track voice input state (microphone toggle)
  const [isListening, setIsListening] = useState(false);

  // Ref to scroll chat to latest message
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll chat to bottom smoothly
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Auto-scroll whenever messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulated voice input handler
  const handleVoiceInput = () => {
    setIsListening(!isListening); // Toggle listening state

    if (!isListening) {
      // Simulate voice recognition delay
      setTimeout(() => {
        setInputValue("Show me sci-fi movies"); // Auto-fill input
        setIsListening(false); // Stop listening
      }, 2000);
    }
  };

  // Handle quick action buttons (Play, Add, Remind, Party)
  const handleQuickAction = (action: QuickAction) => {
    let message = '';

    // Determine message based on action type
    switch (action.type) {
      case 'play':
        message = `🎬 Now playing "${action.movieTitle}"... Enjoy!`;
        break;
      case 'add':
        message = `✅ "${action.movieTitle}" added to your watchlist`;
        break;
      case 'remind':
        message = `⏰ Reminder set for "${action.movieTitle}"`;
        break;
      case 'party':
        message = `🎉 Watch party started for "${action.movieTitle}"`;
        break;
    }

    // Create system message from action
    const systemMessage: Message = {
      id: Date.now(),
      text: message,
      sender: 'ai',
      timestamp: new Date(),
    };

    // Add system message to chat
    setMessages(prev => [...prev, systemMessage]);
  };

  // Handle sending message to AI
  const handleSend = async (text: string) => {

    // Prevent sending empty input
    if (!text.trim()) return;

    // Create user message object
    const userMessage: Message = {
      id: Date.now(),
      text,
      sender: "user",
      timestamp: new Date(),
    };

    // Add user message to chat
    setMessages(prev => [...prev, userMessage]);

    // Clear input field
    setInputValue("");

    // Show typing indicator
    setIsTyping(true);

    try {
      // Send request to backend AI server
      const res = await fetch("http://localhost:8080/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }), // Send user query
      });

      const data = await res.json();

      let parsedMovies: MovieRecommendation[] | null = null;

      try {
        // Try parsing AI response as structured JSON (movie list)
        parsedMovies = JSON.parse(data.reply);
      } catch {
        // If parsing fails, treat as plain text
        parsedMovies = null;
      }

      // Create AI message (either structured or text)
      const aiMessage: Message = {
        id: Date.now() + 1,
        sender: "ai",
        timestamp: new Date(),
        movies: parsedMovies || undefined, // Structured movies if valid JSON
        text: parsedMovies ? undefined : data.reply, // Otherwise plain text
      };

      // Add AI message to chat
      setMessages(prev => [...prev, aiMessage]);

    } catch {
      // Handle API failure
      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          text: "❌ Unable to reach AI server.",
          sender: "ai",
          timestamp: new Date(),
        }
      ]);
    }

    // Hide typing indicator
    setIsTyping(false);
  };

  // Do not render panel if closed
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-0 right-0 z-50 w-full md:w-[420px] h-[600px] bg-zinc-900 border-l border-zinc-800 flex flex-col shadow-2xl">

      {/* Header section */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 p-4 flex items-center gap-3">
        <Sparkles className="w-5 h-5" />
        <div className="flex-1">
          <h3 className="font-semibold">AI Movie Assistant</h3>
          <p className="text-xs text-white/80">Always here to help you discover</p>
        </div>

        {/* Close panel button */}
        <button onClick={onClose}>
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Quick access feature buttons */}
      <div className="p-3 flex gap-2">
        <button className="bg-zinc-700 px-3 py-1.5 rounded-full text-xs flex items-center gap-1">
          <Search className="w-3 h-3" /> Scene Search
        </button>
        <button className="bg-zinc-700 px-3 py-1.5 rounded-full text-xs flex items-center gap-1">
          <Clock className="w-3 h-3" /> Reminders
        </button>
      </div>

      {/* Chat messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id}>

            {/* Align message based on sender */}
            <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.sender === 'user' ? 'bg-red-600 text-white' : 'bg-zinc-800 text-gray-100'}`}>

                {/* If AI returns structured movie list */}
                {message.movies ? (
                  <div className="space-y-3">

                    {message.movies.map((movie, idx) => (
                      <div key={idx} className="bg-zinc-700 rounded-xl p-3 space-y-2 hover:scale-[1.02] transition">

                        {/* Dynamic movie image */}
                        <img
                          src={`https://source.unsplash.com/300x200/?movie,${movie.title}`}
                          className="rounded-lg w-full"
                        />

                        {/* Movie title */}
                        <h4 className="font-semibold">{movie.title}</h4>

                        {/* Movie description */}
                        <p className="text-xs text-gray-300">{movie.description}</p>

                        {/* Action buttons */}
                        <div className="flex gap-2 mt-2">

                          {/* Play action */}
                          <button
                            onClick={() =>
                              handleQuickAction({ type: 'play', label: 'Play', movieTitle: movie.title })
                            }
                            className="text-xs bg-red-600 px-3 py-1 rounded"
                          >
                            ▶ Play
                          </button>

                          {/* Add to list */}
                          <button
                            onClick={() =>
                              handleQuickAction({ type: 'add', label: 'Add', movieTitle: movie.title })
                            }
                            className="text-xs bg-zinc-600 px-3 py-1 rounded"
                          >
                            + My List
                          </button>

                          {/* Show details inline */}
                          <button
                            onClick={() =>
                              setMessages(prev => [
                                ...prev,
                                {
                                  id: Date.now(),
                                  sender: 'ai',
                                  timestamp: new Date(),
                                  text: `📖 "${movie.title}" - ${movie.description}`
                                }
                              ])
                            }
                            className="text-xs bg-zinc-600 px-3 py-1 rounded"
                          >
                            Details
                          </button>

                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  // Plain text message fallback
                  <p className="text-sm">{message.text}</p>
                )}

              </div>
            </div>

            {/* Suggested prompts under AI message */}
            {message.suggestions && (
              <div className="mt-2 space-y-2">
                {message.suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(s)} // Auto-send suggestion
                    className="block w-full text-left text-xs bg-zinc-800 hover:bg-zinc-700 rounded-lg px-3 py-2"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && <div className="text-gray-400 text-sm">AI is typing...</div>}

        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-4 border-t border-zinc-800">
        <div className="flex gap-2">

          {/* Voice input button */}
          <button onClick={handleVoiceInput} className="bg-zinc-700 p-3 rounded-full">
            <Mic className="w-5 h-5" />
          </button>

          {/* Text input */}
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)} // Update input state
            onKeyPress={(e) => e.key === 'Enter' && handleSend(inputValue)} // Send on Enter
            placeholder="Ask me anything about movies..."
            className="flex-1 bg-zinc-800 rounded-full px-4 py-3 text-sm"
          />

          {/* Send button */}
          <button onClick={() => handleSend(inputValue)} className="bg-red-600 p-3 rounded-full">
            <Send className="w-5 h-5" />
          </button>

        </div>
      </div>
    </div>
  );
}
