import JobCard from "../components/AppComponent/JobCard";
import { useEffect, useState } from "react";
import LoadingSpin from "../components/PortfolioComponent/LoadingSpin";

const VerseXJobs = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      fetch("/Data/joblisting.json")
        .then((res) => res.json())
        .then((data) => {
          setJobs(data.filter((job) => job.applicationMethod === "internal"));
          setLoading(false);
        });
    }, 1000);
  }, []);

  return (
    <div className="text-white h-[100vh] overflow-y-scroll p-4 custom-scrollbar">
      {loading ? (
        <div>
          <div className="text-center mt-20 text-lg">Loading jobs...</div>
          <LoadingSpin />
        </div>
      ) : (
        jobs.map((job) => <JobCard key={job.id} job={job} />)
      )}
    </div>
  );
}

export default VerseXJobs


// This file is part of the Verse X Jobs page, which lists jobs that are internal to the Verse community. Currently, it fetches job data from a local JSON file and displays each job using the JobCard component. The jobs are filtered to only include those with an internal application method. Later on it'll be updated to fetch directly from the server, then we can remove the filter method.