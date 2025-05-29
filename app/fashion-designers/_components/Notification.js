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

const Notification = () => {
  const notificationMessage = [
    {
      time: "2 hours ago",
      title: "Hi Ciara,",
      message:
        "Your project “Casual Men Outfit (12343)” has been submitted as completed.",
    },
    {
      time: "12 hours ago",
      title: "Oops!",
      message:
        "Your offer for “Casual Men Outfit (12343)” has been declined. Make a new offer.",
    },
    {
      time: "1 day ago",
      title: "Congratulations!",
      message:
        "Your offer for the design “Casual Men Outfit (12343)” has been accepted as completed. Proceed to make payment before offer expires.",
    },
  ];

  return (
    <>
      <Popover offset={27}>
        <Badge
          content={<p className="text-[10px]">3</p>}
          color="primary"
          showOutline={false}
          className="h-4 w-4 hidden lg:flex"
          shape="circle"
        >
          <PopoverTrigger>
            <Button
              isIconOnly
              variant="bordered"
              radius="full"
              className="text-[#1A1A1A] hidden lg:flex"
              size="sm"
            >
              {/* <Icon icon="lucide:bell" className="w-5 h-5" /> */}
              <FaBell className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
        </Badge>
        <PopoverContent className="w-[350px] max-h-[430px] overflow-y-auto ">
          <div className="space-y-1">
            {notificationMessage.map((notification, index) => (
              <NotificationMessage
                title={notification.title}
                message={notification.message}
                time={notification.time}
              />
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default Notification;
