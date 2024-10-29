import Navbar from '@/components/navbar'
import React from 'react'
import DashNavbar from './_components/DashNavbar'
import EmptyState from './_components/EmptyState'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SlashIcon } from "@radix-ui/react-icons"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from 'next/link'

const Page = () => {
  return (
    <>
      <DashNavbar />
      <div className="flex justify-between items-center ml-10 mr-10 mt-5 mb-1">
        <div className="flex flex-col">
          <Breadcrumb className="text-sm mb-2">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className='text-2xl font-semibold'>Recent Videos</h1>
        </div>
        <Link href={'/dashboard/new'}>
          <Button>
            <Plus fill="currentColor" className="w-4 h-4 mr-2" />
            Create New
          </Button>
        </Link>
      </div>
      <EmptyState />
    </>
  )
}

export default Page