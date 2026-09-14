import React, { useState, useRef } from 'react';
import { X, Image as ImageIcon, ArrowLeft, Check, Smile, MapPin, Sparkles } from 'lucide-react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Post } from '../../types';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostCreated: (post: Post) => void;
}

const PRESET_IMAGES = [
  { label: 'Mountain Sunrise', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1080&q=80' },
  { label: 'Tokyo Rain', url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1080&q=80' },
  { label: 'Architecture', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1080&q=80' },
  { label: 'Coffee & Book', url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1080&q=80' },
  { label: 'Pastry Art', url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1080&q=80' },
];

const FILTERS = [
  { id: 'filter-normal', name: 'Normal' },
  { id: 'filter-clarendon', name: 'Clarendon' },
  { id: 'filter-gingham', name: 'Gingham' },
  { id: 'filter-juno', name: 'Juno' },
  { id: 'filter-lark', name: 'Lark' },
  { id: 'filter-moon', name: 'Moon' },
  { id: 'filter-reyes', name: 'Reyes' },
  { id: 'filter-crema', name: 'Crema' },
];

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  onPostCreated,
}) => {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<'select' | 'filter' | 'details'>('select');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string>('filter-normal');
  const [aspectRatio, setAspectRatio] = useState<'square' | 'portrait' | 'landscape'>('square');
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedImage(event.target.result as string);
          setStep('filter');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectPreset = (url: string) => {
    setSelectedImage(url);
    setStep('filter');
  };

  const handleSubmit = async () => {
    if (!selectedImage) return;
    setIsSubmitting(true);
    try {
      const newPost = await api.createPost({
        mediaUrl: selectedImage,
        caption,
        location: location.trim() || undefined,
        filter: selectedFilter,
        aspectRatio,
      });
      onPostCreated(newPost);
      handleClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep('select');
    setSelectedImage('');
    setSelectedFilter('filter-normal');
    setAspectRatio('square');
    setCaption('');
    setLocation('');
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-white hover:text-neutral-300 p-2 z-50"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="bg-neutral-900 light:bg-white border border-neutral-800 light:border-neutral-200 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Top bar */}
        <div className="px-4 py-3 border-b border-neutral-800 light:border-neutral-200 flex items-center justify-between">
          {step !== 'select' ? (
            <button
              onClick={() => setStep(step === 'details' ? 'filter' : 'select')}
              className="text-neutral-400 hover:text-white light:hover:text-black p-1"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="w-5" />
          )}

          <h3 className="font-semibold text-sm sm:text-base">
            {step === 'select' && 'Create new post'}
            {step === 'filter' && 'Crop & Filters'}
            {step === 'details' && 'New post details'}
          </h3>

          {step === 'select' && <div className="w-5" />}
          {step === 'filter' && (
            <button
              onClick={() => setStep('details')}
              className="text-ig-primary hover:text-ig-primaryHover font-semibold text-sm"
            >
              Next
            </button>
          )}
          {step === 'details' && (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="text-ig-primary hover:text-ig-primaryHover font-semibold text-sm flex items-center gap-1 disabled:opacity-50"
            >
              {isSubmitting ? 'Sharing...' : 'Share'}
            </button>
          )}
        </div>

        {/* Modal body */}
        <div className="flex-1 overflow-y-auto">
          {step === 'select' && (
            <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center space-y-6 min-h-[420px]">
              <div className="w-20 h-20 rounded-full bg-neutral-800 light:bg-neutral-100 flex items-center justify-center text-neutral-400">
                <ImageIcon className="w-10 h-10" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-1">Drag photos and videos here</h4>
                <p className="text-sm text-neutral-500">Upload your favorite memories and artwork</p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-2.5 bg-ig-primary hover:bg-ig-primaryHover text-white text-sm font-semibold rounded-lg shadow transition"
              >
                Select from computer
              </button>

              <div className="w-full pt-6 border-t border-neutral-800 light:border-neutral-200">
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
                  Or pick a sample high-res photo
                </p>
                <div className="grid grid-cols-5 gap-2">
                  {PRESET_IMAGES.map((img, i) => (
                    <div
                      key={i}
                      onClick={() => handleSelectPreset(img.url)}
                      className="group cursor-pointer rounded-lg overflow-hidden border border-neutral-700 hover:border-ig-primary relative aspect-square transition"
                    >
                      <img src={img.url} alt={img.label} className="w-full h-full object-cover group-hover:scale-110 transition" />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/0 transition flex items-end p-1">
                        <span className="text-[10px] text-white font-medium truncate drop-shadow">{img.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 'filter' && (
            <div className="grid grid-cols-1 md:grid-cols-3 min-h-[450px]">
              {/* Preview image */}
              <div className="md:col-span-2 bg-black flex items-center justify-center relative overflow-hidden max-h-[480px]">
                <img
                  src={selectedImage}
                  alt="preview"
                  className={`w-full max-h-[450px] object-contain transition duration-200 ${selectedFilter} ${
                    aspectRatio === 'square' ? 'aspect-square object-cover' : aspectRatio === 'portrait' ? 'aspect-[4/5] object-cover' : 'aspect-[16/9] object-cover'
                  }`}
                />

                {/* Aspect ratio controls */}
                <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md rounded-lg p-1 flex gap-1 text-xs">
                  <button
                    onClick={() => setAspectRatio('square')}
                    className={`px-2.5 py-1 rounded font-medium transition ${aspectRatio === 'square' ? 'bg-white text-black' : 'text-neutral-300 hover:text-white'}`}
                  >
                    1:1
                  </button>
                  <button
                    onClick={() => setAspectRatio('portrait')}
                    className={`px-2.5 py-1 rounded font-medium transition ${aspectRatio === 'portrait' ? 'bg-white text-black' : 'text-neutral-300 hover:text-white'}`}
                  >
                    4:5
                  </button>
                  <button
                    onClick={() => setAspectRatio('landscape')}
                    className={`px-2.5 py-1 rounded font-medium transition ${aspectRatio === 'landscape' ? 'bg-white text-black' : 'text-neutral-300 hover:text-white'}`}
                  >
                    16:9
                  </button>
                </div>
              </div>

              {/* Filters list */}
              <div className="p-4 border-t md:border-t-0 md:border-l border-neutral-800 light:border-neutral-200 overflow-y-auto max-h-[480px]">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-ig-primary" />
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Filters</span>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {FILTERS.map((f) => (
                    <div
                      key={f.id}
                      onClick={() => setSelectedFilter(f.id)}
                      className={`cursor-pointer rounded-lg p-1.5 border transition ${
                        selectedFilter === f.id ? 'border-ig-primary bg-neutral-800 light:bg-neutral-100' : 'border-transparent hover:border-neutral-700'
                      }`}
                    >
                      <div className="aspect-square rounded overflow-hidden mb-1">
                        <img
                          src={selectedImage}
                          alt={f.name}
                          className={`w-full h-full object-cover ${f.id}`}
                        />
                      </div>
                      <p className="text-center text-xs font-medium truncate">{f.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 'details' && (
            <div className="grid grid-cols-1 md:grid-cols-2 min-h-[420px]">
              {/* Image with applied filter */}
              <div className="bg-black flex items-center justify-center max-h-[420px]">
                <img
                  src={selectedImage}
                  alt="post"
                  className={`w-full max-h-[400px] object-contain ${selectedFilter}`}
                />
              </div>

              {/* Caption & Metadata inputs */}
              <div className="p-4 sm:p-6 flex flex-col justify-between space-y-4 border-t md:border-t-0 md:border-l border-neutral-800 light:border-neutral-200">
                <div className="space-y-4">
                  {/* User info */}
                  <div className="flex items-center space-x-3">
                    <img
                      src={user?.avatar}
                      alt={user?.username}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="font-semibold text-sm">{user?.username}</span>
                  </div>

                  {/* Caption */}
                  <div className="relative">
                    <textarea
                      rows={5}
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      placeholder="Write a caption... (hashtags like #photography, #travel are auto-detected!)"
                      className="w-full bg-transparent text-sm resize-none outline-none placeholder-neutral-500"
                    />
                    <div className="flex items-center justify-between pt-2 border-t border-neutral-800 light:border-neutral-200">
                      <div className="flex gap-1.5 text-neutral-400">
                        {['✨', '🔥', '❤️', '🏔️', '📸', '☕'].map((emoji) => (
                          <button
                            key={emoji}
                            onClick={() => setCaption((prev) => prev + ' ' + emoji)}
                            className="hover:scale-125 transition text-base"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                      <span className="text-xs text-neutral-500">{caption.length}/2,200</span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center space-x-2 border-t border-neutral-800 light:border-neutral-200 pt-3">
                    <MapPin className="w-4 h-4 text-neutral-400" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Add location (e.g. Tbilisi, Paris, Tokyo)"
                      className="flex-1 bg-transparent text-sm outline-none placeholder-neutral-500"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-800 light:border-neutral-200">
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full py-2.5 bg-ig-primary hover:bg-ig-primaryHover text-white text-sm font-semibold rounded-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      'Publishing to Instagram...'
                    ) : (
                      <>
                        <Check className="w-4 h-4" /> Share Post
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
