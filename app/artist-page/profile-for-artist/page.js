import React from 'react'
import Fashion_Card from './_components/Fashion-Card'
import Profile_Artist from './_components/Profile-Artist'


const Page = () => {
  return (
    <div className='flex'>
        <Profile_Artist />
        <Fashion_Card />
    </div>
  )
}

export default Page