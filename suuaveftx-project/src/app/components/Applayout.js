// components/AppLayout.jsx
'use client';
import React from 'react';
import Navbar from './Navbar'; // Adjust the import path based on your file structure

const AppLayout = ({ children }) => { // Accept children as a prop
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Content Section */}
      <main className="flex-grow p-6">
        {children} {/* Render children here */}
      </main>
    </div>
  );
};

export default AppLayout;
