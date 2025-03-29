'use client'
import React from 'react'
import {Card, CardHeader, CardBody, Image} from "@heroui/react";
import CustomButton from '../../../components/CustomButton';
const JobDetailsPage = () => {
  return (
    <>
    <h1 className='ml-8 font-bold text-2xl'>Post Details</h1>
    <hr></hr>
    <Card className="py-4 border-2 border-[#D3D3D3] ml-8 mb-4 mt-4 bg-[#FAFAFA] p-4">
  <CardHeader className="pb-0 pt-2 px-4 flex flex-col items-start">
    <div className="flex gap-64">
      <p className="text-sm font-medium">Fixed Price | Posted 2 days ago</p>
      <p className="text-sm font-medium">
      Job Status: <span className="text-green-600">Active</span>
    </p>
    <div className="absolute mt-0 right-2 flex space-x-2">
                  <Image
                    src="/dev-images/Share.png" // Replace with your actual image path
                    alt="Icon 1"
                    className="w-6 h-6"
                    width={20}
                    height={20}
                  />
                  <Image
                    src="/dev-images/Bookmark.png" // Replace with your actual image path
                    alt="Icon 2"
                    className="w-6 h-6"
                    width={20}
                    height={20}
                  />
                </div>
    </div>
    <h2 className="font-bold text-2xl mt-4">Modern Fashion Attire Illustration</h2>
  </CardHeader>
  <CardBody className="overflow-visible py-2">
   <div>
    <h6>Job Description</h6>
    <p>We are seeking a talented and creative Fashion Illustrator to collaborate with our design team on a new line of African-inspired attire. The ideal candidate will have a strong understanding of African fashion, culture, and textile patterns. You will be responsible for bringing our design concepts to life through detailed illustrations, contributing to the development of unique, culturally resonant fashion pieces.<br/>
Key Responsibilities: <br/>
Collaborate with the fashion design team to create detailed illustrations of African attire, including dresses, tunics, and traditional garments.<br/>
Develop sketches and renderings that capture the essence of African culture and heritage.<br/>
Interpret design briefs to create visually appealing and accurate illustrations.<br/>
Incorporate traditional African patterns, motifs, and fabrics into designs while staying true to the brand`&apposs aesthetic.<br/>
Work closely with the design team to ensure illustrations align with the overall vision of the collection.<br/>
Make revisions to designs based on feedback and ensure final illustrations are production-ready.<br/>
Stay updated on the latest trends in African fashion and integrate them into your work. <br/>
Qualifications: <br/>
Proven experience as a Fashion Illustrator or similar role.<br/>
Strong portfolio showcasing your expertise in fashion illustration, particularly with African attire.<br/>
Deep understanding of African fashion, culture, and traditional textiles.<br/>
Proficiency in design software such as Adobe Illustrator, Photoshop, and CorelDRAW. <br/>
Excellent drawing and sketching skills, with an eye for detail.<br/>
Ability to translate ideas and concepts into visually stunning illustrations.<br/>
Strong communication skills and the ability to work collaboratively in a team.<br/>
Ability to meet deadlines and manage multiple projects simultaneously.<br/>
Preferred Qualifications: <br/>
Experience working with African fashion brands or designers.<br/>
Knowledge of garment construction and fabric selection.<br/>
Familiarity with fashion trends in both African and global markets.</p>
   </div>
   <div className='mt-8'>
    <h4 className='font-bold text-2xl'>Skill Requirements</h4>
    <div>
        <div className='flex gap-12 mt-4'>
            <CustomButton text='3D Artist' className="w-32 bg-[#F0F0F0]" />
            <CustomButton text='Africa' className="w-32 bg-[#F0F0F0]" />
            <CustomButton text='Native' className="w-32 bg-[#F0F0F0]" />
        </div>
    </div>
   </div>
  </CardBody>
</Card>
</>
  )
}

export default JobDetailsPage