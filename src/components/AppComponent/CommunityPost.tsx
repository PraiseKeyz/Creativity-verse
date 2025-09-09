import React from "react";
import { motion } from "framer-motion";
import {
  FaRegHeart,
  FaRegComment,
  FaRegShareSquare,
  FaRegBookmark,
} from "react-icons/fa";
import userIcon from "../../assets/user.svg"; // Your default avatar
import { BlogUser, useSocialStore } from "../../store/socialStore";

type Badge = {
  label: string;
  icon: React.ReactNode;
};

type CommunityPostProps = {
  author: BlogUser | null;
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

const CommunityPost = ({
  author,
  children,
  postImage,
  likes = 0,
  commentsCount = 0,
  time,
  index,
  postId,
}: CommunityPostProps & { postId: string }) => {
  const postText = typeof children === "string" ? children : "";
  const textSizeClass = getTextSizeClass(postText, postImage);

  const { likeBlog, commentBlog, isLoading } = useSocialStore();

  // Use default avatar and safe author fields
  const profilePicture =
    author && author.first_name ? author?.info?.avatar : userIcon;

  const last_name = author?.last_name || "Unknown";
  const first_name = author?.first_name || "";
  // const skills = author?.skills || [];
  // const badges = author?.badges || {};
  // const createdAt = author?.createdAt || time;

  // Like handler
  const handleLike = async () => {
    await likeBlog(postId);
  };

  // Comment handler
  const handleComment = async () => {
    const comment = window.prompt("Enter your comment:");
    if (comment) {
      await commentBlog(postId, comment);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="border border-[var(--color-brand-orange)]/20 rounded-lg p-4 mb-6 text-white shadow-lg"
    >
      <div className="flex items-start gap-2">
        <img
          src={profilePicture}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold">
              {first_name} {last_name}
            </h3>
            {/* <div className="flex gap-1">
              {Object.values(badges).map((badge: Badge) => (
                <span
                  key={badge.label}
                  className="inline-block"
                  title={badge.label}
                >
                  {badge.icon}
                </span>
              ))}
            </div> */}
          </div>
          {/* <div className="flex flex-wrap gap-2 mb-2">
            {skills.map(skill => (
              <span
                key={skill}
                className="bg-[var(--color-brand-orange)]/20 p-0.5  rounded text-xs text-[var(--color-brand-orange)]"
              >
                {skill}
              </span>
            ))}
          </div> */}
        </div>
        <p className="text-xs text-gray-400 mb-2">
          {time instanceof Date ? time.toLocaleDateString() : time}
        </p>
      </div>
      <div className={`mt-3 mb-6 ${textSizeClass}`}>{children}</div>
      {postImage && (
        <div className="">
          <img
            src={postImage}
            alt=""
            className="w-full h-80 object-cover rounded-lg bg-gray-500"
          />
        </div>
      )}
      <div className=" border-gray-700 pt-3 flex gap-6 items-center">
        <button
          type="button" // <-- Add this!
          title="Like"
          className="hover:text-[var(--color-brand-orange)] transition-colors flex items-center gap-1"
          onClick={handleLike}
          disabled={isLoading}
        >
          <FaRegHeart size={20} />
          <span className="text-xs">{likes}</span>
        </button>
        <button
          type="button" // <-- Add this!
          title="Comment"
          className="hover:text-[var(--color-brand-orange)] transition-colors flex items-center gap-1"
          onClick={handleComment}
          disabled={isLoading}
        >
          <FaRegComment size={20} />
          <span className="text-xs">{commentsCount}</span>
        </button>
        <button
          title="Share"
          className="hover:text-[var(--color-brand-orange)] transition-colors"
        >
          <FaRegShareSquare size={20} />
        </button>
        <button
          title="Save"
          className="hover:text-[var(--color-brand-orange)] transition-colors"
        >
          <FaRegBookmark size={20} />
        </button>
      </div>
    </motion.div>
  );
};

export default CommunityPost;
