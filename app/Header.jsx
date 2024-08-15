import Link from 'next/link'
import React from 'react'

export default function Header() {
    return (
        <div className='w-full flex items-center justify-between'>
            <Link href={"/"}>
                <h1 className='font-bold font-sans'>yzgz</h1>
            </Link>
            <div className='flex flex-row gap-6 items-center justify-center'>
                <Link href={"/login"}>
                    <h1 className='hover:text-black text-gray-500 transition-colors duration-300'>Log in</h1>
                </Link>
                <Link href={"/signup"}>
                    <button className='bg-black text-sm w-20 h-8 text-white rounded-full hover:bg-gray-800 transition-colors duration-300'>Sign Up</button>
                </Link>
            </div>

        </div>
    )
}
