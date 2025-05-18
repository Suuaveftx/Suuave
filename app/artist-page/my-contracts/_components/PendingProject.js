import { useState } from "react";
import Link from "next/link";
import { AlertTriangle, MoreVertical } from "lucide-react";
import CustomButton from "../../../../components/CustomButton";
import SearchBar from "../../../../components/Searchbar";

const PendingProjects = () => {
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const pendingProjects = [
    {
      title: "Modern Fashion Attire Illustration",
      id: "24t64754",
      pendingSince: "18. June 2024",
      expiresIn: "-2 days",
      link: "/artist-page/contract-details",
    },
    {
      title: "Modern Fashion Attire Illustration",
      id: "24t64754",
      pendingSince: "18. June 2024",
      expiresIn: "-2 day",
    },
  ];

  return (
    <div className="w-auto ml-4 mr-4 mx-auto p-8 bg-white shadow-md rounded-lg">
      {/* Warning Message */}
      <div className="flex items-start space-x-3 p-3 rounded-lg">
        <AlertTriangle className="text-[#FF8024] w-6 h-6 mt-1" />
        <p className="text-sm text-[#FF8024]">
          These contracts are yet to be accepted. <br /> Artists have 2 days to accept the offer, else the contract will be canceled automatically.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mt-4 flex items-center w-2/4 mr-8">
        <SearchBar placeholder="Search by job title" />
      </div>

      {/* Pending Projects List */}
      <div className="mt-8 space-y-4">
        {pendingProjects.map((project, index) => (
          <div key={index} className="flex items-center justify-between p-3 border rounded-md shadow-sm">
            {/* Project Info */}
            <div>
              {project.link ? (
                <Link href={project.link}>
                  <p className="text-sm font-semibold  hover:underline cursor-pointer">
                    {project.title} ({project.id})
                  </p>
                </Link>
              ) : (
                <p className="text-sm font-semibold">
                  {project.title} ({project.id})
                </p>
              )}
            </div>

            {/* Pending Status */}
            <div className="text-xs text-gray-600">
              <p>Pending Since - {project.pendingSince} / Expires in {project.expiresIn}</p>
            </div>

            {/* Accept Button and Dropdown */}
            <div className="flex gap-4 items-center">
              <CustomButton text="Accept" className="w-52" />

              {/* Dropdown */}
              <div className="relative">
                <button onClick={() => setDropdownOpen(dropdownOpen === index ? null : index)}>
                  <MoreVertical className="w-5 h-5 text-gray-600 cursor-pointer" />
                </button>
                {dropdownOpen === index && (
                  <div className="absolute right-0 mt-2 w-32 bg-white shadow-md rounded-md py-2 z-10">
                    {project.link ? (
                      <Link href={project.link}>
                        <span className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                          View Details
                        </span>
                      </Link>
                    ) : (
                      <span className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-not-allowed">
                        View Details
                      </span>
                    )}
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Cancel Contract
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingProjects;
