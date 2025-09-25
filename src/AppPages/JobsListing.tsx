import { useEffect, useState } from "react";
import LoadingSpin from "../components/PortfolioComponent/LoadingSpin";
import { RssFeed, fetchRssFeed } from "../services/rss";


const JobsListing = () => {
  const [jobs, setJobs] = useState<RssFeed[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
    const URL = `${API_BASE}/api/v1/jobs/rssfeed`;

    fetchRssFeed(URL)
      .then((items) => {
        // Dedupe by guid, then link as fallback
        const seen = new Set<string>();
        const unique = items.filter((it) => {
          const key = (it.guid || it.link || '').trim();
          if (!key) return true;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });
        setJobs(unique);
      })
      .catch((e) => {
        setError(e?.message || "Failed to load RSS feed");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-white p-4">
        <div className="text-center mt-20 text-lg">Loading jobs...</div>
        <LoadingSpin />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-white p-4">
        <div className="text-center mt-20 text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="text-white h-[100vh] overflow-y-scroll p-4 custom-scrollbar">
      {/* Pagination header */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-white/70">
          Showing {(page - 1) * pageSize + 1}-{Math.min(page * pageSize, jobs.length)} of {jobs.length}
        </div>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 rounded border border-white/20 disabled:opacity-40"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Prev
          </button>
          <button
            className="px-3 py-1 rounded border border-white/20 disabled:opacity-40"
            disabled={page * pageSize >= jobs.length}
            onClick={() => setPage((p) => (p * pageSize >= jobs.length ? p : p + 1))}
          >
            Next
          </button>
        </div>
      </div>

      {jobs.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize).map((job, idx) => (
        <article
          key={`${job.guid || job.link || 'job'}-${(page - 1) * pageSize + idx}`}
          className="mb-6 border border-white/10 rounded-lg p-4"
        >
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
            {/* Image column */}
            {job.imageUrl && (
              <div className="w-full sm:basis-1/2">
                <img
                  src={job.imageUrl}
                  alt={job.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                  className="w-full h-56 md:h-64 object-cover rounded-md"
                />
              </div>
            )}

            {/* Text column */}
            <div className="sm:basis-1/2 min-w-0">
              <a href={job.link} target="_blank" rel="noreferrer">
                <h3 className="text-lg font-semibold hover:underline line-clamp-2">
                  {job.title}
                </h3>
              </a>
              <div className="text-sm text-white/70 flex flex-wrap gap-x-3 gap-y-1 mt-1">
                {job.location && <span>{job.location}</span>}
                {job.workType && <span>• {job.workType}</span>}
                {job.pubDate && <span>• {new Date(job.pubDate).toLocaleString()}</span>}
              </div>
              {job.description && (
                <p
                  className="text-white/80 mt-2 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: job.description }}
                />
              )}

              <div className="mt-3">
                <a
                  href={job.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block px-4 py-2 rounded bg-[var(--color-brand-orange)] hover:bg-[var(--color-brand-orange)]/90 text-white"
                >
                  Apply
                </a>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
export default JobsListing;
