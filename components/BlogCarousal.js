import React, { Fragment, useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import $ from "jquery";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import not_found_img from "@/public/images/Image_not_available.png";
import Link from "next/link";
//import initialData from '@/pages/index'

const BlogCarousal = ({ initialData }) => {

  const [showFullTitle, setShowFullTitle] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    $(".carousel .thumbs-wrapper").hide();
  }, []);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(loadingTimeout);
  }, []);


  return (
    <Fragment>
      <Carousel autoPlay showThumbs={false}>
        {loading
          ? Array.from({ length: 1 }).map((_, index) => (
              <div className="lg:pr-4" key={index}>
                <Skeleton className="h-80" style={{ height: "25rem" }} />
                <div className="w-80">
                  <Skeleton className="h-10" />
                </div>
                <div className="w-full">
                  <Skeleton />
                </div>
              </div>
            ))
          : initialData.slice(0, 5).map((row, index) => {
              const wordis = `${row.description}`;
              const words = wordis.split(" ");
              const truncatedTitle = showFullTitle
                ? wordis
                : words.slice(0, 10).join(" ");
                const imgTag = row.img;
                const match = imgTag
                  ? imgTag.match(/src=['"]([^'"]+)['"]/)
                  : null;
                const imgUrl = match && match[1] ? match[1] : not_found_img;
              return (
                <div key={row.postRowID}>
                  <Link href={`article/${row.slug}`}>
                    <div>
                    <Image
                          className="rounded lg:h-[25rem] h-auto object-fill"
                          src={imgUrl}
                          alt="Not Found Image"
                          width={400}
                          height={600}
                          sizes="(max-width:768px) 100vw, (max-width:120px) 50vw, 33vw"
                          loading="lazy"
                          priority={false}
                        />
                    </div>

                    <h2 className="text-[20px] text-left font-semibold mt-4 text-[#444] hover:text-[#f58220]">
                      {row.title}
                    </h2>
                  </Link>
                  <p className=" text-left mb-4 text-[#444] text-[14px]">
                    {truncatedTitle}
                    {words.length > 4 && (
                      <button
                        className="pl-2 text-[#f58220] mb-4"
                        onClick={() => setShowFullTitle(!showFullTitle)}
                      >
                        {showFullTitle ? "Read Less" : "Read More"}
                      </button>
                    )}
                  </p>
                </div>
              );
            })}
      </Carousel>
    </Fragment>
  );
};

export default BlogCarousal;
