import React from "react";
import Navbar2 from "./Navbar2";

const AppLayout2 = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar2 />

      {/* Main Content */}
      <main className="flex-grow">{children}</main>
    </div>
  );
};

export default AppLayout2;
