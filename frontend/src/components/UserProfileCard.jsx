import React, { useState, useRef, useEffect } from 'react';
import { LANGUAGE_TO_FLAG } from '../constants';
import useAuthUser from '../hooks/useAuthUser';
import { capitialize } from '../lib/utils';

const UserProfileCard = () => {
  const { authUser } = useAuthUser();

  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef();

  // Close the card when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <div className="inline-block text-left">
        {/* Trigger button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center p-2 space-x-2 transition rounded-full"
        >
          <img
            src={authUser?.profilePic}
            alt={authUser?.fullName}
            className="w-10 h-10 rounded-full"
          />
        </button>
      </div>

      {/* Profile Card */}
      {isOpen && (
        <div className="mt-16 mr-16 transition-shadow card bg-base-200 hover:shadow-md">
          <div className="z-10 p-4 card-body">
            {/* USER INFO */}
            <div className="flex items-center gap-3 mb-2">
              <div className="avatar size-12">
                <img src={authUser?.profilePic} alt={authUser?.fullName} />
              </div>
              <h3 className="font-semibold truncate">{authUser?.fullName}</h3>
            </div>

            <div>
              <h4>{authUser?.bio}</h4>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-3">
              <span className="text-xs badge badge-secondary">
                {getLanguageFlag(authUser?.nativeLanguage)}
                Native: {capitialize(authUser?.nativeLanguage)}
              </span>
              <span className="text-xs badge badge-outline">
                {getLanguageFlag(authUser?.learningLanguage)}
                Learning: {capitialize(authUser?.learningLanguage)}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfileCard;

export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="inline-block h-3 mr-1"
      />
    );
  }
  return null;
}
