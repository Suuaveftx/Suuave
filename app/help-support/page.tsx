"use client";
import React, { Suspense, useEffect, useState } from "react";
import Footer from "@/components/landing-page-components/Footer";
import ArtistFooter from "@/app/about-page/components/Footer";
import Navbar from "@/components/Navbar";
import ArtistNavbar from "@/components/ArtistNavbar";
import FashionDesignerHeader from "@/app/fashion-designers/_components/studio-page-components/FashionDesignerHeader";
import SearchBar from "@/components/Searchbar";
import { useSearchParams, useRouter } from "next/navigation";
import { Accordion, AccordionItem, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@heroui/react";
import { Pen, Info, X } from "lucide-react";
import { TourProvider } from "@/components/tour/ProductTour";

const HelpSupportContent = () => {
    const searchParams = useSearchParams();
    const source = searchParams.get('source');
    const router = useRouter();
    const [notification, setNotification] = useState<string | null>(null);

    // Unauthenticated (no source) redirects to login for protected pages
    const getProtectedLink = (path: string) => source ? path : '/auth/login';

    // When an artist clicks Brand Dashboard, redirect to their project page with a notice
    const handleBrandDashboardClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!source) {
            router.push('/auth/login');
        } else if (source === 'artist') {
            setNotification('Notice: You were redirected to your Artist Dashboard because Brand Dashboard features are reserved for Brand Accounts.');
            router.push('/artist-page/project-page');
        } else {
            router.push('/fashion-designers');
        }
    };

    // When a brand clicks Jobs Marketplace, redirect to their Brand Dashboard with a notice
    const handleJobsMarketplaceClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!source) {
            router.push('/auth/login');
        } else if (source === 'brand') {
            setNotification('Notice: You were redirected to your Brand Dashboard because Artist Dashboard features are reserved for Artist Accounts.');
            router.push('/fashion-designers');
        } else {
            router.push('/artist-page/project-page');
        }
    };

    // When a brand clicks My Proposals, redirect to their My Projects with a notice
    const handleMyProposalsClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!source) {
            router.push('/auth/login');
        } else if (source === 'brand') {
            setNotification('Notice: You were redirected to My Projects. The Proposals workspace is reserved for Artists managing job bids.');
            router.push('/fashion-designers/my-projects');
        } else {
            router.push('/artist-page/my-proposals');
        }
    };

    // When an artist clicks Post Project, redirect to List a Design with a notice
    const handlePostProjectClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!source) {
            router.push('/auth/login');
        } else if (source === 'artist') {
            setNotification('Notice: You were redirected to List a Design. The proposal workspace is reserved for Artists managing job bids.');
            router.push('/artist-page/license-your-design');
        } else {
            router.push('/fashion-designers/post-project');
        }
    };

    // When an artist clicks My Projects, redirect to My Proposals with a notice
    const handleMyProjectsClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!source) {
            router.push('/auth/login');
        } else if (source === 'artist') {
            setNotification('Notice: You were redirected to My Proposals. The Projects dashboard is reserved for Brands managing job listings.');
            router.push('/artist-page/my-proposals');
        } else {
            router.push('/fashion-designers/my-projects');
        }
    };

    // When a user clicks Pending Contracts, route to their respective contracts layout
    const handlePendingContractsClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!source) {
            router.push('/auth/login');
        } else if (source === 'brand') {
            router.push('/fashion-designers/contracts');
        } else {
            router.push('/artist-page/my-contracts');
        }
    };

    // When a brand clicks List A Design, route to Post Project with a notice
    const handleListDesignClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!source) {
            router.push('/auth/login');
        } else if (source === 'brand') {
            setNotification('Notice: You were redirected to Post a Project. Listing pre-made designs is reserved for Artists—use this form to commission custom design briefs.');
            router.push('/fashion-designers/post-project');
        } else {
            router.push('/artist-page/license-your-design');
        }
    };

    // When an artist clicks My Collections, redirect to Jobs Marketplace with a notice
    const handleMyCollectionsClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!source) {
            router.push('/auth/login');
        } else if (source === 'artist') {
            setNotification('Notice: Redirected to the Jobs Marketplace. The My Collections vault is reserved for Brands managing purchased licenses.');
            router.push('/artist-page/project-page');
        } else {
            router.push('/fashion-designers/my-collection');
        }
    };

    // When an artist or brand clicks Ongoing Contracts, route them properly
    const handleOngoingContractClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!source) {
            router.push('/auth/login');
        } else if (source === 'brand') {
            router.push('/fashion-designers/contracts?tab=ongoing');
        } else {
            router.push('/artist-page/my-contracts?tab=ongoing');
        }
    };

    // When an artist or brand clicks Artist Profile, route properly
    const handleArtistProfileClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!source) {
            router.push('/auth/login');
        } else if (source === 'brand') {
            setNotification('Notice: You were redirected to your profile page.');
            router.push('/fashion-designers/profile');
        } else {
            router.push('/artist-page/profile-for-artist');
        }
    };

    // When an artist or brand clicks Wallet or its specific histories
    const handleWalletClick = (e: React.MouseEvent, tab?: string) => {
        e.preventDefault();
        if (!source) {
            router.push('/auth/login');
        } else if (source === 'brand') {
            setNotification('Notice: You are redirected to your transaction history. You cannot access an artist wallet.');
            router.push('/fashion-designers/transactions');
        } else {
            router.push(`/artist-page/wallet${tab ? `?tab=${tab}` : ''}`);
        }
    };

    // When an artist or brand clicks Transaction History
    const handleTransactionHistoryClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!source) {
            router.push('/auth/login');
        } else if (source === 'artist') {
            setNotification('Notice: You are redirected to your wallet. You cannot access a brand transaction history.');
            router.push('/artist-page/wallet');
        } else {
            router.push('/fashion-designers/transactions');
        }
    };

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

    const faqItems = [
        {
            key: "1",
            title: "How long does Artist account verification take?",
            content: <>Verification takes up to 48 hours. Approved profiles receive a &quot;Verified&quot; badge and full platform access. Unsuccessful applications enter a 30-day cooldown before re-applying. Read more under <a href="#account" className="text-blue-600 hover:underline font-normal">Artist Verification</a>.</>,
        },
        {
            key: "2",
            title: "How does Escrow protection work?",
            content: <>When a Brand hires an Artist, contract funds are locked in Escrow. Funds release to the Artist only after deliverables are submitted and the Brand selects [Approve Work]. Read more under <a href="#workflows" className="text-blue-600 hover:underline font-normal">Submitting &amp; Approving Work</a>.</>,
        },
        {
            key: "3",
            title: "What is the difference between Non-Exclusive and Exclusive licensing?",
            content: <>
                <p><strong>Non-Exclusive ("Get License"):</strong> Multi-buyer license; the artist retains ownership and the design stays live in the catalog.</p>
                <p className="mt-2"><strong>Exclusive (&quot;Buy Exclusive&quot;):</strong> Sole commercial usage rights granted to one Brand, marked with a Crown (👑) icon. The design is delisted immediately after purchase. Compare options in the <a href="#studio" className="text-blue-600 hover:underline font-normal">Licensing Table</a>.</p>
            </>,
        },
        {
            key: "4",
            title: "What happens if a project dispute arises?",
            content: <>Clicking [Report Dispute] opens a 48-hour conciliation window for direct chat. If unresolved at 48 hours and 1 minute, the chat locks automatically and a Suuave Admin audits logs to issue a binding verdict. Read the complete <a href="#disputes" className="text-blue-600 hover:underline font-normal">Dispute Protocol</a>.</>,
        },
    ];

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
                    <SearchBar placeholder="Type keywords: Verification, Escrow, Licensing, Disputes..." width="w-full max-w-sm" />
                </div>
            </div>
            <main className="flex-grow bg-white text-[#222222] py-16 px-6 lg:px-24" style={{ scrollBehavior: 'smooth' }}>
                <div className="max-w-4xl space-y-10 font-satoshi">
                    <div>
                        <p className="text-sm font-semibold text-[#717171] uppercase mb-2 tracking-wide">Support</p>
                        <h1 className="text-4xl lg:text-5xl font-bold text-[#035A7A] mb-4">
                            Help & Support Centre
                        </h1>
                        <p className="text-lg leading-relaxed text-gray-700">
                            Welcome to the Suuave Help & Support Centre. Whether you are an Artist monetising your creative talent or a Brand sourcing authentic African fashion artistry, find clear answers, step-by-step guides, and resolution paths below.
                        </p>
                    </div>

                    <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-[#E5E5E5]">
                        <h2 className="text-2xl font-bold text-[#223B44] border-b pb-2 mb-6">Top FAQs</h2>
                        <Accordion variant="light">
                            {faqItems.map((item) => (
                                <AccordionItem
                                    key={item.key}
                                    aria-label={item.title}
                                    title={<span className="font-medium text-base text-[#222222]">{item.title}</span>}
                                >
                                    <div className="text-[#717171] text-base leading-relaxed pb-4">
                                        {item.content}
                                    </div>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </section>

                    {notification && (
                        <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 text-blue-800 rounded-xl px-5 py-4 mb-6 shadow-sm">
                            <Info className="w-5 h-5 mt-0.5 flex-shrink-0 text-blue-500" />
                            <p className="text-sm flex-1">{notification}</p>
                            <button onClick={() => setNotification(null)} className="ml-2 text-blue-400 hover:text-blue-700 flex-shrink-0"><X className="w-4 h-4" /></button>
                        </div>
                    )}
                    <div className="space-y-8">
                        <section id="account" className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-[#E5E5E5] scroll-mt-24">
                            <h2 className="text-2xl font-bold text-[#223B44] border-b pb-2 mb-5">1. Account, Verification & Settings</h2>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                <li className="text-lg"><strong className="text-[#035A7A]">Artist Verification:</strong> <span className="text-gray-700">Complete mandatory Personal Details during signup to enter the 48-hour verification window. Providing Professional Details and Awards & Certifications is optional.</span></li>
                                <li className="text-lg"><strong className="text-[#035A7A]">Brand Onboarding:</strong> <span className="text-gray-700">Fill out Brand Fundamentals to get immediate access to the <button onClick={handleBrandDashboardClick} className="text-blue-600 hover:underline font-normal cursor-pointer">Brand Dashboard</button> and post briefs. Personal details can be completed later.</span></li>
                                <li className="text-lg"><strong className="text-[#035A7A]">Editing Title & Profile:</strong> <span className="text-gray-700">Go to your <a href={getProtectedLink(source === 'brand' ? '/fashion-designers/profile' : '/artist-page/profile-for-artist')} className="text-blue-600 hover:underline font-normal">Profile Page</a> and click the Title Editor (<Pen className="inline w-4 h-4 mx-1" />) to update your professional headline instantly without re-initiating account verification. Use <Button isDisabled size="sm" className="h-6 min-w-min px-2 mx-1 bg-[#035A7A] text-white opacity-50 cursor-not-allowed">Add More</Button> to upload new awards or creative assets.</span></li>
                                <li className="text-lg"><strong className="text-[#035A7A]">Settings &amp; Security:</strong> <span className="text-gray-700">Manage password updates and dual-channel (Email/SMS) notification preferences under <a href={getProtectedLink(source === 'brand' ? '/fashion-designers/settings?tab=security' : '/artist-page/settings?tab=security')} className="text-blue-600 hover:underline font-normal">Settings &gt; Security</a>.</span></li>
                                <li className="text-lg"><strong className="text-[#035A7A]">Account Deletion:</strong> <span className="text-gray-700">Located under <a href={getProtectedLink(source === 'brand' ? '/fashion-designers/settings?tab=account' : '/artist-page/settings?tab=account')} className="text-blue-600 hover:underline font-normal">Settings &gt; Account</a>. Requires double-layer confirmation to prevent accidental removal and clear active contract bindings.</span></li>
                                <li className="text-lg"><strong className="text-[#035A7A]">Session Logout:</strong> <span className="text-gray-700">Located in the profile dropdown. Destroys active cookies and redirects to the <a href="/auth/login" className="text-blue-600 hover:underline font-normal">Login Page</a>.</span></li>
                            </ul>
                        </section>

                        <section id="jobs" className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-[#E5E5E5] scroll-mt-24">
                            <h2 className="text-2xl font-bold text-[#223B44] border-b pb-2 mb-5">2. Jobs Marketplace, Proposals & Hiring</h2>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                <li className="text-lg"><strong className="text-[#035A7A]">Finding & Applying for Jobs:</strong> <span className="text-gray-700">Browse briefs on the <button onClick={handleJobsMarketplaceClick} className="text-blue-600 hover:underline font-normal cursor-pointer">Jobs Marketplace</button>. Click <Button isDisabled size="sm" className="h-6 min-w-min px-2 mx-1 bg-[#035A7A] text-white opacity-50 cursor-not-allowed">Read More</Button> for details and <Button isDisabled size="sm" className="h-6 min-w-min px-2 mx-1 bg-[#035A7A] text-white opacity-50 cursor-not-allowed">Send Proposal</Button> to submit your timeline, quote, and approach. Use <Button isDisabled size="sm" className="h-6 min-w-min px-2 mx-1 bg-[#035A7A] text-white opacity-50 cursor-not-allowed">Save Job</Button> to bookmark or the Share Icon to send externally.</span></li>
                                <li className="text-lg"><strong className="text-[#035A7A]">Managing Proposals:</strong> <span className="text-gray-700">Go to <button onClick={handleMyProposalsClick} className="text-blue-600 hover:underline font-normal cursor-pointer">My Proposals</button> to select <Button isDisabled size="sm" className="h-6 min-w-min px-2 mx-1 bg-[#035A7A] text-white opacity-50 cursor-not-allowed">Edit Proposal</Button> (updates bid) or <Button isDisabled size="sm" className="h-6 min-w-min px-2 mx-1 bg-[#035A7A] text-white opacity-50 cursor-not-allowed">Withdraw Proposal</Button> (retracts application). Proposals for inactive or closed projects cannot be edited or withdrawn.</span></li>
                                <li className="text-lg"><strong className="text-[#035A7A]">Posting Projects (Brands):</strong> <span className="text-gray-700">Go to <button onClick={handlePostProjectClick} className="text-blue-600 hover:underline font-normal cursor-pointer">Post a Project</button>, enter Title, Description, Reference Images (optional), Required Skills, Style, and Timeframe, then click <Button isDisabled size="sm" className="h-6 min-w-min px-2 mx-1 bg-[#035A7A] text-white opacity-50 cursor-not-allowed">Publish</Button>. Use the <Button isDisabled size="sm" className="h-6 min-w-min px-2 mx-1 bg-[#035A7A] text-white opacity-50 cursor-not-allowed">Edit Button</Button> to adjust active listings or the <Button isDisabled size="sm" className="h-6 min-w-min px-2 mx-1 bg-[#035A7A] text-white opacity-50 cursor-not-allowed">Trash Icon</Button> to delete.</span></li>
                                <li className="text-lg"><strong className="text-[#035A7A]">Hiring Artists:</strong> <span className="text-gray-700">From <button onClick={handleMyProjectsClick} className="text-blue-600 hover:underline font-normal cursor-pointer">My Projects</button>, click <Button isDisabled size="sm" className="h-6 min-w-min px-2 mx-1 bg-[#035A7A] text-white opacity-50 cursor-not-allowed">Proposals</Button> on your listing, interview via <Button isDisabled size="sm" className="h-6 min-w-min px-2 mx-1 bg-[#035A7A] text-white opacity-50 cursor-not-allowed">Message</Button>, and click <Button isDisabled size="sm" className="h-6 min-w-min px-2 mx-1 bg-[#035A7A] text-white opacity-50 cursor-not-allowed">Hire</Button> to issue a contract and lock funds in Escrow.</span></li>
                                <li className="text-lg"><strong className="text-[#035A7A]">Contract Offer Expiration:</strong> <span className="text-gray-700">Artists have not less than 2 days to accept or decline pending offers under <button onClick={handlePendingContractsClick} className="text-blue-600 hover:underline font-normal cursor-pointer">Pending Contracts</button>. Brands can click <Button isDisabled size="sm" className="h-6 min-w-min px-2 mx-1 bg-[#035A7A] text-white opacity-50 cursor-not-allowed">Cancel</Button> to rescind an offer before acceptance.</span></li>
                            </ul>
                        </section>

                        <section id="studio" className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-[#E5E5E5] scroll-mt-24">
                            <h2 className="text-2xl font-bold text-[#223B44] border-b pb-2 mb-6">3. Studio Marketplace & Design Licensing</h2>

                            <Table aria-label="Design Licensing Tier Table" className="mb-6">
                                <TableHeader>
                                    <TableColumn className="bg-[#F0F0F0] text-[#222222] font-semibold">Licensing Tier</TableColumn>
                                    <TableColumn className="bg-[#F0F0F0] text-[#222222] font-semibold">Ownership & Scope</TableColumn>
                                    <TableColumn className="bg-[#F0F0F0] text-[#222222] font-semibold">Delivery Protocol</TableColumn>
                                </TableHeader>
                                <TableBody>
                                    <TableRow key="1">
                                        <TableCell className="font-medium">Tier 3: Non-Exclusive ("Get License")</TableCell>
                                        <TableCell className="text-gray-700">Multi-buyer commercial license; Artist retains full ownership.</TableCell>
                                        <TableCell className="text-gray-700">Stays active in catalog. Button changes to <Button isDisabled size="sm" className="h-6 min-w-min px-2 mx-1 bg-[#035A7A] text-white opacity-50 cursor-not-allowed">Download</Button> post-payment.</TableCell>
                                    </TableRow>
                                    <TableRow key="2">
                                        <TableCell className="font-medium">Tier 2: Exclusive ("Buy Exclusive")</TableCell>
                                        <TableCell className="text-gray-700">Sole commercial usage rights granted to one Brand.</TableCell>
                                        <TableCell className="text-gray-700">Delisted immediately. Marked with Crown (👑) icon. Source package and Ownership Certificate emailed automatically.</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>

                            <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                <li className="text-lg"><strong className="text-[#035A7A]">Publishing Designs:</strong> <span className="text-gray-700">Navigate to <button onClick={handleListDesignClick} className="text-blue-600 hover:underline font-normal cursor-pointer">List a Design</button>, attach backend Source Files, upload previews, set style tags, pick a licensing tier, and click <Button isDisabled size="sm" className="h-6 min-w-min px-2 mx-1 bg-[#035A7A] text-white opacity-50 cursor-not-allowed">Publish</Button> to enable DRM protection.</span></li>
                                <li className="text-lg"><strong className="text-[#035A7A]">My Collections (Brands):</strong> <span className="text-gray-700">Open <button onClick={handleMyCollectionsClick} className="text-blue-600 hover:underline font-normal cursor-pointer">My Collections</button> to access your private asset vault containing all licensed or exclusively purchased designs. Open any item to view Master Source Files, Ownership Certificates, purchase amount, and transaction dates.</span></li>
                            </ul>
                        </section>

                        <section id="workflows" className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-[#E5E5E5] scroll-mt-24">
                            <h2 className="text-2xl font-bold text-[#223B44] border-b pb-2 mb-5">4. Workflows, Retainers & Financials</h2>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                <li className="text-lg"><strong className="text-[#035A7A]">Submitting & Approving Work:</strong> <span className="text-gray-700">Artists click <Button isDisabled size="sm" className="h-6 min-w-min px-2 mx-1 bg-[#035A7A] text-white opacity-50 cursor-not-allowed">Submit Project</Button> under <button onClick={handleOngoingContractClick} className="text-blue-600 hover:underline font-normal cursor-pointer">Ongoing Contracts</button>. Brands review against Tech Packs and click <Button isDisabled size="sm" className="h-6 min-w-min px-2 mx-1 bg-[#035A7A] text-white opacity-50 cursor-not-allowed">Approve Work</Button> to release escrow funds, or <Button isDisabled size="sm" className="h-6 min-w-min px-2 mx-1 bg-[#035A7A] text-white opacity-50 cursor-not-allowed">Reject</Button> to request revisions.</span></li>
                                <li className="text-lg"><strong className="text-[#035A7A]">Deadline Extensions:</strong> <span className="text-gray-700">Click <Button isDisabled size="sm" className="h-6 min-w-min px-2 mx-1 bg-[#035A7A] text-white opacity-50 cursor-not-allowed">Request Extension</Button> on an active contract to specify a new date, reason, and optional payment offer. Confirmed free extensions update timelines immediately; paid offers prompt gateway checkout for the Brand.</span></li>
                                <li className="text-lg"><strong className="text-[#035A7A]">Retain Artist:</strong> <span className="text-gray-700">Click <Button isDisabled size="sm" className="h-6 min-w-min px-2 mx-1 bg-[#035A7A] text-white opacity-50 cursor-not-allowed">Retain Artist</Button> on a completed contract or <button onClick={handleArtistProfileClick} className="text-blue-600 hover:underline font-normal cursor-pointer">Artist Profile</button> to set up a monthly subscription model for ongoing collaboration.</span></li>
                                <li className="text-lg"><strong className="text-[#035A7A]">Payouts (Artists):</strong> <span className="text-gray-700">Go to <button onClick={(e) => handleWalletClick(e)} className="text-blue-600 hover:underline font-normal cursor-pointer">Wallet</button>, select <Button isDisabled size="sm" className="h-6 min-w-min px-2 mx-1 bg-[#035A7A] text-white opacity-50 cursor-not-allowed">Payout Details</Button> to link bank credentials, and click <Button isDisabled size="sm" className="h-6 min-w-min px-2 mx-1 bg-[#035A7A] text-white opacity-50 cursor-not-allowed">Payout</Button> to transfer funds. Track progress via <button onClick={(e) => handleWalletClick(e, 'earnings')} className="text-blue-600 hover:underline font-normal cursor-pointer">Earning History</button> and <button onClick={(e) => handleWalletClick(e, 'payouts')} className="text-blue-600 hover:underline font-normal cursor-pointer">Payout History</button>.</span></li>
                                <li className="text-lg"><strong className="text-[#035A7A]">Transaction Audits (Brands):</strong> <span className="text-gray-700">Open <button onClick={handleTransactionHistoryClick} className="text-blue-600 hover:underline font-normal cursor-pointer">Transaction History</button> to inspect unique Transaction IDs (TXN-XXXXX), timestamps, service types (Licensing, Project, Retainer, Refund), and statuses.</span></li>
                            </ul>
                        </section>

                        <section id="disputes" className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-[#E5E5E5] scroll-mt-24">
                            <h2 className="text-2xl font-bold text-[#223B44] border-b pb-2 mb-5">5. Disputes & Payment Reporting</h2>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                <li className="text-lg"><strong className="text-[#035A7A]">Filing a Dispute:</strong> <span className="text-gray-700">Click <Button isDisabled size="sm" className="h-6 min-w-min px-2 mx-1 bg-[#035A7A] text-white opacity-50 cursor-not-allowed">Report Dispute</Button> on an ongoing contract card, upload evidence, and accept the false-reporting undertaking. (Click <Button isDisabled size="sm" className="h-6 min-w-min px-2 mx-1 bg-[#035A7A] text-white opacity-50 cursor-not-allowed">Withdraw Dispute</Button> anytime if settled independently).</span></li>
                                <li className="text-lg"><strong className="text-[#035A7A]">Conciliation & Resolution:</strong> <span className="text-gray-700">Direct chat stays open for 48 hours. After 48 hours, chat locks automatically, and a Suuave Admin audits evidence to send a final binding verdict via email.</span></li>
                                <li className="text-lg"><strong className="text-[#035A7A]">Reporting Discrepancies:</strong> <span className="text-gray-700">Click <Button isDisabled size="sm" className="h-6 min-w-min px-2 mx-1 bg-[#035A7A] text-white opacity-50 cursor-not-allowed">Report Any Issue</Button> next to any item in <button onClick={(e) => handleWalletClick(e)} className="text-blue-600 hover:underline font-normal cursor-pointer">Wallet</button> or <button onClick={handleTransactionHistoryClick} className="text-blue-600 hover:underline font-normal cursor-pointer">Transaction History</button>. Attach bank receipt proof to receive a ticket code (#TKT-XXXX) targeted for resolution within 24–48 hours.</span></li>
                            </ul>
                        </section>
                    </div>
                </div>
            </main>
            {source === 'brand' ? (
                <ArtistFooter source="brand" />
            ) : source === 'artist' ? (
                <ArtistFooter source="artist" />
            ) : (
                <Footer />
            )}
        </>
    );
};

const HelpSupportPage = () => {
    return (
        <TourProvider>
            <div className="flex flex-col min-h-screen">
                <Suspense fallback={<div className="h-20 bg-[#CCE7F2] w-full" />}>
                    <HelpSupportContent />
                </Suspense>
            </div>
        </TourProvider>
    );
};

export default HelpSupportPage;
