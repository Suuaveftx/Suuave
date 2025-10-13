"use client";
import Image from "next/image";
import RatingStar from "../_components/RatingStar";
import { useEffect, useMemo, useState } from "react";
import {
  EditAboutMe,
  EditAward,
  EditProfile,
  EditTitle,
} from "../_components/profile/edit";

const reviews = [
  {
    id: 1,
    name: "Aliko Amin",
    rating: 4.0,
    comment:
      " squ ad litora torquent per conubia nostra, per inceptos himenaeos.Praesent auctor purus luctus enim egestas, ac scelerisque ante           pulvinar. Donec ut",
    date: "11 October, 2024",
    image: "/profile/image-2.svg",
  },
  {
    id: 2,
    name: "Aliko Amin",
    rating: 4.0,
    comment:
      " squ ad litora torquent per conubia nostra, per inceptos himenaeos.Praesent auctor purus luctus enim egestas, ac scelerisque ante           pulvinar. Donec ut",
    date: "11 October, 2024",
    image: "/profile/image-2.svg",
  },
];

const fullText = `Sorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus. Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentesque quam a convallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Suspendisse quis arcu sem. Aenean feugiat ex eu vestibulum vestibulum. Morbi a eleifend magna. Nam metus lacus, porttitor eu mauris a, blandit ultrices nibh. Mauris sit amet magna non ligula vestibul`;

const Page = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showFull, setShowFull] = useState(false);
  const [aboutValue, setAboutValue] = useState(fullText);
  const [titleValue, setTitleValue] = useState(
    "Designer/Brand"
  );
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [previewProfileUrl, setPreviewProfileUrl] = useState(null);
  const [selectedAward, setSelectedAward] = useState(null);
  const [previewAwardUrl, setPreviewAwardUrl] = useState(null);

  // Generic file handler
  const createFileHandler = (setFile, setPreviewUrl) => (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Revoke previous URL to prevent memory leaks
      setPreviewUrl((prevUrl) => {
        if (prevUrl) URL.revokeObjectURL(prevUrl);
        return URL.createObjectURL(file);
      });
      setFile(file);
    }
  };

  // Usage
  const handleFileChange = createFileHandler(
    setSelectedProfile,
    setPreviewProfileUrl
  );
  const handleAwardChange = createFileHandler(
    setSelectedAward,
    setPreviewAwardUrl
  );

  // See more initial function & logic

  useEffect(() => {
    const handleResize = () => {
      const isNowMobile = window.innerWidth < 768;
      setIsMobile(isNowMobile);
      if (!isNowMobile) setShowFull(true);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const words = useMemo(() => fullText.split(/\s+/), [fullText]);

  const displayedText = useMemo(() => {
    if (isMobile && !showFull) {
      return words.slice(0, 30).join(" ") + "...";
    }
    return fullText;
  }, [fullText, isMobile, showFull, words]);

  return (
    <div className=" md:bg-[#F1F1F1] md:px-12">
      {/* Header */}
      <div className=" md:hidden">
        <button className="flex items-center gap-3 px-4 py-2">
          <Image
            src="\collectionImage\icons\arrow-left.svg"
            alt="icon"
            width={24}
            height={24}
          />
          Profile
        </button>
      </div>
      {/* User details  */}
      <div className="mt-3 flex flex-col md:py-5 md:bg-[#F9F9F9] md:px-5 md:rounded-t-lg  md:justify-between md:mt-20 md:flex-row md:items-start md:gap-4 items-center p-4 text-[#222222] font-satoshi">
        <div className=" flex flex-col items-center md:flex-row md:items-start md:gap-3">
          <div className="flex flex-col items-end w-20 h-20 rounded-full md:w-28 md:h-28">
            <EditProfile handleFileChange={handleFileChange} />

            {/* Image Preview */}
            {previewProfileUrl ? (
              <Image
                src={previewProfileUrl}
                alt="Preview"
                width={0}
                height={0}
                className="w-full h-full rounded-full object-cover border"
              />
            ) : (
              <Image
                src="/profile/image-3.svg"
                alt="Default profile"
                className="w-full h-full rounded-full object-cover border"
                width={0}
                height={0}
              />
            )}
          </div>

          <div className=" flex flex-col items-center md:items-start ">
            <span className=" font-bold text-lg mt-1 flex items-center gap-2">
              <h1 className="text-base">OCEAN CLARA </h1>
              <Image
                src="\profile\badgeCheck.svg"
                alt="icon"
                width={20}
                height={20}
              />
            </span>
            <div className="  flex items-center gap-2">
              <p className="font-normal text-base"> {titleValue}</p>
              <EditTitle
                setTitleValue={setTitleValue}
                titleValue={titleValue}
              />
            </div>
            <div className="flex items-center gap-2  font-normal  text-sm">
              <Image
                src="\profile\locationIcon.svg"
                alt="icon"
                width={20}
                height={20}
              />{" "}
              Lagos, Nigeria
            </div>
            <div className="flex items-center gap-2 mt-1">
              <RatingStar />
              <p className="text-[#767676] font-normal text-sm">4.0</p>
              <p className="text-[#3A98BB] font-normal text-sm">(5 Reviews)</p>
            </div>
          </div>
        </div>
      </div>
      {/* Total jobs and earn */}
      <section className="flex justify-between md:px-5  md:rounded-b-lg md:py-5  md:bg-[#F9F9F9] md:mt-0 md:justify-start md:gap-10 mt-5 p-4 border-y-2 md:border-t-2 border-[#EAEAEA] font-satoshi">
        <div className="flex flex-col items-center gap-2">
          <h2 className="font-bold text-base md:text-xl">7</h2>
          <p className="text-[#767676] font-normal text-sm">Jobs Posted</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <h2 className="font-bold text-base md:text-xl">7</h2>
          <p className="text-[#767676] font-normal text-sm">
            Projects Completed
          </p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <h2 className="font-bold text-base md:text-xl">$10000</h2>
          <p className="text-[#767676] font-normal text-sm">Total Spent</p>
        </div>
      </section>
      {/* About user */}
      <section className="p-4 font-satoshi md:bg-[#F9F9F9] md:mt-10 md:py-5 md:px-5 md:rounded-t-lg ">
        <div className="flex items-start justify-between">
          <h1 className="font-bold text-base md:text-xl md:mb-8">About Me</h1>{" "}
          <EditAboutMe setAboutValue={setAboutValue} aboutValue={aboutValue} />
        </div>
        <span className="font-normal tracking-wide text-sm md:text-base text-[#222222]  mt-2">
          {displayedText}
          {isMobile && words.length > 100 && (
            <button
              onClick={() => setShowFull(!showFull)}
              className="text-[#3A98BB] mt-2"
            >
              {showFull ? "" : "Read more"}
            </button>
          )}
        </span>
      </section>
      
      {/* Reviews */}
      <section className="p-4 mt-5 font-satoshi ">
        <h1 className="font-bold text-base  md:text-xl">Reviews</h1>
        <div className="flex justify-center md:justify-start md:px-20 ">
          <div className="mt-[28px] flex flex-col items-center gap-2 bg-[#FAFAFA] border-1 border-[#E6E6E6] drop-shadow-lg rounded-lg py-4 px-6">
            <h1 className="text-[#F8B73B] font-bold text-xl">4.0/5</h1>
            <RatingStar />
            <p className="text-[#767676] font-normal text-base ">
              15 Verified Ratings
            </p>
          </div>
        </div>
        <div className="mt-7 space-y-5 md:space-y-1">
          {reviews.map((review) => (
            <div
              key={review.id}
              className=" flex items-start gap-3 md:w-[60%] md:p-5 md:bg-[#F9F9F9]"
            >
              <Image
                src="\profile\image-2.svg"
                alt="image"
                className="w-[42px] h-[42px] md:w-[70px] md:h-[70px]"
                width={0}
                height={0}
              />
              <div className="space-y-2">
                <h1 className="font-bold text-base md:text-xl tracking-wide">
                  {review.name}
                </h1>
                <span className="flex items-center">
                  Ratings
                  <RatingStar />
                </span>
                <p className="text-[#222222] font-normal text-base">
                  {" "}
                  {review.comment}{" "}
                </p>
                <p className="mt-10 text-[#727272] font-normal text-sm">
                  {review.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Page;
