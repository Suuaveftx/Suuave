import Image from "next/image";
import { FaLinkedin } from "react-icons/fa";

const TeamSection = () => {
  const teamMembers = [
    {
      name: "IBRAHIM HAMZAT O.",
      title: "Founder & CEO",
      details: "Business/Data Analyst, Copywriter & Researcher",
      imageSrc: "/team/two.jpg",
      linkedinUrl: "https://www.linkedin.com/in/ibrahim-hamzat-222186b8",
    },
    {
      name: "CHINEDU J. OZULU",
      title: "Co-founder & COO",
      details: "Product Designer and Web Developer",
      imageSrc: "/team/chinedu.png",
      linkedinUrl: "https://www.linkedin.com/in/chinedu-ozulu-2898a4170",
    },
    {
      name: "WISDOM LAMODOT",
      title: "Co-founder & CTO",
      details: "Full Stack Developer",
      imageSrc: "/team/lamodots.JPG",
      linkedinUrl: "https://www.linkedin.com/in/lamodot",
    },
    {
      name: "IDIAT SHIOLE",
      title: "Quality Assurance Advisor (QAA)",
      details:
        "3D Visual Designer/ XR Advocate/UK Global Talent. Founder, Hadeeart Ateller",
      imageSrc: "/team/four.jpg",
      linkedinUrl: "https://www.linkedin.com/in/hadeeart",
    },
    // {
    //   name: "ABDULRAHMAN AMINU",
    //   title: "Software Engineer",
    //   details: "Software Engineer and Electrical & Electronics Engineer",
    //   // imageSrc: "",
    //   linkedinUrl: "https://www.linkedin.com/in/abdulrahman-aminu-b648041ba",
    // },
    // {
    //   name: "ENANG ETI-ABASI",
    //   title: "Software Engineer",
    //   details: "Software Engineer and Electrical & Electronics Engineer",
    //   // imageSrc: "",
    //   linkedinUrl: "https://www.linkedin.com/in/divine-asuquo/",
    // },
  ];

  return (
    <section className="px-4 pt-[115.5px] lg:px-[160px] xl:px-[216px] bg-white font-proximanova">
        <h2 className="text-2xl text-center lg:text-4xl xl:text-5xl font-bold text-[#222222] mb-2">
          MEET OUR TEAM
        </h2>
        <p className="text-center text-[#767676] text-base mb-8">
          A diverse collective of passionate individuals united by a
          <br />
          shared mission and vision
        </p>
        <div className=" grid grid-cols-2  lg:grid-cols-3 gap-[19px] lg:gap-x-12 lg:gap-y-[58.75px] xl:gap-[70px] pt-[103.75px]  ">
          {teamMembers.map((member, index) => (
            <div
              className=" lg:p-6 text-center lg:text-left w-full lg:flex lg:flex-col lg:justify-between lg:h-full "
              key={index}
            >
              <div className=" mx-auto lg:mx-0 w-[100px] h-[100px] lg:w-[200px] lg:h-[200px]">
                <Image
                  src={member.imageSrc || ""}
                  width={200}
                  height={200}
                  alt={member.title}
                  className=" w-[100px] h-[100px] lg:w-[200px] lg:h-[200px] rounded-t-[100px] rounded-br-[100px]"
                />
              </div>
              <div className=" mt-8">
                <div>
                  <h3 className=" text-base lg:text-lg font-semibold text-[#222222]">
                    {member.name}
                  </h3>
                  <p className="text-sm  text-[#3A98BB] mb-3">{member.title}</p>
                </div>
              </div>
              <p className="text-[#767676] text-base">{member.details}</p>
              <div className="mt-2 flex justify-center lg:justify-start">
                <a
                  href={member.linkedinUrl}
                  className="text-black hover:text-gray-400 mr- hover:scale-110 transition-transform duration-300"
                >
                  <FaLinkedin className="w-6 h-6 fill-current " />
                </a>
              </div>
            </div>
          ))}
        </div>
    </section>
  );
};

export default TeamSection;
