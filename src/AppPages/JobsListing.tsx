import JobCard from "../components/AppComponent/JobCard";
import { useEffect, useState } from "react";
import LoadingSpin from "../components/PortfolioComponent/LoadingSpin";

type Job = {
  id: string;
  title: string;
  description: string;
  company: string;
  employmentType: 'freelance' | 'remote' | 'full-time' | 'part-time' | 'contract';
  skillsRequired: string[];
  skillLevel: 'entry' | 'intermediate' | 'expert';
  applicationMethod: 'internal' | 'external';
  applicationLink?: string;
  postedBy: string;
  createdAt: string;
};

const JobsListing = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      fetch("/Data/joblisting.json")
        .then((res) => res.json())
        .then((data) => {
          setJobs(data.filter((job : Job) => job.applicationMethod === "external"));
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
        jobs.map((job, index) => <JobCard key={job.id} job={job} index={index} />)
      )}
    </div>
  );
}
export default JobsListing;
