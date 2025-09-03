import React, { useState } from "react";

const CreateProduct: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("ebook");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [uploadType, setUploadType] = useState<"file" | "link">("file");
  const [file, setFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<File | null>(null);
  const [productLink, setProductLink] = useState("");

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput)) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handlePreviewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPreviewImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = {
      title,
      description,
      price,
      category,
      tags,
      uploadType,
      file: uploadType === "file" && file ? file.name : null,
      productLink: uploadType === "link" ? productLink : null,
      previewImage: previewImage ? previewImage.name : null,
      createdAt: new Date().toISOString(),
    };
    console.log("Product Created:", newProduct);
    alert("Product Created Successfully ✅");
  };

  return (
    <main className="min-h-screen bg-[#181818] text-white p-6 font-sans">
      <h1 className="text-2xl font-bold mb-6">Create Product</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-[#232323] p-6 rounded-xl border border-gray-700 shadow-lg max-w-3xl mx-auto"
      >
        {/* Title */}
        <div>
          <label className="block text-sm mb-2">Product Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. UI Design Masterclass"
            className="w-full px-4 py-2 rounded-md bg-[#1a1a1a] border border-gray-600 focus:border-[var(--color-brand-orange)] outline-none"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write a detailed description of your product..."
            rows={4}
            className="w-full px-4 py-2 rounded-md bg-[#1a1a1a] border border-gray-600 focus:border-[var(--color-brand-orange)] outline-none"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm mb-2">Price (USD)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="e.g. 29.99"
            className="w-full px-4 py-2 rounded-md bg-[#1a1a1a] border border-gray-600 focus:border-[var(--color-brand-orange)] outline-none"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-[#1a1a1a] border border-gray-600 focus:border-[var(--color-brand-orange)] outline-none"
          >
            <option value="ebook">Ebook</option>
            <option value="course">Course</option>
            <option value="template">Template</option>
            <option value="plugin">Plugin</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm mb-2">Tags</label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="e.g. React"
              className="flex-1 px-4 py-2 rounded-md bg-[#1a1a1a] border border-gray-600 focus:border-[var(--color-brand-orange)] outline-none"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-4 py-2 bg-[var(--color-brand-orange)] text-black rounded-md font-semibold hover:opacity-90"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-[var(--color-brand-orange)]/20 text-[var(--color-brand-orange)] rounded-full text-xs flex items-center gap-2"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="text-red-400 text-xs"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Upload or Link */}
        <div>
          <label className="block text-sm mb-2">Delivery Method</label>
          <div className="flex gap-4 mb-4">
            <button
              type="button"
              className={`px-4 py-2 rounded-md ${
                uploadType === "file"
                  ? "bg-[var(--color-brand-orange)] text-black font-semibold"
                  : "bg-[#1a1a1a] border border-gray-600"
              }`}
              onClick={() => setUploadType("file")}
            >
              Upload File
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-md ${
                uploadType === "link"
                  ? "bg-[var(--color-brand-orange)] text-black font-semibold"
                  : "bg-[#1a1a1a] border border-gray-600"
              }`}
              onClick={() => setUploadType("link")}
            >
              Provide Link
            </button>
          </div>

          {uploadType === "file" ? (
            <div>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full text-sm text-gray-400"
                required
              />
              {file && (
                <p className="text-xs text-green-400 mt-1">✔ {file.name} selected</p>
              )}
            </div>
          ) : (
            <div>
              <input
                type="url"
                value={productLink}
                onChange={(e) => setProductLink(e.target.value)}
                placeholder="https://yourproductlink.com"
                className="w-full px-4 py-2 rounded-md bg-[#1a1a1a] border border-gray-600 focus:border-[var(--color-brand-orange)] outline-none"
                required
              />
            </div>
          )}
        </div>

        {/* Preview Image */}
        <div>
          <label className="block text-sm mb-2">Preview Image (Optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePreviewChange}
            className="w-full text-sm text-gray-400"
          />
          {previewImage && (
            <p className="text-xs text-green-400 mt-1">✔ {previewImage.name} selected</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-[var(--color-brand-orange)] text-black font-semibold hover:opacity-90 active:scale-95 transition"
        >
          Create Product
        </button>
      </form>
    </main>
  );
};

export default CreateProduct;
