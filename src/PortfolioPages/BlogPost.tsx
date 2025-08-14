import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

interface BlogPost {
    _id: string;
    title: string;
    content: string;
    category: string;
    readTime: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

const BlogPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const APP_BASE_URL = import.meta.env.VITE_APP_API_URL;

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${APP_BASE_URL}/api/blogs/${id}`);
                setPost(response.data);
            } catch (error: any) {
                console.error('Error fetching blog post:', error.message);
                setError('Failed to load blog post');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (loading) {
        return (
            <div className="bg-[var(--color-text-dark)] min-h-screen py-16 flex items-center justify-center">
                <div className="text-[var(--color-surface-light)] text-xl">Loading post...</div>
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="bg-[var(--color-text-dark)] min-h-screen py-16 flex items-center justify-center">
                <div className="text-[var(--color-brand-orange)] text-xl">{error || 'Post not found'}</div>
            </div>
        );
    }

    return (
        <div className="bg-[var(--color-text-dark)] min-h-screen py-16">
            <div className="container mx-auto px-4 py-10">
                <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto"
                >
                    <button
                        onClick={() => navigate('/resources/blogs')}
                        className="text-[var(--color-brand-orange)] cursor-pointer mb-8 hover:text-[var(--color-brand-orange)]/80 transition-colors flex items-center gap-2"
                    >
                        ← Back to Blogs
                    </button>

                    <div className="bg-gradient-to-br from-black/40 to-[var(--color-brand-orange)]/5 border border-[var(--color-brand-orange)]/20 rounded-xl p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-sm text-[var(--color-brand-orange)]">{post.category}</span>
                            <span className="text-sm text-[var(--color-surface-light)]/60">•</span>
                            <span className="text-sm text-[var(--color-surface-light)]/60">{post.readTime}</span>
                        </div>

                        <h1 className="text-4xl font-bold text-[var(--color-surface-light)] mb-6">
                            {post.title}
                        </h1>

                        <div className="mb-8">
                            <span className="text-sm text-[var(--color-surface-light)]/60">
                                Published on {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                        </div>

                        <div className="prose prose-invert max-w-none">
                            <div className="text-[var(--color-surface-light)]/90 leading-relaxed whitespace-pre-wrap">
                                {post.content}
                            </div>
                        </div>
                    </div>
                </motion.article>
            </div>
        </div>
    );
};

export default BlogPost;