import JobCard from "../components/JobCard"

const JobsListing = () => {

  //assumed job schema
  const job = {
  id: "job_01",
  title: "Product Designer",
  company: "Ifeolu Ltd",
  logoColor: "#00C853",
  postedAt: "3 days ago",
  description:
    "We're looking for a Product Designer to lead intuitive, user-centered design solutions. Collaborate with cross-functional teams to deliver world-class UI/UX.",
  tags: ["Remote", "Full-time"],
  salary: "$120",
  benefits: ["Remote Work", "Health Insurance"],
  isRemote: true,
  type: "Full-time",
  saved: false,
};

  return (
    <div className="text-white h-[100vh] overflow-y-scroll p-4 custom-scrollbar">
      <JobCard job={job} />
      <JobCard job={job} />
      <JobCard job={job} />
      <JobCard job={job} />
      <JobCard job={job} />
      <JobCard job={job} />
    </div>
  )
}

export default JobsListing
