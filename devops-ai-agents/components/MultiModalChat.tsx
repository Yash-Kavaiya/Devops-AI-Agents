'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  BsSend, 
  BsRobot, 
  BsX, 
  BsDash,
  BsImage, 
  BsFileEarmark, 
  BsCameraVideo,
  BsDownload,
  BsTrash,
  BsPaperclip,
  BsLightningCharge,
  BsStars,
  BsMic,
  BsMicMute,
  BsVolumeUp,
  BsVolumeMute,
  BsEmojiSmile
} from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface MediaAttachment {
  id: string;
  type: 'image' | 'video' | 'file';
  name: string;
  url: string;
  size?: string;
  preview?: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  attachments?: MediaAttachment[];
}

export default function MultiModalChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: 'Hello! I\'m your DevOps AI Assistant. I can help you with text, images, videos, and files. How can I assist you today? 🚀',
      timestamp: new Date() 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [attachments, setAttachments] = useState<MediaAttachment[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize speech recognition and synthesis
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialize Speech Recognition
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInput(prev => prev + (prev ? ' ' : '') + transcript);
          setIsListening(false);
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }

      // Initialize Speech Synthesis
      synthRef.current = window.speechSynthesis;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  // Voice input handler
  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error('Error starting speech recognition:', error);
      }
    }
  };

  // Text-to-speech handler
  const speakText = (text: string) => {
    if (!synthRef.current || !voiceEnabled) return;

    // Cancel any ongoing speech
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Get available voices and select a nice one
    const voices = synthRef.current.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.name.includes('Google') || 
      voice.name.includes('Microsoft') ||
      voice.lang.startsWith('en')
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  };

  // Stop speaking
  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  // Handle file upload
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    processFiles(files);
  };

  const processFiles = (files: File[]) => {
    files.forEach(file => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const url = e.target?.result as string;
        let type: 'image' | 'video' | 'file' = 'file';
        
        if (file.type.startsWith('image/')) {
          type = 'image';
        } else if (file.type.startsWith('video/')) {
          type = 'video';
        }
        
        const attachment: MediaAttachment = {
          id: Math.random().toString(36).substr(2, 9),
          type,
          name: file.name,
          url,
          size: formatFileSize(file.size),
          preview: type === 'image' ? url : undefined
        };
        
        setAttachments(prev => [...prev, attachment]);
      };
      
      reader.readAsDataURL(file);
    });
  };

  // Drag and drop handlers
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  };

  const removeAttachment = (id: string) => {
    setAttachments(prev => prev.filter(att => att.id !== id));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && attachments.length === 0) return;

    // Add user message
    const userMessage: Message = { 
      role: 'user', 
      content: input || 'Sent attachments',
      timestamp: new Date(),
      attachments: [...attachments]
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setAttachments([]);
    setLoading(true);

    // Simulate AI response with multi-modal support
    setTimeout(() => {
      // Generate contextual AI response
      let aiContent = '';
      const hasImages = userMessage.attachments?.some(att => att.type === 'image');
      const hasVideos = userMessage.attachments?.some(att => att.type === 'video');
      const hasFiles = userMessage.attachments?.some(att => att.type === 'file');

      if (hasImages) {
        aiContent = '📸 I\'ve analyzed the images you provided. Here\'s what I found:\n\n• Image quality: High resolution\n• Content detected: DevOps dashboard, metrics graphs\n• Recommendation: Your metrics show healthy system performance with 99.8% uptime.\n\nWould you like me to generate a detailed report?';
      } else if (hasVideos) {
        aiContent = '🎥 I\'ve processed your video file. Based on the visual analysis:\n\n• Duration: Detected deployment process\n• Key events: Build, test, and deploy stages\n• Performance: Identified a 15% optimization opportunity in the build stage.\n\nI can create a visual breakdown if needed!';
      } else if (hasFiles) {
        aiContent = '📄 I\'ve reviewed your files. Here\'s the summary:\n\n• Configuration files look good\n• Detected potential improvements in resource allocation\n• Security scan: No vulnerabilities found\n\nShall I proceed with the recommended optimizations?';
      } else {
        aiContent = generateContextualResponse(input);
      }

      // Sometimes include media in AI response
      const aiAttachments: MediaAttachment[] = [];
      if (Math.random() > 0.6 && (hasImages || hasFiles)) {
        aiAttachments.push({
          id: Math.random().toString(36).substr(2, 9),
          type: 'image',
          name: 'analysis-report.png',
          url: '/api/placeholder/400/300',
          preview: '/api/placeholder/400/300',
          size: '245 KB'
        });
      }

      const aiMessage: Message = { 
        role: 'assistant', 
        content: aiContent,
        timestamp: new Date(),
        attachments: aiAttachments.length > 0 ? aiAttachments : undefined
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setLoading(false);
      
      // Speak the AI response if voice is enabled
      if (voiceEnabled) {
        setTimeout(() => speakText(aiContent), 500);
      }
    }, 2000);
  };

  const generateContextualResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes('deploy') || lowerInput.includes('pipeline')) {
      return '🚀 I can help with deployment! Your CI/CD pipeline is currently running smoothly. Would you like me to:\n\n• Optimize build times\n• Review deployment logs\n• Set up automated testing\n\nWhat would you prefer?';
    } else if (lowerInput.includes('monitor') || lowerInput.includes('performance')) {
      return '📊 Checking your system performance:\n\n• CPU usage: 42%\n• Memory: 65%\n• Response time: 120ms avg\n• Active services: 24/24\n\nEverything looks healthy! Would you like detailed metrics?';
    } else if (lowerInput.includes('security') || lowerInput.includes('scan')) {
      return '🔒 Running security analysis:\n\n✅ No critical vulnerabilities\n⚠️ 2 medium-priority updates available\n✅ SSL certificates valid\n✅ Firewall rules configured\n\nWould you like me to schedule the updates?';
    }
    
    return 'I\'m analyzing your request. I can help with:\n\n• 🔄 CI/CD Management\n• ☁️ Cloud Infrastructure\n• 🔒 Security Scanning\n• 📊 Performance Monitoring\n• 🐳 Container Orchestration\n\nWhat would you like to explore?';
  };

  const renderAttachment = (attachment: MediaAttachment) => {
    switch (attachment.type) {
      case 'image':
        return (
          <div className="relative group rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
            <img 
              src={attachment.preview || attachment.url} 
              alt={attachment.name}
              className="w-full h-40 object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button className="p-2 bg-white rounded-full text-gray-800 hover:bg-gray-100">
                <BsDownload size={16} />
              </button>
            </div>
            <div className="p-2 bg-white/95 backdrop-blur-sm">
              <p className="text-xs font-medium text-gray-700 truncate">{attachment.name}</p>
              {attachment.size && <p className="text-xs text-gray-500">{attachment.size}</p>}
            </div>
          </div>
        );
      
      case 'video':
        return (
          <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
            <div className="w-full h-40 bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
              <BsCameraVideo size={48} className="text-white/80" />
            </div>
            <div className="p-2 bg-white">
              <p className="text-xs font-medium text-gray-700 truncate">{attachment.name}</p>
              {attachment.size && <p className="text-xs text-gray-500">{attachment.size}</p>}
            </div>
          </div>
        );
      
      case 'file':
        return (
          <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <BsFileEarmark className="text-white" size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-700 truncate">{attachment.name}</p>
              {attachment.size && <p className="text-xs text-gray-500">{attachment.size}</p>}
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <BsDownload size={16} className="text-gray-600" />
            </button>
          </div>
        );
    }
  };

  if (!isOpen) {
    return (
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-20 h-20 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <div className="relative">
          <BsRobot size={32} className="group-hover:scale-110 transition-transform" />
          <motion.span 
            className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        height: isMinimized ? '60px' : '720px'
      }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 w-[540px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      style={{ maxHeight: '95vh' }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <BsRobot size={20} />
              </div>
              <motion.span 
                className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div>
              <h3 className="font-semibold flex items-center gap-2">
                DevOps AI Assistant
                <BsLightningCharge className="text-yellow-300" size={14} />
              </h3>
              <div className="text-xs text-white/80 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                {isSpeaking ? 'Speaking...' : 'Always online'}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Voice toggle button */}
            <button
              onClick={() => {
                setVoiceEnabled(!voiceEnabled);
                if (isSpeaking) stopSpeaking();
              }}
              className={`p-2 rounded-lg transition-colors ${
                voiceEnabled ? 'bg-white/20 hover:bg-white/30' : 'bg-white/10 hover:bg-white/20'
              }`}
              title={voiceEnabled ? 'Voice output enabled' : 'Voice output disabled'}
            >
              {voiceEnabled ? (
                <BsVolumeUp size={16} className="text-white" />
              ) : (
                <BsVolumeMute size={16} className="text-white/50" />
              )}
            </button>
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <BsDash size={20} />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <BsX size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Chat Content - Only show when not minimized */}
      {!isMinimized && (
        <>
          {/* Messages Area */}
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-white chat-widget-scrollbar"
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {/* Drag overlay */}
            <AnimatePresence>
              {isDragging && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-indigo-600/10 backdrop-blur-sm z-10 flex items-center justify-center border-4 border-dashed border-indigo-500 m-4 rounded-xl"
                >
                  <div className="text-center">
                    <BsImage size={48} className="text-indigo-600 mx-auto mb-2" />
                    <p className="text-lg font-semibold text-indigo-600">Drop files here</p>
                    <p className="text-sm text-gray-600">Images, videos, or documents</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`mb-4 ${msg.role === 'user' ? 'flex justify-end' : 'flex justify-start'}`}
                >
                  <div className={`max-w-[85%] ${msg.role === 'user' ? 'order-2' : 'order-1'}`}>
                    <div
                      className={`rounded-2xl p-3 shadow-sm ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-tr-sm'
                          : 'bg-white border border-gray-100 text-gray-800 rounded-tl-sm'
                      }`}
                    >
                      {msg.content && (
                        <div className="mb-2 whitespace-pre-wrap text-sm leading-relaxed">
                          {msg.content}
                        </div>
                      )}
                      
                      {/* Attachments */}
                      {msg.attachments && msg.attachments.length > 0 && (
                        <div className="space-y-2 mt-2">
                          {msg.attachments.map(att => (
                            <div key={att.id}>
                              {renderAttachment(att)}
                            </div>
                          ))}
                        </div>
                      )}

                      <div className={`text-xs mt-2 flex items-center justify-between ${msg.role === 'user' ? 'text-white/70' : 'text-gray-400'}`}>
                        <span>{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        {/* Voice playback for AI messages */}
                        {msg.role === 'assistant' && voiceEnabled && msg.content && (
                          <button
                            onClick={() => speakText(msg.content)}
                            className="ml-2 p-1 hover:bg-gray-100 rounded transition-colors"
                            title="Listen to this message"
                          >
                            <BsMic size={12} className="text-indigo-600" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing indicator */}
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start mb-4"
              >
                <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm p-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <BsRobot className="text-indigo-600" size={16} />
                    <div className="flex space-x-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                          animate={{ y: [0, -8, 0] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.2
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Attachments Preview */}
          {attachments.length > 0 && (
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <BsPaperclip size={14} className="text-gray-500" />
                <span className="text-xs font-medium text-gray-600">
                  {attachments.length} file{attachments.length > 1 ? 's' : ''} attached
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {attachments.map(att => (
                  <div key={att.id} className="relative group">
                    <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-gray-200 text-sm">
                      {att.type === 'image' && <BsImage className="text-indigo-600" size={16} />}
                      {att.type === 'video' && <BsCameraVideo className="text-purple-600" size={16} />}
                      {att.type === 'file' && <BsFileEarmark className="text-blue-600" size={16} />}
                      <span className="text-xs text-gray-700 max-w-[100px] truncate">{att.name}</span>
                      <button
                        onClick={() => removeAttachment(att.id)}
                        className="ml-1 p-1 hover:bg-gray-100 rounded transition-colors"
                      >
                        <BsTrash size={12} className="text-red-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-100">
            <div className="flex items-end gap-2">
              {/* Attachment and Voice buttons */}
              <div className="flex gap-1 pb-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*,video/*,.pdf,.doc,.docx,.txt,.json,.yaml,.yml"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
                  title="Attach files"
                >
                  <BsPaperclip size={20} className="text-gray-500 group-hover:text-indigo-600" />
                </button>
                {/* Voice Input Button */}
                <button
                  type="button"
                  onClick={toggleVoiceInput}
                  className={`p-2 rounded-lg transition-all group relative ${
                    isListening 
                      ? 'bg-red-500 text-white animate-pulse' 
                      : 'hover:bg-gray-100 text-gray-500'
                  }`}
                  title={isListening ? "Stop recording" : "Voice input"}
                  disabled={loading}
                >
                  <BsMic size={20} className={isListening ? 'text-white' : 'group-hover:text-indigo-600'} />
                  {isListening && (
                    <motion.span
                      className="absolute inset-0 rounded-lg border-2 border-red-500"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </button>
              </div>

              {/* Input field */}
              <div className="flex-1 relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend(e);
                    }
                  }}
                  placeholder="Type a message... (Shift+Enter for new line)"
                  className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-sm"
                  rows={1}
                  style={{ minHeight: '44px', maxHeight: '120px' }}
                  disabled={loading}
                />
              </div>

              {/* Send button */}
              <button
                type="submit"
                disabled={loading || (!input.trim() && attachments.length === 0)}
                className={`p-3 rounded-xl transition-all ${
                  input.trim() || attachments.length > 0
                    ? 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <BsSend size={18} />
              </button>
            </div>
            
            {/* Footer info */}
            <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <BsStars size={12} className="text-indigo-600" />
                <span>
                  {isListening 
                    ? '🎤 Listening...' 
                    : isSpeaking 
                    ? '🔊 Speaking...' 
                    : 'Powered by AI • Voice & Multi-modal'}
                </span>
              </div>
              {isSpeaking && (
                <button
                  onClick={stopSpeaking}
                  className="text-xs text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
                >
                  <BsX size={14} />
                  Stop
                </button>
              )}
            </div>
          </form>
        </>
      )}
    </motion.div>
  );
}
