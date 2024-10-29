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
import Editor from './_components/Editor'

const Page = () => {
  return (
    <>
      <DashNavbar />
      <div className="flex flex-col m-10">
        <div className="flex justify-between items-center mb-5">
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
                  <BreadcrumbLink href="/dashboard/edit">Edit</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className='text-2xl font-semibold'>Edit</h1>
          </div>
        </div>
        <Editor />
      </div>
    </>
  )
}

export default Page