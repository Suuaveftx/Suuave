import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Badge,
} from "@heroui/react";
import { FaBell } from "react-icons/fa";
import NotificationMessage from "./NotificationMessage";

// Utility to build dynamic message
const formatNotificationMessage = (type, itemName) => {
  const boldName = <strong className="font-semibold">{itemName}</strong>;

  switch (type) {
    case "submitted":
      return <>Your project “{boldName}” has been submitted as completed.</>;
    case "declined":
      return (
        <>Your offer for “{boldName}” has been declined. Make a new offer.</>
      );
    case "accepted":
      return (
        <>
          Your offer for the design “{boldName}” has been accepted as completed.
          Proceed to make payment before offer expires.
        </>
      );
    default:
      return <>You have a new notification.</>;
  }
};

const Notification = () => {
  const notificationMessage = [
    {
      time: "2024-01-19T20:00:00.000Z",
      title: "Hi Ciara,",
      type: "submitted",
      itemName: "Casual Men Outfit (12343)",
    },
    {
      time: "2024-01-19T10:00:00.000Z",
      title: "Oops!",
      type: "declined",
      itemName: "Casual Men Outfit (12343)",
    },
    {
      time: "2024-01-18T20:00:00.000Z",
      title: "Congratulations!",
      type: "accepted",
      itemName: "Casual Men Outfit (12343)",
    },
  ];

  return (
    <Popover offset={27}>
      <Badge
        content={
          <p className="text-[10px] text-white">{notificationMessage.length}</p>
        }
        showOutline={false}
        className="h-4 w-4 bg-customDarkBlue flex"
        shape="circle"
      >
        <PopoverTrigger>
          <Button
            isIconOnly
            variant="bordered"
            radius="full"
            className="text-[#1A1A1A]"
            size="sm"
          >
            <FaBell className="w-4 h-4" />
          </Button>
        </PopoverTrigger>
      </Badge>
      <PopoverContent className="max-w-[350px] w-full max-h-[430px] overflow-y-auto">
        <div className="space-y-1">
          {notificationMessage.map((notification, index) => (
            <NotificationMessage
              key={index}
              title={notification.title}
              message={formatNotificationMessage(
                notification.type,
                notification.itemName
              )}
              time={notification.time}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Notification;
