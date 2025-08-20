import JobCard from "../components/JobCard";
import { useEffect, useState } from "react";

const JobsListing = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      fetch("/Data/joblisting.json")
        .then((res) => res.json())
        .then((data) => {
          setJobs(data);
          setLoading(false);
        });
    }, 1000);
  }, []);

  return (
    <div className="text-white h-[100vh] overflow-y-scroll p-4 custom-scrollbar">
      {loading ? (
        <div className="text-center mt-20 text-lg">Loading jobs...</div>
      ) : (
        jobs.map((job) => <JobCard key={job.id} job={job} />)
      )}
    </div>
  );
};

export default JobsListing;
