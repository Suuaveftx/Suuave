
import React from 'react'
import UnderlinedTabs from './_components/Tabs'
import SearchBar from '../../../components/Searchbar'

const Page = () => {
  return (
    <div>
      <div className='text-2xl font-bold ml-8 mt-8 text-[#767676]'>
      <h1>My Contracts</h1>
      </div>
      <UnderlinedTabs />

    </div>
  )
}

export default Page