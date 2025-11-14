import React from 'react'
import { FaArrowUp, FaLocationDot, FaSuitcase } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const Card = ({ title, slug, desc, type, location }) => {
  return (
    <div className="p-5 rounded-xl min-h-44 max-w-xl min-w-72 
      shadow-lg border border-yellow-500/40 bg-blue-50/70 
      backdrop-blur-sm transition hover:shadow-xl">

      <div className="w-full flex justify-between items-start gap-2">
        <div className="font-bold text-xl text-blue-900">
          {title}
        </div>

        <Link 
          to={`/job/${slug}`} 
          className="text-blue-900 text-sm font-semibold px-4 py-2 
          bg-yellow-400 hover:bg-yellow-500 rounded-full flex items-center 
          transition-all shadow-sm"
        >
          Apply Now 
          <FaArrowUp size={12} className="mx-2 rotate-45"/>
        </Link>
      </div>

      <p className="text-left mt-2 text-gray-700 leading-relaxed">
        {desc}
      </p>

      <div className="flex gap-3 flex-wrap">
        <div className="p-1 px-3 mt-3 rounded-full 
          bg-yellow-200/70 text-blue-900 
          flex items-center justify-center gap-2 border border-yellow-400/50">
          <FaLocationDot className="text-yellow-700"/>  
          {location}
        </div> 

        <div className="p-1 px-3 mt-3 rounded-full 
          bg-yellow-200/70 text-blue-900 
          flex items-center justify-center gap-2 border border-yellow-400/50">
          <FaSuitcase className="text-yellow-700"/>  
          {type}
        </div>
      </div>
    </div>
  )
}

export default Card
