import { useEffect, useState, Suspense } from "react";

import { FaCheckCircle } from "react-icons/fa";
import { PiCertificateFill } from "react-icons/pi";
import { FiChevronDown } from "react-icons/fi";
import CommunityPost from "../components/AppComponent/CommunityPost";

const categories = ["Trending", "Latest"];

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



const UserProfile = () => {
  const author = {
    firstname: "Creativity",
    lastname: "Verse",
    isVerified: true,
    profilePicture:
      "https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?auto=format&fit=facearea&w=256&h=256&facepad=2",
    skills: ["Freelancing", "Networking"],
    badges: [<PiCertificateFill className="text-orange-500" key="badge1" />],
  };

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(categories[0]);
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchPosts = async () => {
        setLoading(true);
        try {
          const response = await fetch("/Data/communityPost.json");
          const data = await response.json();
          setPosts(data.posts || []);
        } catch (error) {
          console.error("Error fetching posts:", error);
          setPosts([]);
        } finally {
          setLoading(false);
        }
      };
      fetchPosts();
    }, [selected]);

  return (
    <div className="overflow-y-scroll custom-scrollbar h-screen text-white " style={{ fontFamily: "var(--font-primary)" }}>

      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#FF6F00] to-[#863b02] p-8 rounded-br-xl rounded-bl-xl shadow-md relative min-h-[212px] mb-10">
        <img
          src={author.profilePicture}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover absolute left-10 -bottom-[20%] border-3 border-black"
        />
      </div>

      {/* User details  */}
      <div className="">
        <div className="p-4 border-b border-[#FF6F00]/20">
          <div className="">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                {author.firstname} {author.lastname}
                {author.isVerified && (
                  <FaCheckCircle className="text-blue-500 text-sm" />
                )}
              </h1>
              <p className="text-sm text-white/70">
                Interface and Brand Designer based in San Antonio
              </p>
              <div className="flex gap-2 mt-1 text-sm">
                {author.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-white/10 px-2 py-1 rounded"
                  >
                    {skill}
                  </span>
                ))}
                {author.badges.map((badge) => badge)}
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-lg font-semibold">2,985</p>
                    <p className="text-xs text-white/50">Followers</p>
                  </div>
                  <div className="">
                    <p className="text-lg font-semibold">132</p>
                    <p className="text-xs text-white/50">Following</p>
                  </div>
                  <div className="">
                    <p className="text-lg font-semibold">548</p>
                    <p className="text-xs text-white/50">Likes</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button className="px-4 py-1 text-sm bg-[var(--color-brand-orange)] rounded-md hover:bg-white/10">
                    Follow
                  </button>
                  <button className="px-4 py-1 bg-black rounded-md text-sm border border-white/20 hover:bg-white/10">
                    Get in touch
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Activities</h2>
            <div className="relative w-fit ">
              <button className="flex items-center w-full px-4 py-2 cursor-pointer focus:outline-none" onClick={() => setOpen((prev) => !prev)} >
                <span className="font-semibold">{selected}</span>
                <FiChevronDown className="ml-2 text-[var(--color-brand-orange)]" />
              </button>
              {open && (
                <div className="absolute left-0 w-full mt-1 bg-gray-900 rounded shadow-lg z-10">
                  {categories.map((cat) => (
                    <div key={cat} className={`px-4 py-2 cursor-pointer hover:bg-gray-700 ${ selected === cat ? "bg-gray-700" : "" }`} onClick={() => {
                        setSelected(cat);
                        setOpen(false);
                      }} >
                      {cat}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="mt-6">
            <Suspense fallback={<div className="text-center text-gray-400">Loading posts...</div>}>
              {loading ? (
                <div className="text-center text-gray-400">Loading posts...</div>
              ) : posts && posts.length > 0 ? (
                posts.map((post, index) => (
                  <CommunityPost key={post.id} postId={post.id} author={post.author} postImage={post.postImage} likes={post.likes} commentsCount={post.comments.length} time={post.createdAt} index={index}>
                    {renderPostWithLinks(post.post)}
                  </CommunityPost>
                ))
              ) : (
                <div className="text-center text-gray-400">No posts found.</div>
              )}
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;



// upnext i want you to create a editProfile component, where user will be able to edit and add skill set, social handles, add a business/portfolio website, edit profile pic nd cover photo, edit username and bio. 