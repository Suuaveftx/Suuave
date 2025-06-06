import React from 'react'
import SettingsCard from './_components/Settings-Page'
import SettingsCard2 from './_components/SettingsCard2'
import SettingsPage from './_components/Settings-Page'

const Page = () => {
  return (
    <div className='mt-16 ml-4 flex gap-4 h-auto'>
        <SettingsPage />
        <SettingsCard2/>
    </div>
  )
}

export default Page