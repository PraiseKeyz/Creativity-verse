// src/pages/PostDetail.tsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaHeart,
  FaRegHeart,
  FaRegComment,
  FaShare,
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa";

// Mock data
type User = { id: string; name: string; username: string; avatar: string };
type Comment = { id: string; user: User; text: string; createdAt: string };
type Post = {
  id: string;
  user: User;
  content: string;
  media?: string;
  likes: number;
  shares: number;
  comments: Comment[];
  createdAt: string;
};

const MOCK_POST: Post = {
  id: "post1",
  user: {
    id: "u1",
    name: "Jane Doe",
    username: "janedoe",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  content:
    "Just finished my new project on Creativity Verse 🚀 Super pumped to share it with you all!",
  media:
    "https://images.unsplash.com/photo-1504691342899-8d1d1b1c1a3a?auto=format&fit=crop&w=1000&q=80",
  likes: 23,
  shares: 5,
  comments: [
    {
      id: "c1",
      user: {
        id: "u2",
        name: "John Smith",
        username: "johnsmith",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      text: "🔥 Congrats! This looks amazing.",
      createdAt: "2025-09-15T10:00:00Z",
    },
    {
      id: "c2",
      user: {
        id: "u3",
        name: "Alice Lee",
        username: "alicelee",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      },
      text: "Wow, can’t wait to check it out 👏",
      createdAt: "2025-09-15T12:30:00Z",
    },
  ],
  createdAt: "2025-09-15T09:00:00Z",
};

const PostDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // local states
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [comments, setComments] = useState<Comment[]>(MOCK_POST.comments);
  const [newComment, setNewComment] = useState("");

  const post = MOCK_POST; // replace with API fetch using id

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newC: Comment = {
      id: Date.now().toString(),
      user: {
        id: "me",
        name: "You",
        username: "currentuser",
        avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
      },
      text: newComment,
      createdAt: new Date().toISOString(),
    };

    setComments([newC, ...comments]);
    setNewComment("");
  };

  return (
    <main className="min-h-screen bg-[#181818] text-white font-sans">
      <div className="max-w-2xl mx-auto border-x border-gray-800">
        {/* Header */}
        <div className="flex items-center gap-4 px-4 py-3 border-b border-gray-800">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-[#232323] rounded-full"
          >
            <FaArrowLeft />
          </button>
          <h2 className="font-semibold text-lg">Post</h2>
        </div>

        {/* Post content */}
        <article className="px-4 py-6 border-b border-gray-800">
          <div className="flex items-start gap-3">
            <img
              src={post.user.avatar}
              alt={post.user.name}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{post.user.name}</span>
                <span className="text-gray-400">@{post.user.username}</span>
                <span className="text-gray-500 text-sm">· 2h ago</span>
              </div>
              <p className="mt-2 text-gray-200">{post.content}</p>
              {post.media && (
                <div className="mt-3 rounded-xl overflow-hidden border border-gray-700">
                  <img src={post.media} alt="media" className="w-full" />
                </div>
              )}
              <div className="flex items-center gap-6 mt-4 text-gray-400 text-sm">
                <span>{liked ? post.likes + 1 : post.likes} Likes</span>
                <span>{comments.length} Comments</span>
                <span>{post.shares} Shares</span>
              </div>
              <div className="flex items-center justify-around mt-3 border-t border-gray-800 pt-2 text-gray-400">
                <button
                  onClick={() => setLiked(!liked)}
                  className="flex items-center gap-2 hover:text-[var(--color-brand-orange)]"
                >
                  {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
                  Like
                </button>
                <button className="flex items-center gap-2 hover:text-[var(--color-brand-orange)]">
                  <FaRegComment /> Comment
                </button>
                <button className="flex items-center gap-2 hover:text-[var(--color-brand-orange)]">
                  <FaShare /> Share
                </button>
                <button
                  onClick={() => setSaved(!saved)}
                  className="flex items-center gap-2 hover:text-[var(--color-brand-orange)]"
                >
                  {saved ? <FaBookmark /> : <FaRegBookmark />}
                  Save
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* Comment form */}
        <form
          onSubmit={handleAddComment}
          className="flex items-center gap-3 px-4 py-3 border-b border-gray-800"
        >
          <img
            src="https://randomuser.me/api/portraits/lego/1.jpg"
            alt="me"
            className="w-10 h-10 rounded-full"
          />
          <input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 bg-transparent outline-none text-sm placeholder-gray-500"
          />
          <button
            type="submit"
            className="px-4 py-1 bg-[var(--color-brand-orange)] text-black rounded-md font-semibold text-sm"
          >
            Reply
          </button>
        </form>

        {/* Comments */}
        <section>
          {comments.map((c) => (
            <div
              key={c.id}
              className="flex items-start gap-3 px-4 py-4 border-b border-gray-800"
            >
              <img
                src={c.user.avatar}
                alt={c.user.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{c.user.name}</span>
                  <span className="text-gray-400">@{c.user.username}</span>
                  <span className="text-gray-500 text-xs">· 1h ago</span>
                </div>
                <p className="text-gray-300 mt-1">{c.text}</p>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
};

export default PostDetail;