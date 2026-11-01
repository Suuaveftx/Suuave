'use client';

import React from 'react';

const SkillRequirement = ({ project }) => (
  <section className="mb-4 rounded-[18px] border border-[#ECECEC] bg-white p-5 shadow-[0_1px_8px_rgba(0,0,0,0.04)] lg:mt-4 lg:rounded-2xl lg:border-[#EAEAEA] lg:bg-[#FAFAFA] lg:px-8 lg:py-6 lg:shadow-none">
    <h2 className="mb-3 text-[15px] font-bold text-[#2E2E2E] lg:text-[22px]">
      Required skills
    </h2>
    {project.skillsRequired?.length ? (
      <ul className="flex flex-wrap gap-2">
        {project.skillsRequired.map((skill) => (
          <li
            key={skill}
            className="rounded-full bg-[#F0F0F0] px-3 py-2 text-sm text-[#444444]"
          >
            {skill}
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-sm text-[#767676]">No required skills were listed.</p>
    )}
  </section>
);

export default SkillRequirement;
