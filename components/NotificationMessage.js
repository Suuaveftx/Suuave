import React from "react";
import PropTypes from "prop-types";

/**
 * NotificationMessage Component
 * @param {Object} props
 * @param {string} props.title - Notification title
 * @param {string} props.message - Dynamic message content
 * @param {Date|string} props.time - UTC timestamp or string
 */
const NotificationMessage = ({ title, message, time }) => {
    const formatTimeToUTC = (time) => {
        const date = new Date(time);
        return new Intl.DateTimeFormat("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
            timeZone: "UTC",
        }).format(date);
    };

    return (
        <div
            className="border-b-2 w-full rounded-t-md max-w-[350px] flex flex-col items-start gap-1.5 py-3.5 text-start px-2 hover:bg-gray-50 cursor-pointer transition-colors"
        >
            <p className="font-medium text-[#222222]">{title}</p>
            <p className="line-clamp-2 text-[#222222]">{message}</p>
            <p className="text-gray-500 text-xs">{formatTimeToUTC(time)}</p>
        </div>
    );
};

NotificationMessage.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    time: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
        .isRequired,
};

export default NotificationMessage;
