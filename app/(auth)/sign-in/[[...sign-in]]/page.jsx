import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2'>
      <div className="absolute inset-0 dark:bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] h-full" />
      <div className='hidden md:flex items-center justify-center p-8'>
      <h1 className="bg-gradient-to-br font-semibold z-[9999] from-gray-200 from-30% to-white/40 bg-clip-text text-transparent text-5xl text-center py-6 sm:text-6xl md:text-7xl lg:text-8xl leading-none tracking-tighter max-w-4xl mx-auto">
          The new
          <br />
          way to
          <br />
          create.
        </h1>
      </div>
      <div className='flex justify-center items-center h-screen'>
        <SignIn />
      </div>
    </div>
  )
}