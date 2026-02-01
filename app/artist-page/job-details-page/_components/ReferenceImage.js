"use client";
import React from "react";
import { Paperclip } from "lucide-react";

const ReferenceImage = ({ jobId }) => {
    const [hasReference, setHasReference] = React.useState(false);
    const [attachments, setAttachments] = React.useState([]);

    React.useEffect(() => {
        // Check if a project was posted and if it has a reference image
        const postedProject = JSON.parse(localStorage.getItem('postedProject') || 'null');

        // Always show for job-0, using posted data if available, otherwise default
        if (jobId === 'job-0') {
            setHasReference(true);
            if (postedProject && postedProject.referenceImg) {
                setAttachments([
                    { name: postedProject.referenceImg, size: "N/A" }
                ]);
            } else {
                setAttachments([
                    { name: "Style-Reference.png", size: "2.4 MB" },
                    { name: "Moodboard_v2.pdf", size: "1.8 MB" }
                ]);
            }
        } else {
            setHasReference(false);
        }
    }, [jobId]);

    if (!hasReference) return null;

    return (
        <>
            {/* Mobile View */}
            <div className="lg:hidden mt-6">
                <h4 className="font-bold text-lg text-[#222222] mb-3">Reference Image</h4>
                <div className="bg-[#FAFAFA] rounded-2xl p-4 border border-[#EAEAEA]">
                    <div className="space-y-3">
                        {attachments.map((file, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <div className="bg-[#CCE7F2] p-2 rounded-lg">
                                    <Paperclip className="w-4 h-4 text-[#035A7A]" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-[#222222]">{file.name}</span>
                                    <span className="text-xs text-[#767676]">{file.size}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Desktop View */}
            <div className="hidden lg:block lg:w-screen lg:max-w-[85%] bg-[#F9F9F9] px-8 py-6 mt-6 lg:mx-16 mx-4 rounded-2xl">
                <h4 className="font-bold text-[22px] text-[#222222] mb-4">Reference Image</h4>
                <div className="mt-4">
                    <div className="flex gap-6">
                        {attachments.map((file, index) => (
                            <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-[#EAEAEA] min-w-[240px]">
                                <div className="bg-[#CCE7F2] p-3 rounded-xl">
                                    <Paperclip className="w-6 h-6 text-[#035A7A]" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-base font-medium text-[#222222]">{file.name}</span>
                                    <span className="text-sm text-[#767676]">{file.size}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReferenceImage;
