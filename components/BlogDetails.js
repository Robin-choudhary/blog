"use client";
import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import not_found_img from "@/public/images/Image_not_available.png";

const BlogDetails = ({ initialData }) => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(loadingTimeout);
  }, []);



 
  return (
    <>
      <ul role="list" className="divide-y divide-gray-100">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <div className="flex gap-x-4 mb-4 py-2" key={index}>
                <div className="w-[80px]">
                  <Skeleton className="h-[4rem]" />
                </div>
                <div className="min-w-0 flex-auto">
                  <p className="w-[100px]">
                    <Skeleton />
                  </p>
                  <p className="w-full">
                    <Skeleton className="w-full" />
                  </p>
                </div>
              </div>
            ))
          : initialData.slice(0, 5).map((row, index) => {
            const imgTag = row.img;
            const match = imgTag
              ? imgTag.match(/src=['"]([^'"]+)['"]/)
              : null;
            const imgUrl = match && match[1] ? match[1] : not_found_img;
              return (
                <Fragment key={row.postRowID}>
                    <li key={row.postRowID}>
                  <Link href={`article/${row.slug}`} className="flex justify-between gap-x-6 py-5">
                
                      <div className="flex min-w-0 gap-x-4">
          
                        <Image
                          className="flex-none rounded bg-gray-50 object-fill object-center"
                          src={imgUrl}
                          alt="Not Found Image"
                          width={80}
                          height={80}
                          sizes="(max-width:768px) 100vw, (max-width:120px) 50vw, 33vw"
                          loading="lazy"
                        />
                        <div className="min-w-0 flex-auto">
                          <p className="truncate text-[15px] font-semibold leading-6 hover:text-[#f58220] text-[#4e5d64]">
                            {row.title}
                          </p>
                          <p className="truncate leading-5 text-[14px]">
                            {row.description}
                          </p>
                        </div>
                      </div>
                  </Link>
                    </li>
                  <hr />
                </Fragment>
              );
            })}
      </ul>

      <Link
        href="/article"
        className="w-full md:mb-2 lg:mb-0 group relative overflow-hidden shadow-md text-white bg-[#f58220] hover:bg-[#df7436] hover:text-white inline-flex items-center px-7 py-2.5 rounded-lg justify-center"
      >
        <span className="z-40">View All blog</span>
        <svg
          className="z-40 ml-2 -mr-1 w-3 h-3 transition-all duration-300 group-hover:translate-x-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
        <div className="absolute inset-0 h-[200%] w-[200%] rotate-45 translate-x-[-70%] transition-all group-hover:scale-100 bg-white/30 group-hover:translate-x-[50%] z-20 duration-1000" />
      </Link>
    </>
  );
};

export default BlogDetails;
