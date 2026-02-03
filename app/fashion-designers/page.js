"use client";

import { Alert, Chip, Input, Tab, Tabs } from "@heroui/react";
import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import FashionDesignersCard from "./_components/studio-page-components/FashionDesignersCard";
import FloatingButton from "./_components/FloatingButton";

const Page = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [savedCardIds, setSavedCardIds] = useState([]);

  const toggleSave = (id) => {
    setSavedCardIds((prev) =>
      prev.includes(id) ? prev.filter((cardId) => cardId !== id) : [...prev, id]
    );
  };

  const cardsData = [
    {
      id: "card-1",
      user: {
        id: "user-1",
        userName: "Amira Bashir",
        photo: "userImg",
        handle: "@amirabash",
        description: "Textile alchemist, silhouette enthusiast 👗✨",
        followers: 45800,
        following: 124,
      },
      title: "Flowy linen sets for summer brunch elegance",
      price: 128000,
      images: ["/dev-images/fashionImg1.png"],
    },
    {
      id: "card-2",
      user: {
        id: "user-2",
        userName: "Leo Tang",
        photo: "userImg",
        handle: "@leotang",
        description: "Menswear visionary — structure meets soul 🧵 he/him",
        followers: 89200,
        following: 312,
      },
      title: "Tailored modern suits inspired by Tokyo streetwear",
      price: 265000,
      images: [
        "/dev-images/fashionImg1.png",
        "/dev-images/fashionImg2.png",
        "/dev-images/fashionImg3.png",
      ],
    },
    {
      id: "card-3",
      user: {
        id: "user-3",
        userName: "Tega Isama",
        photo: "userImg",
        handle: "@tega",
        description: "Fashion designer, fabric whisperer ✂️ she/her ✨",
        followers: 97100,
        following: 7,
      },
      title: "Experimental silhouettes with a minimalist heart",
      price: 34034000,
      images: ["/dev-images/fashionImg1.png"],
    },
    {
      id: "card-4",
      user: {
        id: "user-4",
        userName: "Kai Nwosu",
        photo: "userImg",
        handle: "@kai_nwosu",
        description: "Couture meets culture, Lagos born 🪡🌍",
        followers: 60200,
        following: 98,
      },
      title: "Ankara-inspired gowns with futuristic detailing",
      price: 487500,
      images: [
        "/dev-images/fashionImg1.png",
        "/dev-images/fashionImg2.png",
        "/dev-images/fashionImg3.png",
      ],
    },
    {
      id: "card-5",
      user: {
        id: "user-5",
        userName: "Yuna Lee",
        photo: "userImg",
        handle: "@yunalee.studio",
        description: "Soft tailoring & fluid forms 🌸 she/her",
        followers: 120900,
        following: 43,
      },
      title: "Spring drop: silk layers & modular design",
      price: 219900,
      images: [
        "/dev-images/fashionImg1.png",
        "/dev-images/fashionImg2.png",
        "/dev-images/fashionImg3.png",
      ],
    },
    {
      id: "card-6",
      user: {
        id: "user-6",
        userName: "Obadea Isama",
        photo: "userImg",
        handle: "@isama",
        description: "Modern textures. Timeless cuts. ✂️ she/her ✨",
        followers: 97100,
        following: 7,
      },
      title: "Draped elegance with a bold color story",
      price: 187000,
      images: [
        "/dev-images/fashionImg1.png",
        "/dev-images/fashionImg2.png",
        "/dev-images/fashionImg3.png",
      ],
    },
    {
      id: "card-7",
      user: {
        id: "user-7",
        userName: "Nico Arora",
        photo: "userImg",
        handle: "@nico.designs",
        description: "Eco-fashion crusader 🌱✂️ he/they",
        followers: 42200,
        following: 214,
      },
      title: "Recycled denim reinvented into high-street staples",
      price: 142300,
      images: ["/dev-images/fashionImg1.png", "/dev-images/fashionImg2.png"],
    },
    {
      id: "card-8",
      user: {
        id: "user-8",
        userName: "Zoé Marchand",
        photo: "userImg",
        handle: "@zoemarchand",
        description: "Paris-based romanticism in ready-to-wear 🥀 she/her",
        followers: 110500,
        following: 89,
      },
      title: "Sheer layers and lace — dreamy yet grounded",
      price: 398000,
      images: ["/dev-images/fashionImg1.png", "/dev-images/fashionImg3.png"],
    },
    {
      id: "card-9",
      user: {
        id: "user-9",
        userName: "Luca Bianchi",
        photo: "userImg",
        handle: "@bianchi.studio",
        description: "Geometry meets glamor. 🇮🇹🧷 he/him",
        followers: 88000,
        following: 51,
      },
      title: "Architectural cuts blended with silk and shimmer",
      price: 504500,
      images: ["/dev-images/fashionImg1.png", "/dev-images/fashionImg2.png"],
    },
    {
      id: "card-10",
      user: {
        id: "user-10",
        userName: "Nyah Okeke",
        photo: "userImg",
        handle: "@nyah.okeke",
        description: "Bold prints, bolder stories 🎨 she/her",
        followers: 75000,
        following: 60,
      },
      title: "Statement pieces with Afro-urban narratives",
      price: 298700,
      images: ["/dev-images/fashionImg2.png", "/dev-images/fashionImg3.png"],
    },
    {
      id: "card-11",
      user: {
        id: "user-11",
        userName: "Nyah Okeke",
        photo: "userImg",
        handle: "@nyah.okeke",
        description: "Bold prints, bolder stories 🎨 she/her",
        followers: 75000,
        following: 60,
      },
      title: "Statement pieces with Afro-urban narratives",
      price: 298700,
      images: ["/dev-images/fashionImg2.png", "/dev-images/fashionImg3.png"],
    },
  ];

  return (
    <div className=" lg:px-14 px-4 pt-7 font-satoshi mb-48">
      <Alert
        // color="secondary"
        isVisible={isVisible}
        title={
          <p className="font-normal">
            You have{" "}
            <span className="font-semibold text-[#73D9FF] cursor-pointer">
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
            key="recent"
            title={<p className="flex items-center space-x-2">Recently</p>}
          >
            <div className="grid grid-cols-2 gap-3 mt-6 lg:gap-6 lg:grid-cols-4  ">
              {cardsData.map((card, index) => (
                <FashionDesignersCard
                  key={index}
                  images={card?.images}
                  title={card?.title}
                  price={card?.price}
                  userName={card?.user.userName}
                  productID={card?.id}
                  idx={index}
                  userData={card.user}
                  isBookmarked={savedCardIds.includes(card.id)}
                  onToggleSave={() => toggleSave(card.id)}
                />
              ))}
            </div>
          </Tab>

          <Tab
            key="saved"
            title={
              <div className="flex items-center space-x-2">
                <span>Saved ({savedCardIds.length})</span>
              </div>
            }
          >
            <div className="grid grid-cols-2 gap-3 mt-6 lg:gap-6 lg:grid-cols-4  ">
              {cardsData.filter(card => savedCardIds.includes(card.id)).map((card, index) => (
                <FashionDesignersCard
                  key={index}
                  images={card?.images}
                  title={card?.title}
                  price={card?.price}
                  userName={card?.user.userName}
                  productID={card?.id}
                  idx={index}
                  userData={card.user}
                  isBookmarked={true}
                  onToggleSave={() => toggleSave(card.id)}
                />
              ))}
            </div>
          </Tab>
        </Tabs>
      </div>
      <FloatingButton />
    </div>
  );
};

export default Page;
