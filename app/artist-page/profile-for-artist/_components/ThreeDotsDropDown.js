import { useState, useRef, useEffect } from "react";
import { MoreHorizontal } from "lucide-react";

const ThreeDotsDropdown = ({ onEdit, onDelete }) => {
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

  const handleEdit = () => {
    setIsOpen(false);
    if (onEdit) onEdit();
  };

  const handleDelete = () => {
    setIsOpen(false);
    if (onDelete) onDelete();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Three Dots Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black/50 hover:bg-black/70 p-1.5 rounded-md flex items-center justify-center cursor-pointer transition-colors"
      >
        <MoreHorizontal className="text-white w-5 h-5" />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white lg:bg-black/30 lg:backdrop-blur-[2px] border border-gray-200 lg:border-white/20 rounded-md shadow-lg z-10 overflow-hidden">
          <ul className="text-sm text-[#222222] lg:text-white">
            <li
              className="px-4 py-2 hover:bg-gray-100 lg:hover:bg-white/20 cursor-pointer transition-colors"
              onClick={handleEdit}
            >
              Edit
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 lg:hover:bg-white/20 cursor-pointer transition-colors"
              onClick={handleDelete}
            >
              Delete
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ThreeDotsDropdown;
