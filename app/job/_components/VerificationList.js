"use client";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";

export default function VerificationList() {
    const verifications = [
        "Identity Verified",
        "Email Address Verified",
        "Phone Number Verified",
        "Payment Method Verified"
    ];

    return (
        <div className="mb-24 px-1">
            <h2 className="text-[17px] font-bold text-[#2E2E2E] mb-5">
                Client Verifications
            </h2>
            <div className="flex flex-col gap-4">
                {verifications.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                        {/* Blue Icon */}
                        <CheckBadgeIcon className="w-6 h-6 text-[#6EC1E4]" />
                        <span className="text-[15px] text-[#757575] font-medium">
                            {item}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
