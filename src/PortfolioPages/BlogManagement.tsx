import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import React from 'react';

const BlogManagement = () => {
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        content: '',
        readTime: '',
        thumbnail: null as File | null,
        contentImages: [] as File[],
    });

    const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

    const [imagePreview, setImagePreview] = useState<string>('');
    const [contentImagePreviews, setContentImagePreviews] = useState<string[]>([]);

    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData(prev => ({ ...prev, thumbnail: file }));
            const reader = new FileReader();
            reader.onloadend = () => {
                const previewUrl = reader.result as string;
                setImagePreview(previewUrl);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleContentImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setFormData(prev => ({ ...prev, contentImages: [...prev.contentImages, ...files] }));

        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const previewUrl = reader.result as string;
                setContentImagePreviews(prev => [...prev, previewUrl]);
            };
            reader.readAsDataURL(file);
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('category', formData.category);
        formDataToSend.append('readTime', formData.readTime);
        formDataToSend.append('content', formData.content);

        if (formData.thumbnail) {
            formDataToSend.append('thumbnail', formData.thumbnail);
        }

        formData.contentImages.forEach((image) => {
            formDataToSend.append('contentImages', image);
        });

        try {
            const response = await axios.post(`${API_BASE_URL}/api/blogs`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Post created:', response.data);

            setFormData({
                title: '',
                category: '',
                content: '',
                readTime: '',
                thumbnail: null,
                contentImages: []
            });
            setImagePreview('');
            setContentImagePreviews([]);
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <div className="bg-[var(--color-text-dark)] min-h-screen py-16">
            <div className="container mx-auto px-4 py-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto"
                >
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-[var(--color-surface-light)] to-[var(--color-brand-orange)] bg-clip-text text-transparent mb-8">
                        Create New Blog Post
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="bg-gradient-to-br from-black/40 to-[var(--color-brand-orange)]/5 border border-[var(--color-brand-orange)]/20 rounded-xl p-6">
                            <div className="mb-6">
                                <label className="block text-[var(--color-surface-light)] mb-2">Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                    className="w-full px-4 py-3 bg-[var(--color-text-dark)]/60 border border-[var(--color-brand-orange)]/20 rounded-lg text-[var(--color-surface-light)] focus:border-[var(--color-brand-orange)] focus:outline-none"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-[var(--color-surface-light)] mb-2">Category</label>
                                <input
                                    type="text"
                                    value={formData.category}
                                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                                    className="w-full px-4 py-3 bg-[var(--color-text-dark)]/60 border border-[var(--color-brand-orange)]/20 rounded-lg text-[var(--color-surface-light)] focus:border-[var(--color-brand-orange)] focus:outline-none"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-[var(--color-surface-light)] mb-2">Read Time</label>
                                <input
                                    type="text"
                                    value={formData.readTime}
                                    onChange={(e) => setFormData(prev => ({ ...prev, readTime: e.target.value }))}
                                    className="w-full px-4 py-3 bg-[var(--color-text-dark)]/60 border border-[var(--color-brand-orange)]/20 rounded-lg text-[var(--color-surface-light)] focus:border-[var(--color-brand-orange)] focus:outline-none"
                                    placeholder="e.g., 5 minutes"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-[var(--color-surface-light)] mb-2">Content</label>
                                <textarea
                                    value={formData.content}
                                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                                    className="w-full px-4 py-3 bg-[var(--color-text-dark)]/60 border border-[var(--color-brand-orange)]/20 rounded-lg text-[var(--color-surface-light)] focus:border-[var(--color-brand-orange)] focus:outline-none resize-none h-24"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-[var(--color-surface-light)] mb-2">Thumbnail Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleThumbnailChange}
                                    className="w-full px-4 py-3 bg-[var(--color-text-dark)]/60 border border-[var(--color-brand-orange)]/20 rounded-lg text-[var(--color-surface-light)] focus:border-[var(--color-brand-orange)] focus:outline-none"
                                    required
                                />
                                {imagePreview && (
                                    <div className="mt-4 relative aspect-video">
                                        <img
                                            src={imagePreview}
                                            alt="Thumbnail Preview"
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="mb-6">
                                <label className="block text-[var(--color-surface-light)] mb-2">Content Images</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleContentImagesChange}
                                    className="w-full px-4 py-3 bg-[var(--color-text-dark)]/60 border border-[var(--color-brand-orange)]/20 rounded-lg text-[var(--color-surface-light)] focus:border-[var(--color-brand-orange)] focus:outline-none"
                                />
                                <div className="mt-4 grid grid-cols-2 gap-4">
                                    {contentImagePreviews.map((preview, index) => (
                                        <div key={index} className="relative aspect-video">
                                            <img
                                                src={preview}
                                                alt={`Content Image ${index + 1}`}
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full px-8 py-4 bg-[var(--color-brand-orange)] text-[var(--color-text-dark)] rounded-lg font-semibold hover:bg-[var(--color-brand-orange)]/90 transition-colors"
                            >
                                Publish Post
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default BlogManagement;