import { useEffect, useState, Suspense } from "react";

// Utility to extract URLs and style them
function renderPostWithLinks(text: string) {
  if (!text) return null;
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);
  return parts.map((part, i) => {
    if (urlRegex.test(part)) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-[var(--color-brand-orange)] break-all hover:opacity-80"
        >
          {part}
        </a>
      );
    }
    return <span key={i}>{part}</span>;
  });
}
import { FiChevronDown } from "react-icons/fi";
import CommunityPost from "../components/AppComponent/CommunityPost";
import { SocialState, useSocialStore } from "../store/socialStore"; // <-- add this import

const categories = ["Trending", "Latest"];

const Community = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(categories[0]);
  const { blogs, isLoading, error, fetchBlogs } = useSocialStore();

  useEffect(() => {
    fetchBlogs();
    // eslint-disable-next-line
  }, [selected]);

  return (
    <div className="text-white mb-4 h-screen">
      <div className="relative w-48 mt-4">
        <button
          className="flex items-center w-full px-4 py-2 cursor-pointer focus:outline-none"
          onClick={() => setOpen(prev => !prev)}
        >
          <span className="font-semibold">{selected}</span>
          <FiChevronDown className="ml-2 text-[var(--color-brand-orange)]" />
        </button>
        {open && (
          <div className="absolute left-0 w-full mt-1 bg-gray-900 rounded shadow-lg z-10">
            {categories.map(cat => (
              <div
                key={cat}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-700 ${
                  selected === cat ? "bg-gray-700" : ""
                }`}
                onClick={() => {
                  setSelected(cat);
                  setOpen(false);
                }}
              >
                {cat}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mt-6">
        <Suspense
          fallback={
            <div className="text-center text-gray-400">Loading posts...</div>
          }
        >
          {isLoading ? (
            <div className="text-center text-gray-400">Loading posts...</div>
          ) : blogs && blogs.length > 0 ? (
            blogs.map((post, index) => (
              <CommunityPost
                postId={post._id}
                key={post._id}
                author={post?.user ?? null}
                postImage={undefined}
                likes={post.likes.length}
                commentsCount={post.comments.length}
                time={post.createdAt}
                index={index}
              >
                {renderPostWithLinks(post.content)}
              </CommunityPost>
            ))
          ) : (
            <div className="text-center text-gray-400">No posts found.</div>
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default Community;
