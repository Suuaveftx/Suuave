import { Card } from "@heroui/react";
import React from "react";

const NotificationMessage = ({ title, message, time }) => {
  return (
    <Card
      className="border-b-2 w-full items-start gap-1.5 py-3.5 text-start px-2"
      radius="none"
      shadow="none"
      isPressable
    >
      <p className="font-medium">{title}</p>
      <p className="line-clamp-2">{message}</p>
      <p className="text-gray-500 text-xs  ">{time}</p>
    </Card>
  );
};

export default NotificationMessage;
