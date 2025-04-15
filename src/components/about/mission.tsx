import { TargetIcon as TbTargetArrow } from "lucide-react"
import { DribbbleIcon as BiLogoReact } from "lucide-react"

export default function Mission() {
    return (
        <section className="py-8 sm:py-10 md:py-14">
            <div className="container mx-auto px-4">
                {/* Mission and Core Values Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
                    <div className="p-5 sm:p-6 md:p-7 rounded-xl bg-[#FFFFFF1A]">
                        <TbTargetArrow className="text-[#F7E39F] h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 mb-4 sm:mb-5 md:mb-7" />
                        <h3 className="text-xl sm:text-2xl font-bold text-white pb-3 sm:pb-4 md:pb-5">Our Mission</h3>
                        <p className="text-base sm:text-lg md:text-xl font-bold text-[#F7E39F] pb-3 sm:pb-4 md:pb-5">
                            To deliver comprehensive security solutions that protect what matters most.
                        </p>
                    </div>
                    <div className="p-5 sm:p-6 md:p-7 rounded-xl bg-[#FFFFFF1A]">
                        <BiLogoReact className="text-[#F7E39F] h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 mb-4 sm:mb-5 md:mb-7" />
                        <h3 className="text-xl sm:text-2xl font-bold text-white pb-3 sm:pb-4 md:pb-5">Core Values</h3>
                        <ul className="text-base sm:text-lg md:text-xl font-bold text-[#F7E39F] pb-3 sm:pb-4 md:pb-5 space-y-1 sm:space-y-2">
                            <li>✓ Integrity</li>
                            <li>✓ Innovation</li>
                            <li>✓ Transparent Pricing</li>
                        </ul>
                    </div>
                </div>

                {/* Timeline Section */}
                <div className="w-full pt-12 sm:pt-16 md:pt-20 lg:pt-24">
                    <div className="mx-auto">
                        {/* Desktop timeline */}
                        <div className="hidden md:block relative">
                            <div className="flex justify-between px-4 lg:px-[10%] relative">
                                {/* The main horizontal line */}
                                <div className="absolute top-7 left-[12%] right-[15%] h-1 bg-[#f5e28f]" />

                                {/* 2010 */}
                                <div className="flex flex-col items-center relative">
                                    <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-[#f5e28f] z-10"></div>
                                    <div className="mt-4 md:mt-6 text-center">
                                        <h3 className="text-lg md:text-xl font-bold text-[#f5e28f]">2010</h3>
                                        <p className="text-white mt-1 text-sm md:text-base">Founded</p>
                                    </div>
                                </div>

                                {/* 2015 */}
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-[#f5e28f] z-10"></div>
                                    <div className="mt-4 md:mt-6 text-center">
                                        <h3 className="text-lg md:text-xl font-bold text-[#f5e28f]">2015</h3>
                                        <p className="text-white mt-1 text-sm md:text-base">Expanded to Commercial</p>
                                    </div>
                                </div>

                                {/* 2023 */}
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-[#f5e28f] z-10"></div>
                                    <div className="mt-4 md:mt-6 text-center">
                                        <h3 className="text-lg md:text-xl font-bold text-[#f5e28f]">2023</h3>
                                        <p className="text-white mt-1 text-sm md:text-base">10k+ Clients Served</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mobile timeline */}
                        <div className="md:hidden flex flex-col items-center">
                            {/* 2010 */}
                            <div className="relative flex flex-col items-center">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#f5e28f] z-10" />
                                <div className="h-12 sm:h-16 w-0.5 bg-[#f5e28f]" />
                                <div className="text-center mb-3 sm:mb-4">
                                    <h3 className="text-lg sm:text-xl font-bold text-[#f5e28f]">2010</h3>
                                    <p className="text-white mt-1 text-sm sm:text-base">Founded</p>
                                </div>
                            </div>

                            {/* 2015 */}
                            <div className="relative flex flex-col items-center">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#f5e28f] z-10" />
                                <div className="h-12 sm:h-16 w-0.5 bg-[#f5e28f]" />
                                <div className="text-center mb-3 sm:mb-4">
                                    <h3 className="text-lg sm:text-xl font-bold text-[#f5e28f]">2015</h3>
                                    <p className="text-white mt-1 text-sm sm:text-base">Expanded to Commercial</p>
                                </div>
                            </div>

                            {/* 2023 */}
                            <div className="relative flex flex-col items-center">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#f5e28f] z-10" />
                                <div className="text-center">
                                    <h3 className="text-lg sm:text-xl font-bold text-[#f5e28f]">2023</h3>
                                    <p className="text-white mt-1 text-sm sm:text-base">10k+ Clients Served</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
