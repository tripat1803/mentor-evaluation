import React from 'react'

export default function TopNav() {
    return (
        <div className="bg-white drop-shadow-xl py-8 md:py-2 h-auto lg:h-[8%] w-full">
            <div className="flex flex-col px-5 h-full w-full justify-center">
                <button
                    className="lg:hidden block"
                ></button>
                <div className="flex justify-between lg:py-0 py-2 w-full h-full items-center">
                    <div className="flex items-center justify-center">
                        <p className="font-istok xl:text-base text-xs lg:text-sm font-normal text-[#A9A9A9] ">
                            Mon,31 Aug 2023
                        </p>
                    </div>
                    <div className=" flex justify-center items-center gap-2 ">
                        <p className="text-[#888888] 2xl:text-lg xl:text-base text-xs lg:text-sm font-istok font-normal">
                            Hi, Tanvi Sharma
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
