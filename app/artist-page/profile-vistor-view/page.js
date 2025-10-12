"use client";

import Image from "next/image";
import RatingStar from "../../fashion-designers/_components/RatingStar";
import { useEffect, useMemo, useState } from "react";
import CategoryTab from "./_components/CategoryTab";

const data = [{}];

const fullText = `Sorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus. Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentesque quam a convallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Suspendisse quis arcu sem. Aenean feugiat ex eu vestibulum vestibulum. Morbi a eleifend magna. Nam metus lacus, porttitor eu mauris a, blandit ultrices nibh. Mauris sit amet magna non ligula vestibul`;

const Page = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showFull, setShowFull] = useState(false);

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
    <div className="w-full flex  items-start flex-col md:flex-row">
      {/* Profile */}
      <section className=" w-full md:w-1/3 border-x-1 border-[#EAEAEA] p-4">
        <div className="flex flex-col items-center md:items-start">
          <Image
            src="/profile-vistor-view/image-1.svg"
            alt="image"
            height={100}
            width={100}
          />
          <h1 className="text-[#4D4D4D] font-bold text-2xl">OCEAN CLARA</h1>
          <span className="flex items-center gap-1">
            <p className="font-normal text-sm text-[#37633e]">Available Now</p>
            <Image
              src="/profile-vistor-view/online-dot.svg"
              alt="icon"
              width={6}
              height={6}
            />
          </span>
          <p className="text-[#222222] font-normal text-base">
            Fashion Artist | 3D Illustrator
          </p>
          <div className="flex items-center gap-2">
            <Image
              src="\profile\locationIcon.svg"
              alt="icon"
              width={20}
              height={20}
            />
            <p className="text-[#222222] font-normal text-sm">Lagos, Nigeria</p>
          </div>
          <span className="flex items-center gap-2">
            <RatingStar />
            <p className="text-[#3A98BB] font-normal text-sm">(5 Reviews)</p>
          </span>
          <button className="w-full py-4 rounded-3xl mt-5 bg-[radial-gradient(circle,#FFFFFF,#CCE7F2)] font-bold text-base text-[#035A7A]">
            Retain Artist
          </button>
        </div>
        <div className="py-5 space-y-2 mt-10 border-[#EAEAEA] border-y-1">
          <span className="flex items-center justify-between">
            <p className="text-[#222222] font-normal text-base">
              Design Collections
            </p>
            <p className="text-base font-bold text-[#222222]">14</p>
          </span>
          <span className="flex items-center justify-between">
            <p className="text-[#222222] font-normal text-base">
              Completed Projects
            </p>
            <p className="text-base font-bold text-[#222222]">14</p>
          </span>
        </div>
        <div className="mt-10">
          <h1 className="text-[#222222] font-bold text-lg">About Me</h1>
          <span className="text-[#222222] font-normal text-sm mt-5">
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
        </div>
      </section>

      {/* Display */}

      <section className="w-full md:w-2/3 p-4 ">
        <CategoryTab />
      </section>
    </div>
  );
};

export default Page;
