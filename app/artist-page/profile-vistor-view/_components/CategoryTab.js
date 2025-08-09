"use client";

import { Tabs, Tab, Card, CardBody } from "@heroui/react";
import Image from "next/image";

const collectionsData = [
  {
    image: "/profile-vistor-view/image-2.svg",
    tittle: "Casual Top Design",
    Licensed: 10,
    price: 299,
  },
  {
    image: "/profile-vistor-view/image-2.svg",
    tittle: "Casual Top Design",
    Licensed: 10,
    price: 299,
  },
  {
    image: "/profile-vistor-view/image-2.svg",
    tittle: "Casual Top Design",
    Licensed: 10,
    price: 299,
  },
  {
    image: "/profile-vistor-view/image-2.svg",
    tittle: "Casual Top Design",
    Licensed: 10,
    price: 299,
  },
  {
    image: "/profile-vistor-view/image-2.svg",
    tittle: "Casual Top Design",
    Licensed: 10,
    price: 299,
  },
];

export default function CategoryTab() {
  return (
    <div className="flex w-full flex-col">
      <Tabs
        radius="none"
        classNames={{
          tabList: "bg-transparent shadow-none",
          tab: "group data-[selected=true]:bg-[#035A7A] rounded-none",
          tabContent: "group-data-[selected=true]:!text-white ",
        }}
      >
        <Tab key="Design Collections" title="Design Collections">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 border-[#EAEAEA] border-t-1 py-5">
            {collectionsData.map((item, index) => (
              <div
                style={{
                  backgroundImage: `url(${item.image})`,
                }}
                className=" bg-cover bg-center h-[200px] flex flex-col justify-between md:justify-end rounded-md "
                key={index}
              >
                <div className="flex items-center justify-between md:hidden w-full py-5">
                  <span className="bg-black/40 backdrop-blur-sm flex  rounded-sm p-1 items-center gap-1 md:hidden">
                    <Image
                      src="/profile-vistor-view/eyeIcon.svg"
                      alt="icon"
                      width={19}
                      height={19}
                    />
                    <p className="font-medium text-xs text-[#F2F2F2]">
                      {item.Licensed}
                    </p>
                  </span>
                  <span className="bg-black/40 backdrop-blur-sm flex cursor-pointer  rounded-sm p-1 items-center gap-1 md:hidden">
                    <Image
                      src="/profile-vistor-view/dot.svg"
                      alt="icon"
                      width={19}
                      height={19}
                    />
                  </span>
                </div>

                <span className="flex flex-col md:flex-row justify-between bg-[#FFFFFF] text-[#222222]  p-2 md:bg-black/40 md:backdrop-blur-sm rounded-b-md  md:text-[#F2F2F2] font-bold text-sm">
                  <span>
                    <p>{item.tittle}</p>
                    <span className=" font-normal hidden md:flex">
                      <p>Licensed :</p>
                      <p>{item.Licensed} </p>
                    </span>
                  </span>
                  <p className="font-normal">${item.price}</p>
                </span>
              </div>
            ))}
          </div>
        </Tab>

        <Tab key="Work Samples" title="Work Samples">
          <div>hello</div>
        </Tab>

        <Tab key="Awards / Certificates" title="Awards / Certificates">
          <div>hello</div>
        </Tab>

        <Tab key="Reviews" title="Reviews">
          <div>hello</div>
        </Tab>
      </Tabs>
    </div>
  );
}
