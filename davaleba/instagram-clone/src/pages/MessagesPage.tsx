import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Image as ImageIcon,
  Heart,
  Smile,
  Info,
  Phone,
  Video,
  Search,
  CheckCheck,
} from 'lucide-react';
import { Conversation, Message } from '../types';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const MessagesPage: React.FC = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<string>('conv_1');
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    api.getConversations().then((res) => {
      setConversations(res);
      if (res.length > 0 && !activeConvId) {
        setActiveConvId(res[0].id);
      }
    });
  }, []);

  const activeConv = conversations.find((c) => c.id === activeConvId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConv?.messages, isTyping]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || !activeConvId) return;

    const text = inputText.trim();
    setInputText('');

    const updated = await api.sendMessage(activeConvId, text);
    setConversations((prev) =>
      prev.map((c) => (c.id === activeConvId ? updated : c))
    );

    // Simulate smart automated response after 1.5 seconds
    setIsTyping(true);
    setTimeout(async () => {
      setIsTyping(false);
      const responses = [
        'That sounds fantastic! Let’s do it 🔥',
        'Awesome, checking it right now! 📸',
        'Love this aesthetic so much ✨',
        'Totally agree! Let’s catch up soon ☕',
      ];
      const randomReply = responses[Math.floor(Math.random() * responses.length)];
      const botMessage: Message = {
        id: `msg_bot_${Date.now()}`,
        senderId: activeConv?.participant.id || 'user_1',
        text: randomReply,
        createdAt: 'Just now',
        isRead: true,
      };

      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeConvId
            ? {
                ...c,
                lastMessage: botMessage,
                messages: [...c.messages, botMessage],
              }
            : c
        )
      );
    }, 1500);
  };

  const handleSendHeart = async () => {
    if (!activeConvId) return;
    const updated = await api.sendMessage(activeConvId, '❤️');
    setConversations((prev) =>
      prev.map((c) => (c.id === activeConvId ? updated : c))
    );
  };

  const filteredConversations = conversations.filter((c) =>
    c.participant.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.participant.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-[975px] mx-auto pt-2 md:pt-6 pb-20 px-2 sm:px-4 h-[calc(100vh-80px)]">
      <div className="bg-black light:bg-white border border-neutral-800 light:border-neutral-200 rounded-2xl h-full flex overflow-hidden shadow-2xl">
        {/* Left: Chat List */}
        <div className={`w-full md:w-[350px] flex flex-col border-r border-neutral-800 light:border-neutral-200 flex-shrink-0 ${activeConvId && 'hidden md:flex'}`}>
          {/* Header */}
          <div className="p-4 border-b border-neutral-800 light:border-neutral-200 flex items-center justify-between">
            <h2 className="font-bold text-lg">{user?.username}</h2>
            <span className="text-xs font-semibold text-neutral-400">Messages</span>
          </div>

          {/* Search Contacts */}
          <div className="p-3 border-b border-neutral-800 light:border-neutral-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search messages"
                className="w-full bg-neutral-900 light:bg-neutral-100 rounded-lg pl-9 pr-3 py-2 text-xs outline-none placeholder-neutral-500"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {filteredConversations.map((conv) => {
              const isActive = conv.id === activeConvId;
              return (
                <div
                  key={conv.id}
                  onClick={() => setActiveConvId(conv.id)}
                  className={`flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition ${
                    isActive
                      ? 'bg-neutral-900 light:bg-neutral-100 font-medium'
                      : 'hover:bg-neutral-900/50 light:hover:bg-neutral-50'
                  }`}
                >
                  <div className="relative">
                    <img
                      src={conv.participant.avatar}
                      alt={conv.participant.username}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {conv.participant.isOnline && (
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-black light:border-white rounded-full" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{conv.participant.username}</p>
                    <p className="text-xs text-neutral-400 truncate flex items-center justify-between">
                      <span className="truncate">{conv.lastMessage.text}</span>
                      <span className="text-[10px] text-neutral-500 ml-1">
                        {conv.lastMessage.createdAt}
                      </span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Active Chat Window */}
        {activeConv ? (
          <div className="flex-1 flex flex-col bg-neutral-950 dark:bg-black light:bg-white">
            {/* Header */}
            <div className="p-3.5 border-b border-neutral-800 light:border-neutral-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setActiveConvId('')}
                  className="md:hidden text-neutral-400 hover:text-white p-1 text-sm font-semibold"
                >
                  Back
                </button>
                <div className="relative">
                  <img
                    src={activeConv.participant.avatar}
                    alt={activeConv.participant.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {activeConv.participant.isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black light:border-white rounded-full" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{activeConv.participant.username}</h3>
                  <p className="text-[11px] text-neutral-400">{activeConv.participant.lastActive}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-neutral-300 light:text-neutral-700">
                <button className="p-1.5 hover:bg-neutral-800 light:hover:bg-neutral-100 rounded-full">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="p-1.5 hover:bg-neutral-800 light:hover:bg-neutral-100 rounded-full">
                  <Video className="w-5 h-5" />
                </button>
                <button className="p-1.5 hover:bg-neutral-800 light:hover:bg-neutral-100 rounded-full">
                  <Info className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {/* Profile Card inside chat */}
              <div className="text-center py-6">
                <img
                  src={activeConv.participant.avatar}
                  alt={activeConv.participant.username}
                  className="w-20 h-20 rounded-full mx-auto object-cover mb-2 ring-2 ring-neutral-700"
                />
                <h4 className="font-bold text-base">{activeConv.participant.fullName}</h4>
                <p className="text-xs text-neutral-400">@{activeConv.participant.username} • Instagram</p>
                <button className="mt-3 px-4 py-1.5 bg-neutral-800 light:bg-neutral-200 text-xs font-semibold rounded-lg hover:bg-neutral-700">
                  View Profile
                </button>
              </div>

              {/* Messages list */}
              {activeConv.messages.map((m) => {
                const isMe = m.senderId === user?.id || m.senderId === 'user_current';
                return (
                  <div
                    key={m.id}
                    className={`flex items-end space-x-2 ${isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    {!isMe && (
                      <img
                        src={activeConv.participant.avatar}
                        alt="avatar"
                        className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                      />
                    )}
                    <div
                      className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        m.text === '❤️'
                          ? 'text-3xl bg-transparent'
                          : isMe
                          ? 'bg-ig-primary text-white rounded-br-none'
                          : 'bg-neutral-800 light:bg-neutral-200 text-neutral-100 light:text-neutral-900 rounded-bl-none'
                      }`}
                    >
                      <p>{m.text}</p>
                      {m.text !== '❤️' && (
                        <span className={`text-[9px] block text-right mt-1 opacity-70`}>
                          {m.createdAt}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-center space-x-2 text-xs text-neutral-400">
                  <img
                    src={activeConv.participant.avatar}
                    alt="avatar"
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <div className="bg-neutral-800 light:bg-neutral-200 px-3 py-1.5 rounded-full flex gap-1">
                    <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Bottom Message Input Bar */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 border-t border-neutral-800 light:border-neutral-200 flex items-center space-x-2"
            >
              <div className="flex-1 bg-neutral-900 light:bg-neutral-100 rounded-full px-4 py-2.5 flex items-center space-x-2 border border-neutral-800 light:border-neutral-200">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Message..."
                  className="flex-1 bg-transparent text-xs sm:text-sm outline-none placeholder-neutral-500"
                />

                <button
                  type="button"
                  onClick={() => setInputText((prev) => prev + ' 🙌')}
                  className="text-neutral-400 hover:text-white text-base transition"
                >
                  <Smile className="w-5 h-5" />
                </button>
              </div>

              {inputText.trim() ? (
                <button
                  type="submit"
                  className="p-2.5 bg-ig-primary hover:bg-ig-primaryHover text-white rounded-full transition shadow active:scale-95"
                >
                  <Send className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSendHeart}
                  className="p-2 text-red-500 hover:scale-125 transition"
                >
                  <Heart className="w-6 h-6 fill-red-500" />
                </button>
              )}
            </form>
          </div>
        ) : (
          <div className="flex-1 hidden md:flex flex-col items-center justify-center text-center p-8 text-neutral-500">
            <div className="w-20 h-20 rounded-full border-2 border-neutral-700 flex items-center justify-center mb-4">
              <Send className="w-10 h-10 -rotate-45" />
            </div>
            <h3 className="text-xl font-bold text-neutral-200 mb-1">Your messages</h3>
            <p className="text-sm text-neutral-400">Send a message to start a chat with your friends.</p>
          </div>
        )}
      </div>
    </div>
  );
};
