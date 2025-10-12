import Link from "next/link";
import { useState } from "react";
import { PlusIcon } from "lucide-react"; 

const FloatingButton = () => {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    if (!expanded) {
      setExpanded(true); // first click expands
    } else {
      window.location.href = "/fashion-designers/post-project"; // second click goes to page
    }
  };

  return (
   <button
  onClick={handleClick}
  className={`fixed bottom-6 right-6 z-50 flex items-center bg-radial from-[#F4FCFF] to-[#CCE7F2] text-[#035A7A] rounded-full shadow-lg lg:hidden 
    ${expanded ? "gap-2 px-8 py-4" : "gap-0 px-4 py-4"}`}
>
  {expanded && (
    <span className="whitespace-nowrap text-xl font-bold">
      Post Project
    </span>
  )}
  <PlusIcon className="w-7 h-7 rounded-full" />
</button>
  );
};

export default FloatingButton;
