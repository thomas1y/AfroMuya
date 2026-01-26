'use client';

import { FaBriefcase, FaMapMarkerAlt, FaMoneyBillWave, FaClock } from 'react-icons/fa';

const JobSummaryCard = ({ job }) => {
  if (!job) return null;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{job.title}</h2>
          <p className="text-lg text-gray-700 mt-1">{job.company}</p>
          
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center text-gray-600">
              <FaBriefcase className="mr-2 text-primary" />
              <span>{job.type}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FaMapMarkerAlt className="mr-2 text-primary" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FaMoneyBillWave className="mr-2 text-primary" />
              <span>{job.salary}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FaClock className="mr-2 text-primary" />
              <span>Posted {job.postedDate}</span>
            </div>
          </div>
        </div>
        
        <div className="hidden md:block">
          <div className="text-right">
            <div className="text-sm text-gray-500">Application closes</div>
            <div className="font-semibold text-primary">{job.applicationDeadline}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSummaryCard;