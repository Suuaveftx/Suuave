import Image from "next/image";
import { FaLinkedin } from 'react-icons/fa'; 

const TeamSection = () => {
  const teamMembers = [
    {
      name: 'IBRAHIM O. HAMZAT',
      title: 'Founder & CEO',
      details: 'A Business-Data Analyst, Copywriter & Researcher',
      imageSrc: '/team/two.jpg', 
      linkedinUrl: 'https://www.linkedin.com/in/ibrahim-hamzat/', 
    },
    {
      name: 'CHINEDU J. OZULU',
      title: 'Co-founder & COO',
      details: 'Product Designer and Web Developer',
      imageSrc: '/team/five.jpg',
      linkedinUrl: 'https://www.linkedin.com/in/chinedu-ozulu/', 
    },
    {
      name: 'FEMI BANDELE',
      title: 'Co-founder & CTO',
      details: 'Full Stack Developer',
      imageSrc: '/team/three.jpg', 
      linkedinUrl: 'https://www.linkedin.com/in/femi-bandele/', 
    },
    {
      name: 'IDIAT SHIOLE',
      title: 'Quality Assurance Advisor (QAA)',
      details: '3D Visual Designer/XR Activist/UX  Global Talent, Founder, Modest Atelier' ,
      imageSrc: '/team/four.jpg', 
      linkedinUrl: 'https://www.linkedin.com/in/idiat-shiole/', 
    },
    {
      name: 'RAHAMAN',
      title: 'Software Engineer',
      details: 'Software Engineer and Electrical & Electronics Engineer',
      imageSrc: '/team/five.jpg', //
      linkedinUrl: 'https://www.linkedin.com/in/rahman-engineer/',
    },
    {
      name: 'CHINONSO',
      title: 'Software Engineer',
      details: 'Software Engineer and Electrical & Electronics Engineer',
      imageSrc: '/team/two.jpg', 
      linkedinUrl: 'https://www.linkedin.com/in/chinonso-engineer/', 
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">MEET OUR TEAM</h2>
        <p className="text-gray-600 mb-8">
          We are the people that make up the SUUAVE team. Diverse in skills and abilities,<br />
          but united by one vision and mission.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index}> 
              <div className="relative w-48 h-48 mx-auto  overflow-hidden rounded-t-[100px] rounded-br-[100px]">
                <Image src={member.imageSrc} alt={member.name} layout="fill" objectFit="cover" className="aspect-square w-full" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{member.name}</h3>
                <p className="text-sm font-semibold text-[#3A98BB] mb-1">{member.title}</p>
                <p className="text-xs text-gray-500 mb-2">{member.details}</p>
                <a href={member.linkedinUrl} className="text-black hover:text-gray-400 mr- hover:scale-110 transition-transform duration-300">
                  <FaLinkedin className="w-5 h-5 fill-current ml-15" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;