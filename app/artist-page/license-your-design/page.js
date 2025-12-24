import React, { Suspense } from 'react'
import License from './_components/License'

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <License />
    </Suspense>
  )
}

export default Page