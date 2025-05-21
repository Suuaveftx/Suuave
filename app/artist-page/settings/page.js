import React from 'react'
import SettingsCard from './_components/SettingsCard'
import SettingsCard2 from './_components/SettingsCard2'

const Page = () => {
  return (
    <div className='mt-16 ml-4 flex gap-4 h-auto'>
        <SettingsCard />
        <SettingsCard2 />
    </div>
  )
}

export default Page