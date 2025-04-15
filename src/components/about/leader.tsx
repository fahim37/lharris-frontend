import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Leader() {
    return (
        <section className="py-14">
            <div className="container mx-auto">
                <h2 className='text-[#F7E39F] text-[40px] font-bold text-center pb-7'>Our Leader</h2>
                <div className="rounded-xl bg-[#FFFFFF1A] py-8 lg:px-16 px-4">
                    <div className="grid md:grid-cols-2">
                        <div className="pb-5 md:pb-0">
                            <Image
                                src="/assets/aboutpage/leader.png"
                                alt='leader image'
                                width={1000}
                                height={1000}
                                className='w-full h-auto'
                            />
                        </div>
                        <div className="flex justify-center items-center">
                            <div className="text-center">
                                <h3 className='text-6xl font-bold text-[#F7E39F] pb-4'>Name</h3>
                                <h5 className='text-2xl font-semibold text-white pb-4'>Designation</h5>
                                <h6 className='text-xl font-semibold text-white pb-8'>Experience</h6>
                                <Link href="" className='py-3 px-6 rounded-[120px] bg-[#091057] text-white'>View Profile</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
