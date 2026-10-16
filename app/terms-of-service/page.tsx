"use client";
import React, { Suspense, useEffect } from "react";
import Footer from "@/components/landing-page-components/Footer";
import ArtistFooter from "@/app/about-page/components/Footer";
import Navbar from "@/components/Navbar";
import ArtistNavbar from "@/components/ArtistNavbar";
import FashionDesignerHeader from "@/app/fashion-designers/_components/studio-page-components/FashionDesignerHeader";
import SearchBar from "@/components/Searchbar";
import { useSearchParams } from "next/navigation";

const TermsContent = () => {
    const searchParams = useSearchParams();
    const source = searchParams.get('source');

    useEffect(() => {
        const hash = window.location.hash;
        if (!hash) return;
        const id = hash.substring(1);
        const tryScroll = (attempts = 0) => {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            } else if (attempts < 10) {
                setTimeout(() => tryScroll(attempts + 1), 150);
            }
        };
        setTimeout(() => tryScroll(), 300);
    }, []);

    return (
        <>
            {source === 'artist' ? (
                <ArtistNavbar />
            ) : source === 'brand' ? (
                <FashionDesignerHeader />
            ) : (
                <Navbar bgColor="bg-[#223B44]" />
            )}
            <div className="bg-white px-6 lg:px-14 pt-6 pb-2">
                <div className="max-w-[700px]">
                    <SearchBar placeholder="Search terms, policies, or legal clauses..." width="w-full max-w-sm" />
                </div>
            </div>
            <main className="flex-grow bg-white text-[#222222] py-16 px-6 lg:px-24" style={{ scrollBehavior: 'smooth' }}>
                <div className="max-w-4xl space-y-10 font-satoshi">
                    <div>
                        <p className="text-sm font-semibold text-[#717171] uppercase mb-2 tracking-wide">Legal</p>
                        <h1 className="text-4xl lg:text-5xl font-bold text-[#035A7A] mb-4">
                            SUUAVE MASTER LEGAL & OPERATIONAL AGREEMENT
                        </h1>
                        <div className="text-lg text-gray-500 font-medium space-y-1">
                            <p>Effective Date: November 30, 2026.</p>
                            <p>Platform Scope: Suuave B2B Digital Fashion Marketplace & IP Infrastructure</p>
                        </div>
                    </div>

                    <p className="text-lg leading-relaxed text-gray-700">
                        This unified legal and operational document constitutes the master agreement governing all platform activity, account lifecycles, project collaborations, intellectual property licensing, escrow transactions, and dispute resolutions between Artists and Brands on Suuave.
                    </p>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-[#223B44] border-b pb-2">Document Architecture & Table of Contents</h2>
                        <div className="ml-4 space-y-4 text-lg text-gray-700">
                            <div>
                                <p className="font-semibold mb-2">
                                    <a href="#p1-main" className="hover:underline">PART I: MASTER TERMS OF SERVICE</a>
                                </p>
                                <ul className="list-inside list-disc space-y-2">
                                    <li><a href="#p1-s1" className="text-[#035A7A] hover:underline">Section 1: Scope of Service & Platform Infrastructure</a></li>
                                    <li><a href="#p1-s2" className="text-[#035A7A] hover:underline">Section 2: Account Eligibility, Onboarding & User Verification</a></li>
                                    <li><a href="#p1-s3" className="text-[#035A7A] hover:underline">Section 3: Financial Framework, Escrow & Anti-Circumvention</a></li>
                                    <li><a href="#p1-s4" className="text-[#035A7A] hover:underline">Section 4: Privacy, Data Security & Digital Vaulting</a></li>
                                    <li><a href="#p1-s5" className="text-[#035A7A] hover:underline">Section 5: General Liability, Indemnity & Governing Law</a></li>
                                </ul>
                            </div>
                            <div>
                                <p className="font-semibold mb-2 mt-4">
                                    <a href="#p2-main" className="hover:underline">PART II: SCHEDULE A — COLLABORATION & LICENSING POLICY</a>
                                </p>
                                <ul className="list-inside list-disc space-y-2">
                                    <li><a href="#p2-s1" className="text-[#035A7A] hover:underline">Section 1: Project Lifecycle & Custom Engagements</a></li>
                                    <li><a href="#p2-s2" className="text-[#035A7A] hover:underline">Section 2: Digital Rights Management (DRM) & Asset Licensing</a></li>
                                    <li><a href="#p2-s3" className="text-[#035A7A] hover:underline">Section 3: Deadline Extension Request Framework</a></li>
                                    <li><a href="#p2-s4" className="text-[#035A7A] hover:underline">Section 4: Dispute Resolution Protocol ("Suuave Resolution Lab")</a></li>
                                    <li><a href="#p2-s5" className="text-[#035A7A] hover:underline">Section 5: Transaction Safeguards & Financial Resolution</a></li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <hr className="border-[#DDDDDD] my-8" />

                    <section className="space-y-8">
                        <h2 id="p1-main" className="text-2xl font-bold text-[#223B44] border-b pb-2 scroll-mt-24">PART I: MASTER TERMS OF SERVICE</h2>

                        <div className="space-y-8">
                            <div>
                                <h3 id="p1-s1" className="text-xl font-semibold text-[#035A7A] mb-3 scroll-mt-24">Section 1: Scope of Service & Platform Infrastructure</h3>
                                <p className="text-lg leading-relaxed text-gray-700">
                                    Suuave provides managed marketplace infrastructure connecting fashion designers and corporate brands ("Clients" or "Brands") with fashion artists, sketchers, and digital creators ("Artists") for custom project collaboration, digital asset management, and intellectual property (IP) licensing. Suuave acts as a managed technology facilitator and escrow agent; it is not an employer of Artists nor a partner in Client businesses.
                                </p>
                            </div>

                            <div>
                                <h3 id="p1-s2" className="text-xl font-semibold text-[#035A7A] mb-3 scroll-mt-24">Section 2: Account Eligibility, Onboarding & User Verification</h3>
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-xl font-semibold text-[#035A7A] mb-2">Artist Onboarding & Verification:</h4>
                                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                            <li><span className="font-semibold">Data Intake:</span> Artists complete mandatory Personal Details and Professional Information, with an option to append Awards & Certifications.</li>
                                            <li><span className="font-semibold">Provisional Access:</span> Submitting Professional Information or Awards & Certifications grants provisional access to the Artist Dashboard. Incomplete profiles display a persistent UI banner atop the interface restricting full operational access.</li>
                                            <li><span className="font-semibold">Evaluation Window:</span> Post-submission triggers a 48-hour verification window with multi-channel notifications (Email/In-App).</li>
                                            <li>
                                                <span className="font-semibold">Verification Outcomes:</span>
                                                <ul className="list-[circle] list-inside ml-6 mt-2 space-y-2">
                                                    <li><em>Successful Verification:</em> Grants a "Verified" badge, full platform features, and complete catalogue listing capabilities.</li>
                                                    <li><em>Unsuccessful Verification:</em> Rejection notices trigger a mandatory 30-day cooldown period before re-application is permitted.</li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-semibold text-[#035A7A] mb-2">Brand Onboarding:</h4>
                                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                            <li><span className="font-semibold">Data Intake:</span> Brands complete mandatory Brand Fundamentals and optional Personal Details. Corporate entities must provide valid business registration details.</li>
                                            <li><span className="font-semibold">Setup Enforcement:</span> Dashboard access is granted upon initial submission. A persistent "Complete Your Profile Setup" reminder remains visible until full setup completion triggers an automated welcome email granting unrestricted marketplace access.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 id="p1-s3" className="text-xl font-semibold text-[#035A7A] mb-3 scroll-mt-24">Section 3: Financial Framework, Escrow & Anti-Circumvention</h3>
                                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                    <li><span className="font-semibold">Escrow Protection:</span> All project funds are held by Suuave or its authorized payment gateway partners upon project commitment.</li>
                                    <li><span className="font-semibold">Release of Funds:</span> Escrowed funds are released to the Artist only upon Client confirmation of deliverable satisfaction or milestone approval.</li>
                                    <li><span className="font-semibold">Service Fees:</span> Suuave charges commission fees on Artist payouts and standard service fees on Client transactions, disclosed during proposal and contract generation.</li>
                                    <li><span className="font-semibold">Anti-Circumvention Rule:</span> Communicating or transferring payments off-platform to bypass transaction fees is a material breach of contract. Attempting off-platform disintermediation results in immediate account termination, forfeiture of escrow protection, and potential lost revenue penalties.</li>
                                    <li><span className="font-semibold">Clear Digital Goods Terms of Service (No "Change of Mind" Refunds):</span> Digital design files (unlike physical clothing samples) can be copied instantly once accessed. Therefore, all digital downloads and exclusive design transfers are final upon delivery and download. They are strictly non-refundable, except in cases of proven file corruption, empty packages, or severe misrepresentation.</li>
                                </ul>
                            </div>

                            <div>
                                <h3 id="p1-s4" className="text-xl font-semibold text-[#035A7A] mb-3 scroll-mt-24">Section 4: Privacy, Data Security & Digital Vaulting</h3>
                                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                    <li><span className="font-semibold">Encrypted Asset Vaulting:</span> High-resolution source files (.OBJ, .AI, .PNG) are stored in encrypted backend environments. Access is restricted strictly to the paying Client and creating Artist post-payment.</li>
                                    <li><span className="font-semibold">Compliance Standards:</span> Suuave complies with applicable NDPR and GDPR standards, collecting essential KYC (Know Your Customer) data to facilitate cross-border international payouts and prevent fraud.</li>
                                    <li><span className="font-semibold">AI Model Protection:</span> Suuave does not use, scrape, or license Artist-uploaded designs to train third-party or internal Generative AI models without explicit, written consent.</li>
                                </ul>
                            </div>

                            <div>
                                <h3 id="p1-s5" className="text-xl font-semibold text-[#035A7A] mb-3 scroll-mt-24">Section 5: General Liability, Indemnity & Governing Law</h3>
                                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                    <li><span className="font-semibold">Warranty & Originality:</span> Artists warrant that all work uploaded or delivered is original and does not infringe on third-party intellectual property rights.</li>
                                    <li><span className="font-semibold">Indemnification:</span> If an Artist uploads infringing or stolen content, the Artist assumes full legal liability and agrees to indemnify Suuave and the affected Client against legal fees and damages.</li>
                                    <li><span className="font-semibold">Binding Arbitration & Law:</span> All claims arising under this Master Agreement are governed by applicable regional and international trade laws, subject to the administrative dispute frameworks detailed in Schedule A.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <hr className="border-[#DDDDDD] my-8" />

                    <section className="space-y-8">
                        <h2 id="p2-main" className="text-2xl font-bold text-[#223B44] border-b pb-2 scroll-mt-24">PART II: SCHEDULE A — COLLABORATION & LICENSING POLICY</h2>

                        <div className="space-y-8">
                            <div>
                                <h3 id="p2-s1" className="text-xl font-semibold text-[#035A7A] mb-3 scroll-mt-24">Section 1: Project Lifecycle & Custom Engagements</h3>

                                {/* Project Lifecycle Diagram */}
                                <div className="w-full my-8">
                                    <img
                                        src="/dev-images/Project Lifecycle.png"
                                        alt="Suuave Project Collaboration Lifecycle diagram"
                                        className="w-full h-auto max-w-[700px] mx-auto block"
                                    />
                                </div>

                                <div className="space-y-8">
                                    <div>
                                        <h4 className="text-xl font-semibold text-[#035A7A] mb-2">1.1 Briefing & Proposal Exchange</h4>
                                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                            <li><span className="font-semibold">Post Project Intake:</span> Brands define project scope, budget, timeframes, design style, required skills, and optional reference images via the Post Project module. Publishing distributes the brief to the global Opportunities Feed.</li>
                                            <li><span className="font-semibold">Proposal Submission:</span> Artists submit structured proposals outlining creative approach, delivery timelines, and financial terms.</li>
                                            <li><span className="font-semibold">Proposal Modification & Lock:</span> Upon submission, the listing updates to Applied. Primary actions transition to Withdraw Proposal (retracts bid from Brand review) and Edit Proposal (pre-populates existing bid data for updates). Proposals marked as "Inactive" or "Closed" cannot be edited or withdrawn.</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-semibold text-[#035A7A] mb-2">1.2 Contract Issuance & Escrow Binding</h4>
                                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                            <li><span className="font-semibold">Offer Issuance:</span> Selecting Hire on an Artist proposal generates a formal agreement in the Pending Contracts queue and initiates Escrow Protection.</li>
                                            <li><span className="font-semibold">3-Day Acceptance Window:</span> Artists have less than two (2) calendar days to review, accept, or decline pending offers.</li>
                                            <li><span className="font-semibold">Accept Offer:</span> Formally transitions contract status to Ongoing and locks project funds in escrow.</li>
                                            <li><span className="font-semibold">Decline / Cancel Offer:</span> Rejects the issuance. Brands may use Cancel to rescind an offer prior to Artist acceptance.</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-semibold text-[#035A7A] mb-2">1.3 Execution, Delivery & Deliverable Approval</h4>
                                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                            <li><span className="font-semibold">In-Platform Engagement:</span> All technical specifications, scope adjustments, and Time & Action (T&A) reports must occur within the project chat client. A persistent banner enforces in-platform communication to preserve escrow coverage.</li>
                                            <li><span className="font-semibold">Submission & Review:</span> The Artist initiates Submit Project, completing a mandatory Rating & Review flow prior to final submission.</li>
                                            <li><span className="font-semibold">Deliverable Validation:</span> Brands evaluate submitted assets (technical sketches, tech packs, 3D renders, or master source files).</li>
                                            <li><span className="font-semibold">Approve Work:</span> Releases escrow funds directly to the Artist's Wallet.</li>
                                            <li><span className="font-semibold">Reject:</span> Pauses the payment flow and initiates a revision cycle based on agreed tech pack specifications.</li>
                                            <li>
                                                <span className="font-semibold">Deliverable Approval & 48-Hour Feedback Window:</span> Upon delivery of final assets, Brands must evaluate and approve the work. Deliverable approval initiates a mandatory 48-Hour Post-Purchase Review Window. Escrowed funds will be released to the Artist's Wallet upon either:
                                                <ul className="list-[circle] pl-6 mt-2 space-y-1">
                                                    <li>The Brand’s submission of post-purchase feedback and rating within the 48-hour period; or</li>
                                                    <li>Automated system release upon the expiration of 48 hours post-approval, provided no technical dispute has been filed.</li>
                                                </ul>
                                            </li>
                                            <li><span className="font-semibold">Retainer Transition:</span> Completed project engagements can transition into ongoing monthly arrangements via Retain Artist, unlocking direct off-project communication channels.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 id="p2-s2" className="text-xl font-semibold text-[#035A7A] mb-3 scroll-mt-24">Section 2: Digital Rights Management (DRM) & Asset Licensing</h3>
                                <div className="space-y-6 text-base font-normal leading-relaxed">
                                    <div>
                                        <h4 className="text-xl font-semibold text-[#035A7A] mb-2">2.1 Ownership Tiers & Commercial Rights</h4>
                                        <div className="w-full my-6">
                                            <img
                                                src="/dev-images/Licensing Table .png"
                                                alt="Licensing and Ownership Framework Tiers"
                                                className="w-full h-auto max-w-[700px] mx-auto block"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-semibold text-[#035A7A] mb-2">2.2 DRM Security & Source File Vaulting</h4>
                                        <ul className="list-disc list-inside space-y-3">
                                            <li><span className="font-semibold">Watermarking & Public Gallery:</span> Public-facing studio images display watermarks or low-resolution sketches uploaded by Artists.</li>
                                            <li><span className="font-semibold">Encrypted Vaulting:</span> Master Source Files (.OBJ, .AI, .PNG) are vaulted in backend encrypted environments. Source files are hidden from public view and released only upon payment verification and escrow release.</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-semibold text-[#035A7A] mb-2">2.3 Traditional Cultural Expressions (TCE) & AI Protections</h4>
                                        <p>
                                            In alignment with AfCFTA Protocols on Intellectual Property, Artists warrant that traditional motifs, tribal patterns, or cultural heritage elements used in listed work are commercialized with authorization and respect. Scraping, automated harvesting, or AI model training on Artist assets without explicit consent is strictly prohibited.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 id="p2-s3" className="text-xl font-semibold text-[#035A7A] mb-3 scroll-mt-24">Section 3: Deadline Extension Request Framework</h3>
                                <div className="w-full my-8">
                                    <img
                                        src="/dev-images/Extension Request.png"
                                        alt="Deadline Extension Request Framework workflow"
                                        className="w-full h-auto max-w-[700px] mx-auto block"
                                    />
                                </div>
                                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                    <li><span className="font-semibold">Initiation:</span> Requesting party submits a Request Extension form specifying current/proposed deadlines, reason, and optional financial offers.</li>
                                    <li><span className="font-semibold">Review & Action:</span> Receiving party evaluates overlay notification.</li>
                                    <li><span className="font-semibold">Decline:</span> Original delivery dates remain contractually binding.</li>
                                    <li><span className="font-semibold">Artist Acceptance:</span> Timeline updates instantly at no cost.</li>
                                    <li><span className="font-semibold">Brand Acceptance (with Payment):</span> Routes Brand to payment gateway to deposit additional funds into escrow before confirming new timeline.</li>
                                    <li><span className="font-semibold">Audit Tracking:</span> Contract logs automatically record timestamps, updated deadlines, and financial movements.</li>
                                </ul>
                            </div>

                            <div>
                                <h3 id="p2-s4" className="text-xl font-semibold text-[#035A7A] mb-3 scroll-mt-24">Section 4: Dispute Resolution Protocol ("Suuave Resolution Lab")</h3>
                                <div className="w-full my-8">
                                    <img
                                        src="/dev-images/Dispute.png"
                                        alt="Dispute Resolution Protocol workflow"
                                        className="w-full h-auto max-w-[700px] mx-auto block"
                                    />
                                </div>
                                <div className="space-y-8">
                                    <div>
                                        <h4 className="text-xl font-semibold text-[#035A7A] mb-2">4.1 Dispute Initiation & Dynamic State</h4>
                                        <p className="text-lg leading-relaxed text-gray-700">
                                            Clicking Report Dispute on an active project card opens the intake modal and dynamically converts the action button state to Withdraw Dispute. Clicking Withdraw Dispute allows the reporting party to certify mutual self-resolution and cancel arbitration.
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-semibold text-[#035A7A] mb-2">4.1.1 Intake Categories & Evidence Submission</h4>
                                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                            <li><span className="font-semibold">Brand Issues:</span> Late delivery, unusable file formats, deliverable differing from brief, seller unresponsiveness (48+ hours), or suspected plagiarism.</li>
                                            <li><span className="font-semibold">Artist Issues:</span> Out-of-scope requests, excessive revisions, ghosted deliverable approvals, buyer unresponsiveness (48+ hours), or off-platform solicitation.</li>
                                            <li><span className="font-semibold">Mandatory Intake Undertaking:</span> Users must upload supporting proof via Attach Evidence (chat logs, briefs, receipts) and accept a mandatory policy undertaking acknowledging that admin determinations are final and false reporting risks account suspension.</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-semibold text-[#035A7A] mb-2">4.1.2 48-Hour Conciliation Window</h4>
                                        <p className="text-lg leading-relaxed text-gray-700">
                                            Upon submission, the system dispatches notifications and displays an overlay banner in the chat client opening a mandatory 48-hour conciliation window for direct party negotiation. If resolved during this period, the reporting party uses Withdraw Dispute to close the ticket.
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-semibold text-[#035A7A] mb-2">4.1.3 Automated Lock & Binding Admin Arbitration</h4>
                                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                            <li>After 48 hours, the chat interface freezes automatically to prevent history tampering. Suuave Admin audits submitted evidence, chat logs, and tech packs to issue a final, binding verdict via email and formally close the project.</li>
                                            <li><span className="font-semibold">Policy Requirement:</span> Disputes must be initiated while contract status is Active. Expired or Completed contracts automatically release escrow funds, voiding subsequent platform claims.</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-[#035A7A] mb-2">4.2 Intake Categories & Evidence Submission (The "Defect-Only" Dispute Standard):</h4>
                                        <p className="text-lg leading-relaxed text-gray-700">
                                            If a brand files a dispute over a purchased design, they must provide technical proof of defect, such as a corrupted file extension, missing core components promised in the design description, or a file that completely contradicts the preview. A brand cannot claim dissatisfaction or dispute a purchase simply because they "decided they didn't like the style" after downloading the source asset.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 id="p2-s5" className="text-xl font-semibold text-[#035A7A] mb-3 scroll-mt-24">Section 5: Transaction Safeguards & Financial Resolution</h3>
                                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                    <li><span className="font-semibold">Ledgers:</span> Artists manage balances via the Wallet. Brands audit expenditures in Transaction History via unique Transaction IDs (e.g., TXN-98244-K).</li>
                                    <li><span className="font-semibold">Discrepancy Reporting:</span> For financial errors (pending statuses, payout delays, or incorrect charges), users click Report Any Issue. Users input the Transaction ID, select the discrepancy type, attach financial proof, and submit.</li>
                                    <li><span className="font-semibold">Support SLA:</span> Submissions generate an automated tracking ticket (e.g., #TKT-84920) subject to a 24–48 hour administrative resolution.</li>
                                    <li><span className="font-bold">Payout Release Schedule:</span> Escrowed payments are subject to the 48-hour post-purchase review window following deliverable approval. Artists acknowledge that payout availability in the Wallet is contingent upon the completion of this feedback cycle or the expiration of the 48-hour auto-release timer.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                </div>
            </main>
            {source === 'artist' || source === 'brand' ? (
                <ArtistFooter source={source} />
            ) : (
                <Footer />
            )}
        </>
    );
};

const TermsOfService = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Suspense fallback={<div className="h-20 bg-[#CCE7F2] w-full" />}>
                <TermsContent />
            </Suspense>
        </div>
    );
};

export default TermsOfService;
