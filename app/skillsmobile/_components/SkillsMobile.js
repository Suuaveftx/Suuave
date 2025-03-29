import React from 'react';

const SkillsFormMobile = () => {
  return (
    <div className="sm:hidden bg-white p-4 rounded shadow-md w-full">
      {/* Header: Let's know your major skills */}
      <h2 className="text-lg font-semibold mb-2">Let&apos;s know your major skills</h2>
      <p className="text-sm text-gray-600 mb-4">
        Fill in your most comfortable skills.
      </p>
      <input
        type="text"
        placeholder="Eg 3D Illustrator"
        className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />

      {/* Header: Tell us about Yourself */}
      <h2 className="text-lg font-semibold mt-6 mb-2">Tell us about Yourself</h2>
      <p className="text-sm text-gray-600 mb-4">
        Describe yourself to attract potential clients.
      </p>
      <textarea
        placeholder="Write about yourself..."
        rows={4}
        className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
      ></textarea>

      {/* Header: What language are you most comfortable with? */}
      <h2 className="text-lg font-semibold mt-6 mb-2">
        What language are you most comfortable with?
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        This will help us match you with the right clients.
      </p>
      <select
        className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">Select a language</option>
        <option value="english">English</option>
        <option value="spanish">Spanish</option>
        <option value="french">French</option>
        <option value="german">German</option>
        <option value="mandarin">Mandarin</option>
      </select>

      {/* Next Button */}
      <button
        type="button"
        className="w-full mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Next
      </button>
    </div>
  );
};

export default SkillsFormMobile;
