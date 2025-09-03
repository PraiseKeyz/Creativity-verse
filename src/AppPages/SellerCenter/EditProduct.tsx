import React, { useEffect, useState } from "react";

type UploadType = "file" | "link";

type MockProduct = {
  id: number;
  title: string;
  description: string;
  price: number; // stored as number but we’ll show as string in input
  category: "ebook" | "course" | "template" | "plugin" | "other";
  tags: string[];
  uploadType: UploadType;
  fileName?: string;        // if uploadType === "file"
  productLink?: string;     // if uploadType === "link"
  previewImageName?: string;
  createdAt: string;
  updatedAt?: string;
};

// ------- Mock fetched product -------
const fetchedProduct: MockProduct = {
  id: 42,
  title: "UI Design Masterclass",
  description:
    "A comprehensive course on modern UI design principles and tools. Learn grids, spacing, color, type, and more.",
  price: 49.99,
  category: "course",
  tags: ["UI", "Design", "Figma", "React"],
  uploadType: "link",
  productLink: "https://example.com/ui-design-masterclass",
  previewImageName: "ui-masterclass-cover.png",
  createdAt: "2025-07-15T10:00:00Z",
  updatedAt: "2025-08-20T12:25:00Z",
};

const EditProduct: React.FC = () => {
  // form state (mirrors CreateProduct)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(""); // keep as string for input
  const [category, setCategory] = useState<MockProduct["category"]>("ebook");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const [uploadType, setUploadType] = useState<UploadType>("file");
  const [file, setFile] = useState<File | null>(null);
  const [existingFileName, setExistingFileName] = useState<string | undefined>(undefined);

  const [productLink, setProductLink] = useState("");
  const [existingLink, setExistingLink] = useState<string | undefined>(undefined);

  const [previewImage, setPreviewImage] = useState<File | null>(null);
  const [existingPreviewName, setExistingPreviewName] = useState<string | undefined>(undefined);

  // load “fetched” product
  useEffect(() => {
    const p = fetchedProduct;
    setTitle(p.title);
    setDescription(p.description);
    setPrice(String(p.price));
    setCategory(p.category);
    setTags(p.tags);
    setUploadType(p.uploadType);
    setExistingFileName(p.fileName);
    setExistingLink(p.productLink);
    setExistingPreviewName(p.previewImageName);
  }, []);

  // tag handlers
  const handleAddTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) {
      setTags((prev) => [...prev, t]);
      setTagInput("");
    }
  };
  const handleRemoveTag = (tag: string) => {
    setTags((prev) => prev.filter((x) => x !== tag));
  };

  // upload/link handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setExistingFileName(undefined); // replacing existing file
      setProductLink(""); // clear link if switching intent
    }
  };
  const handlePreviewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPreviewImage(e.target.files[0]);
      setExistingPreviewName(undefined);
    }
  };

  const switchUploadType = (type: UploadType) => {
    setUploadType(type);
    if (type === "file") {
      // keep existing file if exists; clear link input to avoid confusion
      setProductLink("");
    } else {
      // keep existing link if exists; clear file input
      setFile(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // minimal validation similar to CreateProduct
    if (!title.trim() || !description.trim() || !price.trim()) {
      alert("Please fill in the required fields.");
      return;
    }

    if (uploadType === "file" && !file && !existingFileName) {
      alert("Please upload a file or keep the existing one.");
      return;
    }
    if (uploadType === "link" && !productLink.trim() && !existingLink) {
      alert("Please provide a valid product link or keep the existing one.");
      return;
    }

    const updatedProduct = {
      id: fetchedProduct.id,
      title: title.trim(),
      description: description.trim(),
      price: parseFloat(price),
      category,
      tags,
      uploadType,
      file: uploadType === "file" ? (file ? file.name : existingFileName ?? null) : null,
      productLink: uploadType === "link" ? (productLink || existingLink || null) : null,
      previewImage: previewImage ? previewImage.name : existingPreviewName ?? null,
      createdAt: fetchedProduct.createdAt,
      updatedAt: new Date().toISOString(),
    };

    console.log("Product Updated:", updatedProduct);
    alert("Product updated successfully ✅");
  };

  return (
    <main className="min-h-screen bg-[#181818] text-white p-6 font-sans">
      <div className="max-w-3xl mx-auto flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Edit Product</h1>
        {fetchedProduct.updatedAt && (
          <span className="text-xs text-gray-400">
            Last updated: {new Date(fetchedProduct.updatedAt).toLocaleString()}
          </span>
        )}
      </div>

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
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-[#1a1a1a] border border-gray-600 focus:border-[var(--color-brand-orange)] outline-none"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as MockProduct["category"])}
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

        {/* Delivery Method */}
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
              onClick={() => switchUploadType("file")}
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
              onClick={() => switchUploadType("link")}
            >
              Provide Link
            </button>
          </div>

          {uploadType === "file" ? (
            <div className="space-y-2">
              {existingFileName && !file && (
                <p className="text-xs text-gray-300">
                  Current file: <span className="text-green-400">{existingFileName}</span>
                </p>
              )}
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full text-sm text-gray-400"
              />
              {file && <p className="text-xs text-green-400 mt-1">✔ {file.name} selected</p>}
            </div>
          ) : (
            <div className="space-y-2">
              {existingLink && !productLink && (
                <p className="text-xs text-gray-300">
                  Current link:{" "}
                  <span className="text-green-400 break-all">{existingLink}</span>
                </p>
              )}
              <input
                type="url"
                value={productLink}
                onChange={(e) => setProductLink(e.target.value)}
                placeholder="https://yourproductlink.com"
                className="w-full px-4 py-2 rounded-md bg-[#1a1a1a] border border-gray-600 focus:border-[var(--color-brand-orange)] outline-none"
              />
            </div>
          )}
        </div>

        {/* Preview Image */}
        <div>
          <label className="block text-sm mb-2">Preview Image (Optional)</label>
          {existingPreviewName && !previewImage && (
            <p className="text-xs text-gray-300 mb-2">
              Current preview: <span className="text-green-400">{existingPreviewName}</span>
            </p>
          )}
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

        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-[var(--color-brand-orange)] text-black font-semibold hover:opacity-90 active:scale-95 transition"
        >
          Save Changes
        </button>
      </form>
    </main>
  );
};

export default EditProduct;
