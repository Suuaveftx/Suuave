"use client";
import React, { useState } from 'react';
import { Search, MoreVertical } from 'lucide-react';
const ProjectCard = ({ title, date, proposals, replies, hired, status }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-4 mb-4 rounded-lg shadow-sm w-full relative">
      <div className="flex flex-col gap-1">
        <h3 className="font-medium text-lg text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">Posted : {date}</p>
        <p className="text-sm">
          Status : <span className="text-green-600 font-medium">{status}</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-auto mt-4 md:mt-0">
        <div className="flex gap-2">
          <span className="rounded-full bg-gray-100 text-gray-700 px-3 py-1 text-sm">
            {proposals} Proposals
          </span>
          <span className="rounded-full bg-gray-100 text-gray-700 px-3 py-1 text-sm">
            {replies} Replies
          </span>
          <span className="rounded-full bg-gray-100 text-gray-700 px-3 py-1 text-sm">
            {hired} Hired
          </span>
        </div>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="p-2 rounded-full hover:bg-gray-200 transition"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded shadow-md z-10">
              <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Edit</button>
              <button className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100">Delete</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProjectPage = () => {
  const [search, setSearch] = useState('');
  const projects = new Array(5).fill({
    title: 'Modern Fashion Attire Illustration',
    date: '23-06-2024',
    proposals: 3,
    replies: 0,
    hired: 0,
    status: 'Active',
  });

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">My Projects</h1>

      <div className="relative w-full max-w-md mb-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      </div>

      {projects.map((project, index) => (
        <ProjectCard key={index} {...project} />
      ))}

      <div className="flex justify-between items-center mt-6 text-sm text-gray-500">
        <span>1 - 5 of 12</span>
        <div className="flex gap-2">
          <button className="border px-3 py-1 rounded hover:bg-gray-200">&lt;</button>
          <button className="border px-3 py-1 rounded hover:bg-gray-200">&gt;</button>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
