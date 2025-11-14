import React, { useEffect, useRef, useState } from 'react'
import { jobs } from '../Careers'
import Card from './Card'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Careers = () => {
  const [jobName, setJobName] = useState("")
  const [filteredJobs, setFilteredJobs] = useState(jobs)
  const debounceRef = useRef(null)

  const handleChange = (e) => {
    const val = e.target.value
    setJobName(val)

    if (debounceRef.current) clearTimeout(debounceRef.current)

    debounceRef.current = setTimeout(() => {
      if (val.trim() === "") {
        setFilteredJobs(jobs)
      } else {
        const filtered = jobs.filter((job) =>
          job.title.toLowerCase().includes(val.toLowerCase())
        )
        setFilteredJobs(filtered)
      }
    }, 500)
  }

  return (
    <div className="flex flex-col items-center px-10 py-20 bg-neutral-50">
   <div className="fixed w-full p-5 z-50 backdrop-blur-md top-0 left-0 flex justify-center items-center">
    <div className="flex gap-3 rounded-full justify-between w-fit px-3 py-2 bg-gray-200/30 border">
      <Link to={'/'}>Home</Link>
      <Link>Careers</Link>
    </div>
   </div>
      <h1 className="text-4xl font-semibold tracking-wide mb-4">
        Work With Us
      </h1>

      <p className="text-neutral-600 text-lg mb-10 text-center max-w-xl">
        Discover opportunities to join our team and contribute to innovative projects shaping the future.
      </p>

      <div className="w-full max-w-md flex justify-center mb-12">
        <div className="flex items-center p-1 border border-yellow-300 bg-white rounded-full shadow-sm w-full">
          <div className="relative w-full">
            <input
              value={jobName}
              onChange={handleChange}
              placeholder="Search jobs"
              type="text"
              className="w-full bg-neutral-100 h-10 rounded-full pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-neutral-500 scale-90" />
          </div>
        </div>
      </div>

      <div className="w-full max-w-2xl text-left text-xl font-medium mb-6">
        <span className="font-bold">{filteredJobs.length}</span> Job Openings
      </div>

      <div className="flex flex-col w-full items-center gap-4 max-w-2xl">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <Card
              key={job.id}
              title={job.title}
              location={job.location}
              type={job.type}
              slug={job.slug}
              desc={job.description}
            />
          ))
        ) : (
          <p className="text-neutral-500 text-lg">No jobs found</p>
        )}
      </div>

    </div>
  )
}

export default Careers
