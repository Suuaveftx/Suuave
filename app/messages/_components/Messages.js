"use client";

import Image from "next/image";
import React, { useState } from "react";
import CustomButton from "../../../components/CustomButton";
import SearchBar from "../../../components/Searchbar";
import {Textarea} from "@heroui/react";

const Messages = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [newMessage, setNewMessage] = useState("");

  const [chats, setChats] = useState([
    {
      id: 1,
      name: "Tolu",
      message: "Modern Fashion Attire Illustration",
      unread: false,
      img: "/dev-images/Avatar.png",
    },
    {
      id: 2,
      name: "Tolu",
      message: "Modern Fashion Attire Illustration",
      unread: true,
      img: "/dev-images/red.png",
    },
    {
      id: 3,
      name: "Tolu",
      message: "Modern Fashion Attire Illustration",
      unread: false,
      img: "/dev-images/Avatar.png",
    },
    {
      id: 4,
      name: "Tolu",
      message: "Modern Fashion Attire Illustration",
      unread: true,
      img: "/dev-images/red.png",
    },
    {
      id: 5,
      name: "Tolu",
      message: "Modern Fashion Attire Illustration",
      unread: false,
      img: "/dev-images/Avatar.png",
    },
  ]);

  const filteredChats =
    selectedTab === "unread" ? chats.filter((chat) => chat.unread) : chats;

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      console.log("Message Sent:", newMessage);
      setNewMessage("");
    }
  };

  return (
    <>
    <h1 className="font-bold text-2xl border-b ml-8">Messages</h1>
    <div className="flex h-screen  gap-4">
      {/* Sidebar */}
      <div className="w-1/4 h-[500px] ml-8 mt-8 bg-white p-4 border-r shadow-lg rounded-lg">
        {/* Search Bar */}

       <SearchBar placeholder="Search chats" className="w-" width="w-54" />
        {/* Tabs */}
        <div className="flex space-x-4 mb-4">
  <button
    className={`flex-1 py-2 rounded-lg relative ${
      selectedTab === "all" ? "text-[#3A98BB] font-semibold" : "text-gray-600"
    }`}
    onClick={() => setSelectedTab("all")}
  >
    All
    {selectedTab === "all" && (
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#3A98BB]"></div>
    )}
  </button>
  <button
    className={`flex-1 py-2 rounded-lg relative ${
      selectedTab === "unread" ? "text-green-500 font-semibold" : "text-gray-600"
    }`}
    onClick={() => setSelectedTab("unread")}
  >
    Unread
    {selectedTab === "unread" && (
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-green-500"></div>
    )}
  </button>
</div>


        {/* Chat List */}
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            className={`flex items-center p-2 rounded-lg cursor-pointer whitespace-nowrap border-b ${
              chat.unread ? "bg-gray-100" : ""
            } hover:bg-gray-200`}
          >
            <Image
              src={chat.img}
              alt={chat.name}
              className="w-12 h-12 rounded-full mr-3"
              width={45}
              height={45}
            />
            <div>
              <h4 className="text-gray-800 font-semibold">{chat.name}</h4>
              <p className="text-gray-500 text-xs">{chat.message}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Section */}
      <div className="flex flex-col w-9/12 h-[494px] bg-gray-100 mt-8 mr-8 rounded-md border-1 border-[#D3D3D3]">
        {/* Chat Header */}
        <div className="bg-white p-4 ml-8 mr-8 mt-4 border-b shadow-md rounded-md text-center font-bold ">
          <h2 className="text-lg border-b">Tolu Isioma</h2>
          <div className="mt-2">
          <span className=" text-[#878787]">Modern Fashion Attire Illustration <span className="text-[#3A98BB]">(24t64754)</span></span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1  p-4 space-y-2">
          <div className="bg-[#CCE7F2] p-2  rounded-md text-[#222222] self-start w-96 ml-auto whitespace-nowrap text-xs">
            <div className=" flex gap-2 justify-end font-bold">
          <h4>Tolu</h4>
          <span className="text-[#767676]"> 2 days ago</span>
          </div>
          Can you adjust te length of the whatever whatever to fit with the collar <br/> Can you adjust te length of the whatever whatever to fit with the colla
          </div>
          <div className="bg-[#CCE7F2] p-2 max-w-xs rounded-md text-[#222222] text-xs self-start w-4/5 ml-auto">
          <div className=" flex gap-2 justify-end font-bold">
          <h4>Tolu</h4>
          <span className="text-[#767676]"> 2 days ago</span>
          </div>
          Can you adjust te length of the whatever whatever to 
          </div>
          <div className="bg-[#EAEAEAEE] p-2 w-3/5 rounded-lg text-[#222222] text-xs self-end mr-auto">
          <div className=" flex gap-2 justify-start font-bold">
          <h4>Ciana</h4>
          <span className="text-[#767676]"> 2 days ago</span>
          </div>
          Can you adjust te length of the whatever whatever to fit with the collar <br/> Can you adjust te length of the whatever whatever to fit with the colla
          </div>
        </div>

        {/* Message Input */}
        <div className="bg-white h-32 ml-4 mr-4 pl-4 pr-4 pt-2 pb-2 border-t  rounded-md flex flex-col justify-between">
        
        <textarea
  className="w-full h-64 !bg-white !text-black outline-none"
  placeholder="type message..."
  
/>
          <div className="flex  items-center justify-between w-full">
            <div className="flex gap-2">
              <Image src="/dev-images/smile.png" alt="smile" width={15} height={15} />
              <Image src="/dev-images/Attach3.png" alt="attachment" width={15} height={15} />
              <Image src="/dev-images/Picture.png" alt="picture" width={15} height={15} />
              <Image src="/dev-images/Mic.png" alt="microphone" width={15} height={15} />
            </div>
            <CustomButton text="Send" className="bg-[#CCE7F2] text-[#222222]" icon={<Image src="/dev-images/Arrowside.png" alt="arrow" width={15} height={15} />} />
            </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Messages;
