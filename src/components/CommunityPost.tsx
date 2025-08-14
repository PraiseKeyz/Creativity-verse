import React from "react";
import { motion } from "framer-motion";
import { FaRegHeart, FaRegComment, FaRegShareSquare, FaRegBookmark } from "react-icons/fa";
import userIcon from '../assets/user.svg'

type Badge = {
  label: string;
  icon: React.ReactNode;
};

type Author = {
  profilePicture: string;
  lastname: string;
  firstname: string;
  skills: string[];
  badges?: { [key: string]: Badge };
  createdAt: string | number | Date;
};

type CommunityPostProps = {
  author: Author;
  children?: React.ReactNode;
  postImage?: string;
  likes?: number;
  commentsCount?: number;
  time: string | number | Date;
  index: number;
};

const getTextSizeClass = (text: string, postImage?: string) => {
  if (postImage) return "text-base"; // Always base size if image exists
  if (text.length <= 80) return "text-2xl md:text-3xl font-semibold"; // Large for short posts
  return "text-base"; // Base size for long posts
};

const CommunityPost = ({ author, children, postImage, likes = 0, commentsCount = 0, time, index }: CommunityPostProps) => {
  const postText = typeof children === "string" ? children : "";
  const textSizeClass = getTextSizeClass(postText, postImage);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1  }}
    className="border border-[var(--color-brand-orange)]/20 rounded-lg p-4 mb-6 text-white shadow-lg">
      <div className="flex items-start gap-2">
        <div className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-700 overflow-hidden border-2 border-gray-700">
          {author.profilePicture ? (
            <img
              src={author.profilePicture}
              alt="Profile picture"
              className="w-7 h-7 object-cover"
            />
          ) : (
            <img src={userIcon} alt="Default user icon" className="w-6 h-6 object-contain opacity-70" />
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold">
              {author.lastname} {author.firstname}
            </h3>
            <div className="flex gap-1">
              {Object.values(author.badges || {}).map((badge: Badge) => (
                <span key={badge.label} className="inline-block" title={badge.label}>
                  {badge.icon}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            {author.skills.map((skill) => (
              <span key={skill} className="bg-[var(--color-brand-orange)]/20 p-0.5  rounded text-xs text-[var(--color-brand-orange)]">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <p className="text-xs text-gray-400 mb-2">
          {new Date(time).toLocaleDateString()}
        </p>
      </div>
      <div className={`mt-3 mb-6 ${textSizeClass}`}>
        {children}
      </div>
      {postImage && (
        <div className="">
          <img src={postImage} alt="" className="w-full h-80 object-cover rounded-lg bg-gray-500" />
        </div>
      )}
      <div className=" border-gray-700 pt-3 flex gap-6 items-center">
        <button title="Like" className="hover:text-[var(--color-brand-orange)] transition-colors flex items-center gap-1">
          <FaRegHeart size={20} />
          <span className="text-xs">{likes}</span>
        </button>
        <button title="Comment" className="hover:text-[var(--color-brand-orange)] transition-colors flex items-center gap-1">
          <FaRegComment size={20} />
          <span className="text-xs">{commentsCount}</span>
        </button>
        <button title="Share" className="hover:text-[var(--color-brand-orange)] transition-colors">
          <FaRegShareSquare size={20} />
        </button>
        <button title="Save" className="hover:text-[var(--color-brand-orange)] transition-colors">
          <FaRegBookmark size={20} />
        </button>
      </div>
    </motion.div>
  );
};

export default CommunityPost;
