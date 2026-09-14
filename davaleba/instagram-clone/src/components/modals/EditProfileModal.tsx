import React, { useState, useRef } from 'react';
import { X, Camera } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose }) => {
  const { user, updateProfile } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fullName, setFullName] = useState(user?.fullName || '');
  const [username, setUsername] = useState(user?.username || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [website, setWebsite] = useState(user?.website || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !user) return null;

  const handleAvatarFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatar(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await updateProfile({
        fullName,
        username,
        bio,
        website,
        avatar,
      });
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-neutral-900 light:bg-white border border-neutral-800 light:border-neutral-200 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-4 py-3.5 border-b border-neutral-800 light:border-neutral-200 flex items-center justify-between">
          <h3 className="font-semibold text-sm">Edit Profile</h3>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white light:hover:text-black p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="p-6 space-y-5 overflow-y-auto max-h-[80vh]">
          {/* Avatar Section */}
          <div className="flex items-center justify-between bg-neutral-800/40 light:bg-neutral-100 p-4 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="relative group">
                <img
                  src={avatar || user.avatar}
                  alt={user.username}
                  className="w-14 h-14 rounded-full object-cover border border-neutral-700"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                >
                  <Camera className="w-5 h-5 text-white" />
                </button>
              </div>
              <div>
                <p className="font-semibold text-sm">{user.username}</p>
                <p className="text-xs text-neutral-400">{user.fullName}</p>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarFile}
              className="hidden"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-xs font-semibold text-ig-primary hover:text-ig-primaryHover bg-ig-primary/10 px-3 py-1.5 rounded-lg"
            >
              Change photo
            </button>
          </div>

          {/* Full Name */}
          <div>
            <label className="text-xs font-semibold text-neutral-400 block mb-1.5">Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-neutral-800 light:bg-neutral-100 border border-neutral-700 light:border-neutral-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-ig-primary"
              placeholder="Full Name"
              required
            />
          </div>

          {/* Username */}
          <div>
            <label className="text-xs font-semibold text-neutral-400 block mb-1.5">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-neutral-800 light:bg-neutral-100 border border-neutral-700 light:border-neutral-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-ig-primary"
              placeholder="Username"
              required
            />
          </div>

          {/* Website */}
          <div>
            <label className="text-xs font-semibold text-neutral-400 block mb-1.5">Website</label>
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full bg-neutral-800 light:bg-neutral-100 border border-neutral-700 light:border-neutral-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-ig-primary"
              placeholder="https://yourwebsite.com"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="text-xs font-semibold text-neutral-400 block mb-1.5">Bio</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={150}
              className="w-full bg-neutral-800 light:bg-neutral-100 border border-neutral-700 light:border-neutral-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-ig-primary resize-none"
              placeholder="Bio (e.g. Creator, photographer...)"
            />
            <span className="text-[11px] text-neutral-500 float-right mt-1">{bio.length}/150</span>
          </div>

          {/* Actions */}
          <div className="pt-4 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-neutral-400 hover:text-white rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-ig-primary hover:bg-ig-primaryHover text-white text-sm font-semibold rounded-lg shadow disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
