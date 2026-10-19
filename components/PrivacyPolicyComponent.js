import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-white text-[#222222] py-16 px-6 lg:px-24">
            <div className="max-w-4xl space-y-10 font-satoshi">
                {/* Header */}
                <div className="space-y-3">
                    <p className="text-sm font-semibold text-[#717171] uppercase tracking-wide">Legal</p>
                    <h1 className="text-4xl lg:text-5xl font-bold text-[#035A7A]">Privacy Policy</h1>
                    <p className="text-lg text-gray-500 font-medium">Effective Date: Nov 30, 2026</p>
                </div>

                <p className="text-lg leading-relaxed text-gray-700">
                    This Privacy Policy describes Our policies and procedures on the collection, use, and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
                </p>

                {/* Section 1 */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-[#223B44] border-b pb-2">1. Definitions</h2>
                    <p className="text-gray-700">For the purposes of this Privacy Policy:</p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                        <li><strong>Account</strong> means a unique account created for You to access our Service.</li>
                        <li><strong>Company</strong> refers to Suuave, situated in Nigeria.</li>
                        <li><strong>Personal Data</strong> is any information that relates to an identified or identifiable individual.</li>
                        <li><strong>Service</strong> refers to the Website and marketplace platform.</li>
                    </ul>
                </section>

                {/* Section 2 */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-[#223B44] border-b pb-2">2. Governing Law and Global Compliance</h2>
                    <p className="text-gray-700 leading-relaxed">
                        The Company is incorporated and situated in Nigeria. The processing of Personal Data is primarily governed by the Nigeria Data Protection Act (NDPA) 2023. We also align with international standards including the GDPR (Europe) and core principles of the CCPA (California) to protect our global users.
                    </p>
                </section>

                {/* Section 3 */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-bold text-[#223B44] border-b pb-2">3. Information We Collect</h2>

                    <div className="space-y-3">
                        <h3 className="text-xl font-semibold text-[#035A7A]">3.1 Personal Information You Provide</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li><strong>Contact & Profile:</strong> Name, email, address, and professional biography.</li>
                            <li><strong>Identity Verification:</strong> We may collect images of government-issued IDs or tax identifiers to verify artists and brands.</li>
                            <li><strong>Payment Data:</strong> Bank account details, billing addresses, and payment instrument information necessary to facilitate escrow and licensing fees.</li>
                            <li><strong>Communications:</strong> We collect information from messages and calls made through our platform to provide support and ensure safety.</li>
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-xl font-semibold text-[#035A7A]">3.2 Information Automatically Collected</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li><strong>Usage & Log Data:</strong> Details on how you interact with the Service (e.g., designs viewed, clicks, and search queries).</li>
                            <li><strong>Device & Location:</strong> IP addresses, device identifiers, and approximate location data based on your network.</li>
                            <li><strong>Cookies:</strong> We use cookies to enhance navigation and remember your preferences.</li>
                        </ul>
                    </div>
                </section>

                {/* Section 4 */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-[#223B44] border-b pb-2">4. How We Use and Share Your Information</h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                        <li><strong>Service Delivery:</strong> To facilitate project collaborations and licensing between African artists and global brands.</li>
                        <li><strong>International Transfers:</strong> As a global marketplace, your data may be transferred across borders. We use Standard Contractual Clauses (SCCs) to ensure your data remains protected.</li>
                        <li><strong>Third-Party Service Providers:</strong> We share information with partners who assist in identity verification, fraud prevention, and payment processing.</li>
                        <li><strong>Legal Compliance:</strong> We may disclose data to tax or governmental authorities where required by law.</li>
                    </ul>
                </section>

                {/* Section 5 */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-[#223B44] border-b pb-2">5. Your Rights and Choices</h2>
                    <p className="text-gray-700">Regardless of your location, you have the following rights under the NDPA and GDPR:</p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                        <li><strong>Access & Rectification:</strong> Request a copy of your data or correct inaccurate info.</li>
                        <li><strong>Erasure:</strong> Request the deletion of your account and data.</li>
                        <li><strong>Data Portability:</strong> Request your data in a structured, machine-readable format.</li>
                        <li><strong>Withdraw Consent:</strong> Withdraw permission for data processing at any time.</li>
                    </ul>
                </section>

                {/* Section 6 */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-[#223B44] border-b pb-2">6. Data Security and Retention</h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                        <li><strong>Security:</strong> We implement administrative and technical measures to protect your data, including secure encryption for &quot;The Vault&quot; asset storage.</li>
                        <li><strong>Retention:</strong> We retain personal information only as long as necessary to provide services and comply with legal obligations.</li>
                    </ul>
                </section>

                {/* Section 7 */}
                <section className="space-y-4 pt-4">
                    <h2 className="text-2xl font-bold text-[#223B44] border-b pb-2">7. Contact Us</h2>
                    <p className="text-gray-700 leading-relaxed">
                        For any questions, contact our Data Privacy Team at: <a href="mailto:info@suuave.com" className="text-[#035A7A] hover:underline font-medium">info@suuave.com</a>.
                    </p>
                </section>

            </div>
        </div>
    );
};

export default PrivacyPolicy;
