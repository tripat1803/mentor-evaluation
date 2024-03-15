import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { FaInstagram } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoPeople } from "react-icons/io5";
import { MdPeople } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";
import { FiChevronDown } from "react-icons/fi";
import TopNav from './TopNav';

const NavLinks = [
    {
        name: 'Dashboard',
        icon: <LuLayoutDashboard size={20} />,
        link: '/'
    },
    {
        name: 'Students',
        icon: <IoPeople size={20} />,
        link: '/students'
    },
];

export default function Layout({ children }) {
    let { pathname } = useLocation();
    const [alignment, setAlignment] = useState(false);
    const [open, setOpen] = useState(false);

    return (
        <div className='flex h-screen overflow-hidden'>
            <div className='flex relative bg-[rgb(30,30,30)] text-white'>
                <div style={alignment ? {

                } : {
                    width: "244px",
                }} className='duration-500 flex flex-col justify-between px-2 border-r h-full'>
                    <div className='flex flex-col'>
                        <div className='py-8 px-3'>
                            {
                                alignment ? <FaInstagram size={28} /> : <h1 className='text-2xl font-semibold'>Scaler</h1>
                            }
                        </div>
                        <div className='flex flex-col gap-2'>
                            {
                                NavLinks.map((item) => {
                                    return (
                                        <Link to={item.link} className={`sidenav-link flex items-center px-3 py-2 gap-2 hover:bg-[rgba(255,255,255,0.07)] cursor-pointer rounded-md ${(pathname === item.link) ? "text-white bg-[rgba(255,255,255,0.1)]" : "text-[rgba(255,255,255,0.65)]"}`} key={item.name}>
                                            <span className='w-[max-content] duration-200'>
                                                {item.icon}
                                            </span>
                                            {
                                                !alignment && <p>{item.name}</p>
                                            }
                                        </Link>
                                    );
                                })
                            }
                        </div>
                    </div>
                    <div className='py-2'>
                        <div onClick={() => setOpen(!open)} className='text-white cursor-pointer relative px-1 rounded-[0.3rem] w-full py-1.5 flex items-center justify-between gap-2 bg-[rgba(255,255,255,0.1)]'>
                            <div style={{
                                height: open ? "max-content" : "0px",
                                padding: open ? "0.5rem 0.75rem" : "0px 0.75rem",
                            }} className='absolute bottom-[52px] rounded-md duration-200 overflow-hidden flex flex-col gap-3 w-[75%] bg-[#fff] right-0'>
                                <div className={`flex gap-2 items-center justify-between text-[#000000]`}>
                                    <span>Profile</span>
                                    <MdPeople />
                                </div>
                                <button className={`flex gap-2 items-center justify-between text-[#000000]`}>
                                    <span>Logout</span>
                                    <PiSignOutBold />
                                </button>
                            </div>
                            <div className='flex items-center gap-2'>
                                <div className='w-10 h-10 rounded-full bg-[#D9D9D9] p-1.5 text-xl'></div>
                                <div className='leading-4'>
                                    <p className='text-sm tracking-wide capitalize'>Tanvi Sharma</p>
                                    <p className='text-xs uppercase'>Mentor</p>
                                </div>
                            </div>
                            <FiChevronDown size={26} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex-1 bg-[#FBFBFB] overflow-y-scroll'>
                <TopNav/>
                {children}
            </div>
        </div>
    )
}