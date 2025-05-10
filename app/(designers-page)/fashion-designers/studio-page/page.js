"use client";

import React from "react";
import SearchInput from "../_components/SearchInput";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Tab,
  Tabs,
} from "@heroui/react";
import { HiDotsHorizontal } from "react-icons/hi";
import ProporsalModal from "../_components/ProporsalModal";

const page = () => {
  const jobListings = [
    {
      title: "Modern Fashion Attire Illustration",
      postedDate: "23-06-2024",
      jobStatus: "Active",
      proposals: 3,
      replied: 0,
      hired: 0,
    },
    {
      title: "Modern Fashion Attire Illustration",
      postedDate: "23-06-2024",
      jobStatus: "Active",
      proposals: 4,
      replied: 3,
      hired: 4,
    },
    {
      title: "Modern Fashion Attire Illustration",
      postedDate: "23-06-2024",
      jobStatus: "Active",
      proposals: 3,
      replied: 6,
      hired: 0,
    },
    {
      title: "Modern Fashion Attire Illustration",
      postedDate: "23-06-2024",
      jobStatus: "Active",
      proposals: 7,
      replied: 2,
      hired: 1,
    },
    {
      title: "Modern Fashion Attire Illustration",
      postedDate: "23-06-2024",
      jobStatus: "Active",
      proposals: 9,
      replied: 8,
      hired: 4,
    },
  ];

  return (
    <div className="max-w-[1500px] mx-auto p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-bold text-2xl mb-1 text-[#767676]">My Job Posts</p>
          <p className="text-[#767676]">
            View all your posted jobs, both active and not active posts.
          </p>
        </div>

        <div>
          <SearchInput className="min-w-80" />
        </div>
      </div>

      <div className="w-full mt-7">
        <Tabs
          aria-label="Job post Options"
          className="w-full"
          classNames={{
            tabList:
              "gap-6 w-full relative rounded-none p-0 border-b border-divider",
            cursor: "w-full bg-[#22d3ee]",
            tab: " max-w-20 px-0 h-12",
            tabContent: "group-data-[selected=true]:text-[#06b6d4]",
          }}
          color="primary"
          variant="underlined"
        >
          <Tab key="live" title="Live" className="">
            <div className="flex flex-col gap-4 mt-10">
              {jobListings.map((item, idx) => (
                <Card radius="sm" key={idx}>
                  <CardHeader className="justify-between items-center">
                    <p className="font-bold text-lg">{item.title}</p>
                    <div className="flex items-center gap-3">
                      <ProporsalModal proposals={item.proposals} />
                      <Chip
                        className="capitalize flex items-center gap-1"
                        variant="bordered"
                      >
                        <div className="flex items-center gap-2">
                          <p className="text-gray-400">{item.replied}</p>{" "}
                          <p>replied</p>
                        </div>
                      </Chip>

                      <Chip
                        className="capitalize flex items-center gap-1"
                        variant="bordered"
                      >
                        <div className="flex items-center gap-2">
                          <p className="text-gray-400">{item.hired}</p>{" "}
                          <p>hired</p>
                        </div>
                      </Chip>
                      <Dropdown>
                        <DropdownTrigger>
                          <Button
                            isIconOnly
                            radius="full"
                            variant="bordered"
                            size="sm"
                          >
                            <HiDotsHorizontal className="size-4" />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions">
                          <DropdownItem key="edit">Edit</DropdownItem>
                          <DropdownItem key="unpublish">Unpublish</DropdownItem>
                          <DropdownItem
                            key="delete"
                            className="text-danger"
                            color="danger"
                          >
                            Delete file
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </CardHeader>
                  <CardBody className="pt-0">
                    <p className="flex items-center gap-1.5">
                      <span className="text-gray-400">Posted : </span>
                      {item.postedDate}
                    </p>
                    <p className="flex items-center text-success gap-1.5">
                      <span className="text-gray-400">Job Status : </span>
                      {item.jobStatus}
                    </p>
                  </CardBody>
                </Card>
              ))}
            </div>
          </Tab>

          {/* Second tab */}
          <Tab key="draft" title="Draft">
            <div className="flex flex-col gap-4 mt-10">
              {jobListings.slice(2).map((item, idx) => (
                <Card radius="sm" key={idx}>
                  <CardHeader className="justify-between items-center">
                    <p className="font-bold text-lg">{item.title}</p>
                    <div className="flex items-center gap-3">
                      {/* <Chip
                        className="capitalize flex items-center gap-1"
                        variant="bordered"
                      >
                        <div className="flex items-center gap-2">
                          <p className="text-customDarkBlue">
                            {item.proposals}
                          </p>{" "}
                          <p>proposals</p>
                        </div>
                      </Chip>

                      <Chip
                        className="capitalize flex items-center gap-1"
                        variant="bordered"
                      >
                        <div className="flex items-center gap-2">
                          <p className="text-gray-400">{item.replied}</p>{" "}
                          <p>replied</p>
                        </div>
                      </Chip>

                      <Chip
                        className="capitalize flex items-center gap-1"
                        variant="bordered"
                      >
                        <div className="flex items-center gap-2">
                          <p className="text-gray-400">{item.hired}</p>{" "}
                          <p>hired</p>
                        </div>
                      </Chip> */}

                      <Dropdown>
                        <DropdownTrigger>
                          <Button
                            isIconOnly
                            radius="full"
                            variant="bordered"
                            size="sm"
                          >
                            <HiDotsHorizontal className="size-4" />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions">
                          <DropdownItem key="edit">Edit</DropdownItem>
                          {/* <DropdownItem key="unpublish">Unpublish</DropdownItem> */}
                          <DropdownItem
                            key="delete"
                            className="text-danger"
                            color="danger"
                          >
                            Delete file
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </CardHeader>
                  <CardBody className="pt-0">
                    <p className="flex items-center gap-1.5">
                      <span className="text-gray-400">Posted : </span>
                      {item.postedDate}
                    </p>
                    <p className="flex items-center text-success gap-1.5">
                      <span className="text-gray-400">Job Status : </span>
                      {item.jobStatus}
                    </p>
                  </CardBody>
                </Card>
              ))}
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default page;
