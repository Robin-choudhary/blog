import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import Head from "next/head";
import not_found_img from "@/public/images/Image_not_available.png";
import axios from "axios";

function Index({ initialData }) {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (initialData) {
      setUserData(initialData);
      setTotalPages(Math.ceil(initialData.length / itemsPerPage));
    }

    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(loadingTimeout);
  }, [initialData]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      var element = document.getElementById("scroll_blog_div");
      element.scrollIntoView();
      element.scrollIntoView(false);
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };
  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      var element = document.getElementById("scroll_blog_div");
      element.scrollIntoView();
      element.scrollIntoView(false);
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };
  const preDisabled = currentPage === 1;
  const nextDisabled = currentPage === totalPages;

  const itemsPerPage = 6;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // const itemsToDiaplay = userData.slice(startIndex, endIndex);
  const itemsToDiaplay = initialData.slice(startIndex, endIndex);
 

  return (
    <Fragment>
      <Head>
        <title>lpuonline - Blog Page</title>
      </Head>
      <div className="container" id="scroll_blog_div">
        <div className="flex flex-wrap justify-between sm:w-full m-auto mt-10">
          <div className="w-full sm:w-full lg:w-full p-4 sm:p-6 lg:p-8">
            <div className="flex flex-wrap -m-4">
              {loading
                ? Array.from({ length: 6 }).map((_, index) => (
                    <div className="p-4 md:w-1/3 w-full" key={index}>
                      <div
                        className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden"
                        style={{ boxShadow: "0 0 40px rgba(82,85,90,.1)" }}
                      >
                        <div className="relative">
                          <Skeleton className="lg:h-48 h-[200px] w-full" />
                        </div>
                        <div className="p-6">
                          <Skeleton width={100} className="mb-4" />
                          <Skeleton count={2} className="w-full mb-4" />
                          <Skeleton height={40} width={100} />
                        </div>
                      </div>
                    </div>
                  ))
                : itemsToDiaplay && itemsToDiaplay.length > 0
                ? itemsToDiaplay.map((item, index) => {
                    const dateObj = new Date(item.dateModified);
                    const options = {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    };
                    const formattedDate = dateObj.toLocaleDateString(
                      "en-US",
                      options
                    );
                    const imgTag = item.img;
                const match = imgTag
                  ? imgTag.match(/src=['"]([^'"]+)['"]/)
                  : null;
                const imgUrl = match && match[1] ? match[1] : not_found_img;
                    return (
                      <div className="p-4 w-full md:w-1/3" key={item.postRowID}>
                        <div
                          className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden"
                          style={{ boxShadow: "0 0 40px rgba(82,85,90,.1)" }}
                        >
                          <div className="relative">
                            <Image
                              className="lg:h-48 h-[200px] w-full object-fill object-center"
                              src={imgUrl}
                              alt="Not Found Image"
                              width={800}
                              height={600}
                              sizes="(max-width:768px) 100vw, (max-width:120px) 50vw, 33vw"
                              loading="lazy"
                            />
                            <p className="absolute text-[12px] font-[700] bg-[#f68a03] text-white p-[5px] top-3 left-3 rounded">
                              {formattedDate}
                            </p>
                          </div>
                          <div className="p-6">
                            <h2 className="tracking-widest text-xs title-font font-medium text-orange-400 mb-1">
                              #{item.author}
                            </h2>
                            <Link href={`article/${item.slug}`}>
                              <h5 className="title-font text-lg font-[600] text-[#4e5d64] hover:text-[#f58220] cursor-pointer mb-2">
                                {item.title}
                              </h5>
                            </Link>
                            <Link href={`article/${item.slug}`}>
                              <p className="truncate leading-relaxed mb-3 text-[#7f8897] hover:text-[#f58220] cursor-pointer">
                                {item.description}
                              </p>
                            </Link>
                            <div className="flex items-baseline flex-wrap">
                              <Link
                                href={`article/${item.slug}`}
                                className="md:mb-2 lg:mb-0 group relative overflow-hidden shadow-md text-[#4e5d64] hover:bg-orange-500 hover:text-white inline-flex items-center px-7 py-2.5 rounded-lg justify-center"
                              >
                                <span className="z-40">Read More</span>
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
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-wrap  sm:w-full lg:w-4/5 m-auto mt-10">
        <div className="mt-24 text-center">
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm mb-5 pt-[15px] pb-[15px] pl-[20px] pr-[20px] border">
            <button
              className="relative inline-flex items-center rounded-l-md px-2 py-2 hover:bg-[rgba(128,137,150,.1)]"
              onClick={handlePrevClick}
              disabled={preDisabled}
            >
              <span className="sr-only">Previous</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
            </button>
            {Array.from({ length: totalPages }, (_, i) => {
              return (
                <button
                  onClick={() => handlePageChange(i + 1)}
                  key={i}
                  disabled={i + 1 === currentPage}
                  className={`rounded-md relative ${
                    i + 1 === currentPage
                      ? "bg-[#f58220] text-white"
                      : "hover:bg-[rgba(128,137,150,.1)]"
                  }`}
                  style={{ padding: "0.5rem 0.75rem", margin: "10px" }}
                >
                  {i + 1}
                </button>
              );
            })}
            <button
              onClick={handleNextClick}
              disabled={nextDisabled}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 hover:bg-[rgba(128,137,150,.1)]"
            >
              <span className="sr-only">Next</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </button>
          </nav>
          <p className="text-sm text-gray-700 text-center">
            {`Showing ${currentPage} to ${totalPages} of ${userData.length} results`}
          </p>
        </div>
      </div>
    </Fragment>
  );
}

export async function getServerSideProps() {
  //const APIURL = `https://apps.lpuonline.com/WebAPI/api/Blog/GetPostDetail?Slug=NA`;
  const APIURL = `${process.env.NEXT_PUBLIC_API_URL}/GetPostDetail?Slug=NA`;
  try {
    const response = await axios.get(APIURL);
    const data = response.data;
    return {
      props: {
        initialData: data,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        initialData: [],
      },
    };
  }
}

export default Index;
