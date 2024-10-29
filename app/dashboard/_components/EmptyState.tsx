import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function EmptyState() {
  return (
    <div className='p-5 m-10 rounded-lg py-24 flex items-center flex-col mt-5 border-2 border-gray-700 '>
        <h2 className='text-lg font-semibold mb-2 text-gray-400'>No videos yet.</h2>
        <Link href={'/dashboard/new'}>
         <Button>
            <Plus fill="currentColor" className="w-4 h-4 mr-2" />
            Create New
        </Button>
        </Link>
    </div>
  )
}

export default EmptyState