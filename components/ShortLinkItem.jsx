"use client";
import Image from "next/image";
import { useState } from "react";
import { useToast } from "./ui/use-toast";
import { IoCopyOutline } from "react-icons/io5";
import { IoMdMore } from "react-icons/io";
import { MdOutlineQrCode } from "react-icons/md";
import { GoCheck } from "react-icons/go";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

export default function ShortLinkItem({ url }) {
    const [copied, setCopied] = useState(false);
    const [pressed, setPressed] = useState(false); // State for press effect
    const { toast } = useToast();

    const handleCopy = () => {
        navigator.clipboard.writeText(`yzgz.cc/${url}`).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Clear copied state after 2 seconds
        });
        toast({
            duration: 2500,
            description: "😊 复制成功 ~",
        });
    };

    return (
        <motion.div
            className="flex flex-col items-center justify-center bg-white md:w-[450px] w-96 h-16 md:h-20 border rounded-lg border-gray-200"
            onMouseDown={() => setPressed(true)}
            onMouseUp={() => setPressed(false)}
            onMouseLeave={() => setPressed(false)} // Handle mouse leave to ensure animation is reset
            whileTap={{ scale: 0.95 }} // Framer Motion tap effect
            animate={{ scale: pressed ? 0.95 : 1 }} // Scale effect for pressed state
            transition={{ duration: 0.2, ease: "easeInOut" }}
        >
            <section className="flex w-full h-full items-center justify-between px-4">
                {/* 头像部分 */}
                <Image
                    src="https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2024%2F0807%2F0b4b5103j00shtw51002td200u000tzg005c005b.jpg&thumbnail=660x2147483647&quality=80&type=jpg"
                    alt="Avatar"
                    width={45}
                    height={45}
                    className="rounded-full border border-gray-200 p-1"
                />

                {/* 中间内容 */}
                <div className="flex flex-col mr-auto px-4">
                    <div className="flex flex-row items-center gap-2">
                        <a className="text-sm font-bold font-sans" href={'https://yzgz.cc/' + url} target="_blank" rel="noopener noreferrer">
                            {'yzgz.cc/' + url}
                        </a>  
                                              <button
                            className="w-7 h-7 rounded-full bg-white hover:bg-slate-100 flex items-center justify-center border border-gray-300"
                            onClick={handleCopy}
                        >
                            {!copied ? <IoCopyOutline color="black" size={16} /> : <GoCheck color="black" size={16} />}
                        </button>
                        <button className="border border-gray-200 hover:bg-slate-100 rounded-full w-7 h-7 flex justify-center items-center">
                            <MdOutlineQrCode size={16} />
                        </button>
                        <button className="border border-gray-200 hover:bg-slate-100 rounded-full w-7 h-7 flex justify-center items-center">
                            <MdOutlineQrCode size={16} />
                        </button>
                    </div>
                    <a className="text-sm font-bold font-sans text-gray-400 no-underline hover:underline" href={'https://yzgz.cc/' + url} target="_blank" rel="noopener noreferrer">
                            {'yzgz.cc/' + url}
                        </a>  
                </div>

                {/* 编辑按钮 */}
                <button >
                    <IoMdMore size={20} color="gray" className="hover:bg-slate-100 hover:h-7" />
                </button>
            </section>
        </motion.div>
    );
}
