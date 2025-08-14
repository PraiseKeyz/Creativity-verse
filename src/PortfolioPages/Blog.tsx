import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
// import create from '../assets/create.jpg'
// import tech from '../assets/tech.jpg'
import axios from 'axios';


interface BlogPost {
    _id: string;
    title: string;
    content: string;
    category: string;
    image: string;
    readTime: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}



const Blog = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleReadMore = (postId: string) => {
        navigate(`/resources/blogs/${postId}`);
    };


    const APP_BASE_URL = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    const fetchPosts = async () => { 
      try {
        setLoading(true);
        const response = await axios.get(`${APP_BASE_URL}/api/blogs`);
        setPosts(response.data); 
      } catch (error: any) { 
        console.error('Error fetching blog posts:', error.message);
        setError('Failed to load blog posts');

        if (error.response) { 
          console.error('Error response data:', error.response.data);  
          console.error('Error response status:', error.response.status); 
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts(); 
  }, []);

    return (
        <div className="bg-[var(--color-text-dark)] min-h-screen py-16">
            <div className="container mx-auto px-4">
                {/* Blog Header */}
                <div className="max-w-4xl mx-auto py-20 min-h-[30vh] ">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[var(--color-surface-light)] to-[var(--color-brand-orange)] bg-clip-text text-transparent mb-6">
                        Stories, Insights & Creative Wisdom
                    </h1>
                    <p className="text-xl text-[var(--color-surface-light)]/80">
                        Dive into our collection of thought-provoking articles, practical guides, and creative inspiration.
                    </p>
                </div>

                {/* Blog Grid (conditionally rendered) */}
                {loading ? (
                    <div className="bg-[var(--color-text-dark)] py-16 flex items-center justify-center">
                        <div className="text-[var(--color-surface-light)] text-xl">Loading posts...</div>
                    </div>
                ) : error ? (
                    <div className="bg-[var(--color-text-dark)] py-16 flex items-center justify-center">
                        <div className="text-[var(--color-brand-orange)] text-xl">{error}</div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts && posts.map(post => (
                            <motion.article
                                key={post._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-gradient-to-br from-black/40 to-[var(--color-brand-orange)]/5 border border-[var(--color-brand-orange)]/20 rounded-xl overflow-hidden"
                            >
                                <div className="aspect-video relative">
                                    <img 
                                        src={`data:image/jpeg;base64,${post.image}`} 
                                        alt={post.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-sm text-[var(--color-brand-orange)]">{post.category}</span>
                                        <span className="text-sm text-[var(--color-surface-light)]/60">•</span>
                                        <span className="text-sm text-[var(--color-surface-light)]/60">{post.readTime}</span>
                                    </div>
                                    <h2 className="text-2xl font-semibold text-[var(--color-surface-light)] mb-3">
                                        {post.title}
                                    </h2>
                                    <p className="text-[var(--color-surface-light)]/70 mb-4">
                                        {post.content.slice(0, 100)}...
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-[var(--color-surface-light)]/60">{new Date(post.createdAt).toLocaleDateString()}</span>
                                        <button onClick={() => handleReadMore(post._id)} className="text-[var(--color-brand-orange)] cursor-pointer hover:text-[var(--color-brand-orange)]/80 transition-colors">
                                            Read More →
                                        </button>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blog;