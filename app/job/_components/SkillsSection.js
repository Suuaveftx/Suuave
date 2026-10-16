"use client";

export default function SkillsSection() {
    return (
        <div className="w-full mb-6">
            {/* Skills Requirement */}
            <div className="mb-5">
                <h2 className="text-[16px] font-bold text-[#2E2E2E] mb-3">
                    Skills Requirement
                </h2>
                <div className="flex flex-wrap gap-2">
                    {["3D Artist", "Concept Artist", "Storyboard"].map((skill) => (
                        <div
                            key={skill}
                            className="bg-[#F2F2F2] px-4 py-2 rounded-full text-[13px] text-[#757575] font-medium"
                        >
                            {skill}
                        </div>
                    ))}
                </div>
            </div>

            {/* Design Style */}
            <div>
                <h2 className="text-[16px] font-bold text-[#2E2E2E] mb-3">
                    Design Style
                </h2>
                <div className="flex flex-wrap gap-2">
                    {["Casual", "Ethnic", "Street Wear"].map((style) => (
                        <div
                            key={style}
                            className="bg-[#F2F2F2] px-4 py-2 rounded-full text-[13px] text-[#757575] font-medium"
                        >
                            {style}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
