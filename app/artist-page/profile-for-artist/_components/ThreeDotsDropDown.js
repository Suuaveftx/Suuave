import { useState, useRef, useEffect } from "react";
import { MoreHorizontal } from "lucide-react";

const ThreeDotsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Function to close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Three Dots Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-3 right-3 bg-black bg-opacity-50 p-2 rounded-md w-10 flex justify-center cursor-pointer"
      >
        <MoreHorizontal size={18} className="text-white" />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-lg z-10">
          <ul className="text-sm text-gray-800">
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              Edit
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              Delete
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              Share
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ThreeDotsDropdown;
