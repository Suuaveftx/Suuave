"use client";

import { Alert, Chip, Input, Tab, Tabs } from "@heroui/react";
import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
// import imageUrl from "/dev-images/fashionImg1.png";
import FashionDesignersCard from "./_components/FashionDesignersCard";
import Footer from "../../landingpage/_components/Footer";

const Page = () => {
  const [isVisible, setIsVisible] = useState(true);

  const cardsData = [
    {
      id: crypto.randomUUID(),
      author: "Tega Isama",
      title: "Modern Style Dress",
      description:
        "Description of style by the illustrator and everything about it!",
      price: "$340",
      imageUrl: "/dev-images/fashionImg1.png",
    },
    {
      id: crypto.randomUUID(),
      author: "Tega Isama",
      title: "Modern Style Dress",
      description:
        "Description of style by the illustrator and everything about it! Description of style by the illustrator and everything about it! Description of style by the illustrator and everything about it!",
      price: "$340",
      imageUrl: "/dev-images/fashionImg1.png",
    },
    {
      id: crypto.randomUUID(),
      author: "Tega Isama",
      title: "Modern Style Dress",
      description:
        "Description of style by the illustrator and everything about it!",
      price: "$340",
      imageUrl: "/dev-images/fashionImg1.png",
    },
    {
      id: crypto.randomUUID(),
      author: "Tega Isama",
      title: "Modern Style Dress",
      description:
        "Description of style by the illustrator and everything about it!",
      price: "$340",
      imageUrl: "/dev-images/fashionImg1.png",
    },
    {
      id: crypto.randomUUID(),
      author: "Tega Isama",
      title: "Modern Style Dress",
      description:
        "Description of style by the illustrator and everything about it!",
      price: "$340",
      imageUrl: "/dev-images/fashionImg1.png",
    },
    {
      id: crypto.randomUUID(),
      author: "Tega Isama",
      title: "Modern Style Dress",
      description:
        "Description of style by the illustrator and everything about it!",
      price: "$340",
      imageUrl: "/dev-images/fashionImg1.png",
    },
    {
      id: crypto.randomUUID(),
      author: "Tega Isama",
      title: "Modern Style Dress",
      description:
        "Description of style by the illustrator and everything about it!",
      price: "$340",
      imageUrl: "/dev-images/fashionImg1.png",
    },
    {
      id: crypto.randomUUID(),
      author: "Tega Isama",
      title: "Modern Style Dress",
      description:
        "Description of style by the illustrator and everything about it!",
      price: "$340",
      imageUrl: "/dev-images/fashionImg1.png",
    },
    {
      id: crypto.randomUUID(),
      author: "Tega Isama",
      title: "Modern Style Dress",
      description:
        "Description of style by the illustrator and everything about it!",
      price: "$340",
      imageUrl: "/dev-images/fashionImg1.png",
    },
    {
      id: crypto.randomUUID(),
      author: "Tega Isama",
      title: "Modern Style Dress",
      description:
        "Description of style by the illustrator and everything about it!",
      price: "$340",
      imageUrl: "/dev-images/fashionImg1.png",
    },
    {
      id: crypto.randomUUID(),
      author: "Tega Isama",
      title: "Modern Style Dress",
      description:
        "Description of style by the illustrator and everything about it!",
      price: "$340",
      imageUrl: "/dev-images/fashionImg1.png",
    },
    {
      id: crypto.randomUUID(),
      author: "Tega Isama",
      title: "Modern Style Dress",
      description:
        "Description of style by the illustrator and everything about it!",
      price: "$340",
      imageUrl: "/dev-images/fashionImg1.png",
    },
  ];

  return (
    <div className=" lg:px-14 px-4 pt-7 font-satoshi">
      <Alert
        // color="secondary"
        isVisible={isVisible}
        title={
          <p className="font-normal">
            You have{" "}
            <span className="font-semibold text-[#73D9FF]">
              1 Project Submission
            </span>
          </p>
        }
        variant="faded"
        onClose={() => setIsVisible(false)}
        closeButtonProps={{
          className: "place-self-center items-center",
        }}
        classNames={{
          mainWrapper: " ",
          closeButton: "relative top-1",
          alertIcon: "fill-[#73D9FF]",
        }}
        className="border-[#73D9FF] bg-[#EBFAFF] font-satoshi"
      />

      <div
        style={{
          background: "url('/dev-images/fashionHeaderImg.png')",
          backgroundSize: "cover", // Ensures the image covers the entire div
          backgroundPosition: "center", // Centers the image
          backgroundRepeat: "no-repeat", // Prevents repeating
        }}
        className="lg:h-[300px] h-[110px] w-full font-satoshi rounded-lg mt-10 text-white flex flex-col items-center justify-center"
      >
        <h2
          className="lg:text-[52px] text-xl font-semibold lg:mb-9
          "
        >
          {" "}
          Explore Hundreds of Creative Designs
        </h2>
        <p className="lg:text-[22px] text-sm font-thin">
          Get licensing access for your brand and collections.
        </p>
      </div>
      <Input
        startContent={<IoSearchOutline className="size-5" />}
        placeholder="Search"
        radius="full"
        className="lg:w-[40%]  mt-10 w-full"
        classNames={{ inputWrapper: "shadow-lg py-6" }}
        variant="bordered"
      />

      {/* taba */}
      <div className="flex w-full flex-col mt-7">
        <Tabs
          aria-label="Options"
          classNames={{
            tabList:
              "gap-6 w-full relative rounded-none p-0 border-b border-divider",
            cursor: "w-full bg-[#22d3ee]",
            tab: "max-w-fit px-0 h-12",
            tabContent: "group-data-[selected=true]:text-[#06b6d4]",
          }}
          color="primary"
          variant="underlined"
        >
          <Tab
            key="photos"
            title={
              <p className="flex items-center space-x-2">Recently Posted</p>
            }
          >
            <div className="grid grid-cols-2 gap-3 mt-6 lg:gap-6 lg:grid-cols-4  ">
              {cardsData.map((card, index) => (
                <FashionDesignersCard
                  key={index}
                  image={card.imageUrl}
                  title={card.title}
                  price={card.price}
                  userName={card.author}
                  description={card.description}
                  productID={card.id}
                  idx={index}
                />
              ))}
            </div>
          </Tab>

          <Tab
            key="videos"
            title={
              <div className="flex items-center space-x-2">
                <span>Saved Posts</span>
                <Chip size="sm" variant="faded">
                  6
                </Chip>
              </div>
            }
          >
            <div className="grid grid-cols-2 gap-3 mt-6 lg:gap-6 lg:grid-cols-4  ">
              {cardsData.slice(0, 6).map((card, index) => (
                <FashionDesignersCard
                  key={index}
                  image={card.imageUrl}
                  title={card.title}
                  price={card.price}
                  userName={card.author}
                  description={card.description}
                  productID={card.id}
                  idx={index}
                />
              ))}
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;
