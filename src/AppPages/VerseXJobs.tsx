import JobCard from "../components/AppComponent/JobCard";
import { useEffect } from "react";
import LoadingSpin from "../components/PortfolioComponent/LoadingSpin";
import useJobStore from "../store/job.store";

const VerseXJobs = () => {
  const { jobs, isLoading, error, getJobs } = useJobStore();

  useEffect(() => {
    getJobs().catch(() => {
      // error is stored in the store; swallow here to avoid unhandled rejection
    });
  }, [getJobs]);

  // Show all jobs returned from the API
  const allJobs = jobs;

  return (
    <div className="text-white h-[100vh] overflow-y-scroll p-4 custom-scrollbar">
      {isLoading ? (
        <div>
          <div className="text-center mt-20 text-lg">Loading jobs...</div>
          <LoadingSpin />
        </div>
      ) : error ? (
        <div className="text-center mt-20 text-lg">{error}</div>
      ) : (
        allJobs.map((job, index) => (
          <JobCard key={job.id || job._id} job={job as any} index={index} />
        ))
      )}
    </div>
  );
};

export default VerseXJobs;

// This file is part of the Verse X Jobs page, which lists jobs that are internal to the Verse community. Currently, it fetches job data from a local JSON file and displays each job using the JobCard component. The jobs are filtered to only include those with an internal application method. Later on it'll be updated to fetch directly from the server, then we can remove the filter method.
