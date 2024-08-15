"use client";
import { useState, useEffect } from "react";
import Header from "./Header";
import { Skeleton } from "@/components/ui/skeleton";
import ShortLinkItem from "@/components/ShortLinkItem";

export default function Home() {
  const [shortUrls, setShortUrls] = useState([]); // 改为数组以存储多个短链接
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [longUrl, setLongUrl] = useState('');

  useEffect(() => {
    // 从 localStorage 加载已保存的短链接
    const savedUrls = localStorage.getItem('shortUrls');
    if (savedUrls) {
      setShortUrls(JSON.parse(savedUrls));
    }
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    const formData = new URLSearchParams();
    formData.append('longUrl', longUrl);
    try {
      const response = await fetch('https://yzgz.cc/api/shortens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseBody = await response.text(); // 处理为纯文本响应
      const newShortUrls = [...shortUrls, responseBody];
      setShortUrls(newShortUrls);
      
      // 将更新后的短链接列表保存到 localStorage
      localStorage.setItem('shortUrls', JSON.stringify(newShortUrls));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    setLongUrl(event.target.value);
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center p-2 md:p-4">
      {/* 背景图层 */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className="w-full md:w-4/6 lg:w-3/6">
        <Header />

        <div className="flex flex-col items-center gap-y-4 pt-16">
          <h1 className="font-extrabold lg:text-4xl md:text-3xl text-xl tracking-wide">无需登录创建属于您的短链接～</h1>
          <h1 className="px-6 py-3 font-extrabold lg:text-4xl md:text-3xl text-xl tracking-wide text-gray-600 hover:text-red-600">人民觉得好才是真的好</h1>
        </div>

        <div className="flex flex-col items-center justify-center mt-10 gap-y-4">
          <input
            type="text"
            placeholder=" https://yzgz.cc"
            value={longUrl}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-lg p-2 md:w-[450px] w-96 h-10 shadow-md hover:shadow-lg transition-shadow duration-300"
          />

          <button
            onClick={fetchData}
            disabled={!longUrl.trim() || loading} // 禁用按钮的条件
            className={`px-4 py-2 md:w-[450px] w-96 h-10 md:h-12 rounded-md ${longUrl.trim() && !loading ? 'bg-blue-500 text-white' : 'bg-muted text-black cursor-not-allowed'}`}
          >
            {loading ? <span>加载中...</span> : "创建"}
          </button>

          {/* 短链接列表显示 */}
          <div className="flex flex-col space-y-4 mt-2">
            {/* 示例短链接项 */}
            <ShortLinkItem url="1" />

            {/* 显示实际的短链接 */}
            {shortUrls.map((url, index) => (
              <ShortLinkItem key={index} url={url} />
            ))}

            {/* 在短链接列表后添加 Skeleton */}
            <div className="flex items-center px-4 bg-white border  h-16 md:h-20  rounded-lg border-gray-200 space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 md:w-[250px] w-[150px]" />
                <Skeleton className="h-4 md:w-[350px] w-[250px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
