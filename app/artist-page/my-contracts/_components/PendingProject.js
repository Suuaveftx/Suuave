import { useState } from "react";
import { AlertTriangle, MoreVertical } from "lucide-react";
import CustomButton from "../../../../components/CustomButton";
import SearchBar from "../../../../components/Searchbar";


const PendingProjects = () => {
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const pendingProjects = [
    {
      title: "Modern Fashion Attire Illustration",
      id: "24t64754-A",
      pendingSince: "18. June 2024",
      expiresIn: "-2 days",
    },
    {
      title: "Modern Fashion Attire Illustration",
      id: "24t64754-B",
      pendingSince: "18. June 2024",
      expiresIn: "-2 day",
    },
  ];

  return (
    <div>
      {/* Desktop Warning */}
      <div className="lg:flex items-start space-x-3 p-3 rounded-lg hidden">
        <AlertTriangle className="text-[#FF8024] w-6 h-6 mt-1" />
        <p className="text-sm text-[#FF8024]">
          These contracts are yet to be accepted. <br />
          Artists have 2 days to accept the offer, else the contract will be
          canceled automatically.
        </p>
      </div>

      {/* Mobile Warning */}
      <div className="bg-[#EAEAEA] w-full max-w-[80%] lg:hidden items-start space-x-3 p-3 rounded-lg flex mx-auto">
        <AlertTriangle className="text-[#878787] w-6 h-6 mt-1" />
        <p className="text-sm text-[#444444]">
          You have pending contract you are yet to <br />
          accept. Pending contracts automatically cancel after 48hrs.
        </p>
      </div>

      {/* Search Bar (Desktop Only) */}
      <div className="lg:flex hidden mt-4 items-center w-2/4 mr-8">
        <SearchBar placeholder="Search by job title" />
      </div>

      {/* Pending Projects */}
      <div>
        {pendingProjects.map((project) => (
          <div
            key={project.id}
            className="bg-[#fafafa] px-4 py-4 rounded-lg shadow-md lg:mt-[36px] mt-[26px] mb-4 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4"
          >
            {/* Project Info + Mobile Dots */}
            <div className="lg:flex lg:flex-row lg:items-center lg:gap-8">
              <h3 className="lg:text-base tracking-[0.33px] lg:text-[#222222] text-[#3A98BB] font-semibold flex items-center justify-between lg:justify-start lg:mb-0 mb-2">
                {project.title}
                {/* Mobile-only three dots beside title */}
                <div className="ml-2 flex lg:hidden relative">
                  <button
                    onClick={() =>
                      setDropdownOpen(
                        dropdownOpen === project.id ? null : project.id
                      )
                    }
                  >
                    <MoreVertical className="w-5 h-5 text-gray-600 cursor-pointer" />
                  </button>
                  {dropdownOpen === project.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      <button
                        onClick={() => setDropdownOpen(null)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => setDropdownOpen(null)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        Cancel Contract
                      </button>
                    </div>
                  )}
                </div>
              </h3>
              <div className="lg:flex lg:flex-row flex-col lg:gap-2">
              <p className="text-sm text-gray-500">
                Pending since: {project.pendingSince}
              </p>
              <p className="text-sm text-gray-500">
                Expires in: {project.expiresIn}
              </p>
              </div>
            </div>

            {/* Accept Button (Desktop Only) */}
            <div className="hidden lg:flex items-center gap-6">
              <CustomButton
                variant="outline"
                size="sm"
                onClick={() => setDropdownOpen(project.id)}
                className="items-center gap-2"
                text="Accept Offer"
                style={{
                  color: "#035A7A",}}

              />
               <CustomButton
                variant="outline"
                size="sm"
                onClick={() => setDropdownOpen(project.id)}
                className="items-center gap-2"
                text="Decline Offer"
                style={{
                  color: "#035A7A",
                   background: "transparent",
                  border: "1px solid #3A98BB",}}

              />
            </div>
              <div className="ml-2 lg:flex hidden  relative">
                  <button
                    onClick={() =>
                      setDropdownOpen(
                        dropdownOpen === project.id ? null : project.id
                      )
                    }
                  >
                    <MoreVertical className="w-5 h-5 text-gray-600 cursor-pointer" />
                  </button>
                  {dropdownOpen === project.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      <button
                        onClick={() => setDropdownOpen(null)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => setDropdownOpen(null)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        Cancel Contract
                      </button>
                    </div>
                  )}
                </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingProjects;
