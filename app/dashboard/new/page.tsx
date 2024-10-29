import React from 'react'
import DashNavbar from '../_components/DashNavbar'
import { Button } from '@/components/ui/button'
import { QuestionMarkCircledIcon, SlashIcon } from "@radix-ui/react-icons"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from 'next/link'
import UploadForm from './_components/UploadForm'

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
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard/new">New</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className='text-2xl font-semibold'>New Video</h1>
        </div>
        <Link href={'/dashboard/new'}>
          <Button variant="outline">
            <QuestionMarkCircledIcon className="w-4 h-4" />
          </Button>
        </Link>
      </div>
      <UploadForm MEGABYTES={30} MINUTES={10} />
    </>
  )
}

export default Page