/**
 * Data-driven configuration for the Fashion Brand Platform product tour.
 * Each step targets a DOM element via a `data-tour` attribute.
 */
export const tourSteps = [
    {
        id: 'navigation',
        target: "[data-tour='navigation']",
        title: 'Navigation Menu',
        description:
            'Use the main header links to view ready-to-license designs, your projects, your collections, and active contracts.',
        placement: 'bottom',
    },
    {
        id: 'messages',
        target: "[data-tour='messages']",
        title: 'Messages',
        description:
            'Use the message icon in the header to review direct messages and artist inquiries instantly.',
        placement: 'bottom',
    },
    {
        id: 'notifications',
        target: "[data-tour='notifications']",
        title: 'Notifications',
        description:
            'Check your notification bell icon to track artist responses, proposal updates, and system alerts.',
        placement: 'bottom',
    },
    {
        id: 'manage-account',
        target: "[data-tour='profile-avatar']",
        title: 'Manage Your Account',
        description:
            'Click your profile picture avatar to update your brand profile, review transaction history, or adjust settings.',
        placement: 'bottom-end',
    },
    {
        id: 'discover-designs',
        target: "[data-tour='discover-designs']",
        title: 'Discover Designs',
        description:
            'Browse high-quality creative assets in the Studio and filter by license type for your brand.',
        placement: 'bottom',
    },
    {
        id: 'manage-projects',
        target: "[data-tour='manage-projects']",
        title: 'Manage Projects',
        description:
            'Monitor your posted project briefs, review artist submissions, and manage ongoing creative requests in one place.',
        placement: 'bottom',
    },
    {
        id: 'manage-contracts',
        target: "[data-tour='manage-contracts']",
        title: 'Manage Contracts',
        description:
            'Monitor your multi-phase production agreements and oversee secure milestones through our escrow-protected system.',
        placement: 'bottom',
    },
    {
        id: 'manage-collections',
        target: "[data-tour='manage-collections']",
        title: 'Manage Collections',
        description:
            'Explore the archive of every creative asset you have successfully licensed.',
        placement: 'bottom',
        isFinal: true,
    },
];

/**
 * Mobile-specific tour steps.
 * Swapped out dynamically if the viewport is below the mobile breakpoint.
 */
export const mobileTourSteps = [
    {
        id: 'mobile-messages',
        target: "[data-tour-mobile='mobile-messages']",
        title: 'Messages',
        description:
            'Use the message icon in the header to review direct messages and artist inquiries instantly.',
        placement: 'bottom',
        device: 'mobile',
    },
    {
        id: 'mobile-notifications',
        target: "[data-tour-mobile='mobile-notifications']",
        title: 'Notifications',
        description:
            'Check your notification bell icon to track artist responses, proposal updates, and system alerts.',
        placement: 'bottom',
        device: 'mobile',
    },
    {
        id: 'mobile-manage-account',
        target: "[data-tour-mobile='mobile-profile-avatar']",
        title: 'Manage Your Account',
        description:
            'Click your profile picture avatar to update your brand profile, review transaction history, or adjust settings.',
        placement: 'bottom',
        device: 'mobile',
    },
    {
        id: 'mobile-open-navigation',
        target: "[data-tour-mobile='mobile-navigation']",
        title: 'Open Navigation',
        description:
            'Tap the hamburger menu icon to view ready-to-license designs, your projects, your collections, and active contracts.',
        placement: 'bottom',
        device: 'mobile',
    },
    {
        id: 'mobile-discover-designs',
        target: "[data-tour-mobile='mobile-discover-designs']",
        title: 'Discover Designs',
        description:
            'Browse high-quality creative assets in the Studio and filter by license type for your brand.',
        placement: 'top',
        device: 'mobile',
    },
    {
        id: 'mobile-manage-projects',
        target: "[data-tour-mobile='mobile-manage-projects']",
        title: 'Manage Projects',
        description:
            'Monitor your posted project briefs, review artist submissions, and manage ongoing creative requests in one place.',
        placement: 'bottom',
        device: 'mobile',
    },
    {
        id: 'mobile-manage-contracts',
        target: "[data-tour-mobile='mobile-manage-contracts']",
        title: 'Manage Contracts',
        description:
            'Monitor your multi-phase production agreements and oversee secure milestones through our escrow-protected system.',
        placement: 'bottom',
        device: 'mobile',
    },
    {
        id: 'mobile-manage-collections',
        target: "[data-tour-mobile='mobile-manage-collections']",
        title: 'Manage Collections',
        description:
            'Explore the archive of every creative asset you have successfully licensed.',
        placement: 'bottom',
        device: 'mobile',
        isFinal: true,
    },
];

/**
 * Fashion Artist desktop tour steps.
 */
export const artistDesktopTourSteps = [
    {
        id: 'artist-navigation',
        target: "[data-tour='artist-navigation']",
        title: 'Navigation Menu',
        description:
            'Use the main header links to quickly jump between your active projects, bids, and dashboard sections.',
        placement: 'bottom',
        device: 'desktop',
    },
    {
        id: 'artist-messages',
        target: "[data-tour='artist-messages']",
        title: 'Messages',
        description:
            'Use the message icon in the header to view direct client chats and manage your conversations instantly.',
        placement: 'bottom',
        device: 'desktop',
    },
    {
        id: 'artist-notifications',
        target: "[data-tour='artist-notifications']",
        title: 'Notifications',
        description:
            'Check your notification bell icon to monitor live updates, proposal feedback, and system alerts.',
        placement: 'bottom',
        device: 'desktop',
    },
    {
        id: 'artist-account',
        target: "[data-tour='artist-account']",
        title: 'Manage Your Account',
        description:
            'Click your profile picture avatar to access your profile details, wallet, settings, or support.',
        placement: 'bottom',
        device: 'desktop',
    },
    {
        id: 'artist-opportunities',
        target: "[data-tour='artist-opportunities'], [data-tour='artist-opportunities-nav']",
        title: 'Find Job Opportunities',
        description:
            'Browse active project briefs across the platform and filter by your specific fashion expertise.',
        placement: 'bottom',
        device: 'desktop',
    },
    {
        id: 'artist-proposals',
        target: "[data-tour='artist-proposals'], [data-tour='artist-proposals-nav']",
        title: 'Track Your Proposals',
        description:
            'Monitor the status of your proposal submissions, bids, and client updates in real time.',
        placement: 'bottom',
        device: 'desktop',
    },
    {
        id: 'artist-contracts',
        target: "[data-tour='artist-contracts'], [data-tour='artist-contracts-nav']",
        title: 'Manage Contracts',
        description:
            'Track your active production milestones, review binding terms, and deliver approved assets upon completion.',
        placement: 'bottom',
        device: 'desktop',
    },
];

/**
 * Fashion Artist mobile tour steps.
 */
export const artistMobileTourSteps = [
    {
        id: "artist-mobile-messages",
        target: "#artist-mobile-messages-tour",
        title: "Messages",
        description:
            "Use the message icon in the header to view direct client chats and manage your conversations instantly.",
        placement: "bottom",
        device: "mobile",
    },
    {
        id: "artist-mobile-notifications",
        target: "#artist-mobile-notifications-tour",
        title: "Notifications",
        description:
            "Check your notification bell icon to monitor live updates, proposal feedback, and system alerts.",
        placement: "bottom",
        device: "mobile",
    },
    {
        id: "artist-mobile-account",
        target: "#artist-mobile-account-tour",
        title: "Manage Your Account",
        description:
            "Click your profile picture avatar to access your profile details, wallet, settings, or support.",
        placement: "bottom-end",
        device: "mobile",
    },
    {
        id: "artist-mobile-navigation",
        target: "#artist-mobile-navigation-tour",
        title: "Open Navigation",
        description:
            "Tap the hamburger menu icon to access your core workspace links, projects, and options.",
        placement: "bottom-start",
        device: "mobile",
    },
    {
        id: "artist-mobile-opportunities",
        target: "#artist-mobile-opportunities-tour, #artist-mobile-opportunities-nav",
        title: "Find Job Opportunities",
        description:
            "Browse active project briefs across the platform and filter by your specific fashion expertise.",
        placement: "top",
        device: "mobile",
    },
    {
        id: "artist-mobile-proposals",
        target: "#artist-mobile-proposals-tour, #artist-mobile-proposals-nav",
        title: "Track Your Proposals",
        description:
            "Monitor the status of your proposal submissions, bids, and client updates in real time.",
        placement: "top",
        device: "mobile",
    },
    {
        id: "artist-mobile-contracts",
        target: "#artist-mobile-contracts-tour, #artist-mobile-contracts-nav",
        title: "Manage Contracts",
        description:
            "Track your active production milestones, review binding terms, and deliver approved assets upon completion.",
        placement: "top",
        device: "mobile",
    },
];
