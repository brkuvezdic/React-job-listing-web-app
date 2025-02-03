import JobListing from "./JobListing";
import { useState, useEffect } from "react";
import Spinner from "./Spinner";
const JobListings = ({ isHome }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:7000/jobs");
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);
  return (
    <div>
      <section className="bg-blue-50 px-4 py-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
            Browse Jobs
          </h2>
          {loading ? (
            <h2>
              <Spinner loading={loading} />
            </h2>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-bold">
              {jobs.map((job) => (
                <JobListing key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default JobListings;
