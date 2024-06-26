import React, { Fragment, useCallback, useEffect, useState } from "react";
import BlogDetails from "@/components/BlogDetails";
import Link from "next/link";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import not_found_img from "@/public/images/Image_not_available.png";
import Head from "next/head";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import $ from "jquery";

// Renamed the component to start with an uppercase letter
const Index = ({ initialData }) => {
  console.log(initialData, "ksksk");
  const [search, setSearch] = useState("");
  const [innersearch, setInnerSearch] = useState("");
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [post, setPost] = useState("Recently Accessed");
  const [category, setCategory] = useState("Categories");
  const [Postby, setPostby] = useState("Posted By All");
  const [filteredData, setFilteredData] = useState([]);
  const [itemToDisplayfinal, setItemToDisplayfinal] = useState(initialData);
  const [activeOption, setActiveOption] = useState("Recently Post");
  const [showFullTitle, setShowFullTitle] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    $(".carousel .thumbs-wrapper").hide();
  }, []);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(loadingTimeout);
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         `${process.env.NEXT_PUBLIC_API_URL}/GetPostDetail?Slug=NA`
  //       );
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const result = await response.json();
  //       setData(result);
  //       console.log(result, "final result");
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(loadingTimeout);
  }, []);

  useEffect(() => {
    if (initialData) {
      setUserData(initialData);
      setTotalPages(Math.ceil(initialData.length / itemsPerPage));
    }
  }, [initialData]);

  // current pages function
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

  const itemsToDiaplay = itemToDisplayfinal.slice(startIndex, endIndex);
  const handleSortOptionClick = (sortOption, author) => {
    setActiveOption(sortOption);
    let sortedData;
    let dataToSort = [...initialData]; // Create a copy of initialData

    // Filter data based on the search term
    if (search) {
      dataToSort = dataToSort.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort data based on the selected option
    switch (sortOption) {
      case "Title: A-to-Z":
        sortedData = dataToSort
          .slice()
          .sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "Title: Z-to-A":
        sortedData = dataToSort
          .slice()
          .sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "Recently Post":
        sortedData = dataToSort
          .slice()
          .sort((a, b) => new Date(b.dateModified) - new Date(a.dateModified));
        break;
      case "Old to New":
        sortedData = dataToSort
          .slice()
          .sort((a, b) => new Date(a.dateModified) - new Date(b.dateModified));
        break;
      case "By Author":
        sortedData = dataToSort.filter((item) => item.author === author);
        break;
      default:
        sortedData = dataToSort;
        break;
    }

    // Update the itemToDisplay state with the sorted data
    setItemToDisplayfinal(sortedData);
  };

  // Effect to call handleSortOptionClick with the default sorting option
  useEffect(() => {
    handleSortOptionClick(initialData);
  }, [search]);

  const handleSortOptionClickReset = () => {
    setItemToDisplayfinal(initialData);
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const resetFilters = () => {
    setItemToDisplayfinal(initialData);
    setPost("Recently Accessed");
    setCategory("Categories");
    setPostby("Posted By All");
  };
  const handleSortOptionClickCategories = (value) => {
    // console.log(value,"work")
  };

  const uniqueAuthors = initialData.reduce((acc, current) => {
    if (!acc.includes(current.author)) {
      acc.push(current.author);
    }
    return acc;
  }, []);

  return (
    <Fragment>
      <Head>
      <link rel="icon" href="http://lpuonline.com/blog/favicon.ico" />
        <title>LPU Online - Home</title>
      </Head>
      <main className="container">
        <section className="flex flex-wrap justify-between sm:w-full  m-auto mt-10">
          <div className="w-full sm:w-full lg:w-2/3 p-4 ">
            <div
              className="rounded pr-8 pb-4 pt-4 pl-8 bg-white"
              style={{ boxShadow: "0 0 40px rgba(82,85,90,.1)" }}
            >
              <h1 className="mt-3 text-lg font-semibold tracking-tight text-[#4e5d64] mb-4">
                Featured Blogs
              </h1>
              <div className="mb-4">
                <hr />
                <span
                  style={{
                    display: "block",
                    width: "50px",
                    height: "1px",
                    backgroundColor: "#f58220",
                  }}
                ></span>
              </div>
              {/* {initialData.map((row,index)=>
              (
                <div key={index}>
                  <div>{row.title}</div>
                </div>
              )
              )} */}
              {/* <BlogCarousal initialData={initialData}/> */}

              <div>
                <Carousel autoPlay showThumbs={false}>
                  {loading
                    ? Array.from({ length: 1 }).map((_, index) => (
                        <div className="lg:pr-4" key={index}>
                          <Skeleton
                            className="h-80"
                            style={{ height: "25rem" }}
                          />
                          <div className="w-80">
                            <Skeleton className="h-10" />
                          </div>
                          <div className="w-full">
                            <Skeleton />
                          </div>
                        </div>
                      ))
                    : initialData.slice(0, 5).map((row, index) => {
                        // truncate title
                        const wordis = `${row.description}`;
                        const words = wordis.split(" ");
                        const truncatedTitle = showFullTitle
                          ? wordis
                          : words.slice(0, 10).join(" ");

                        // fetch image and dummy image
                        const imgTag = row.img;
                        const match = imgTag
                          ? imgTag.match(/src=['"]([^'"]+)['"]/)
                          : null;
                        const imgUrl =
                          match && match[1] ? match[1] : not_found_img;

                        return (
                          <div key={index}>
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
                                  onClick={() =>
                                    setShowFullTitle(!showFullTitle)
                                  }
                                >
                                  {showFullTitle ? "Read Less" : "Read More"}
                                </button>
                              )}
                            </p>
                          </div>
                        );
                      })}
                </Carousel>
              </div>
            </div>
          </div>

          <div className="w-full sm:w-full lg:w-1/3 p-4">
            <div
              className="rounded pr-8 pb-4 pt-4 pl-8 h-full bg-white"
              style={{ boxShadow: "0 0 40px rgba(82,85,90,.1)" }}
            >
              <h1 className="mt-3 text-lg font-semibold tracking-tight text-[#4e5d64] mb-4">
                Latest Blogs
              </h1>
              <div className="mb-4">
                <hr />
                <span
                  style={{
                    display: "block",
                    width: "50px",
                    height: "1px",
                    backgroundColor: "#f58220",
                  }}
                ></span>
              </div>
              <BlogDetails initialData={initialData} />
            </div>
          </div>
        </section>

        <section className="flex flex-wrap justify-center sm:w-full  m-auto mt-10">
          <div className="w-full sm:w-full lg:w-2/3 p-4 ">
            <div className="rounded pt-8 pb-8">
              <div className="flex flex-wrap justify-center lg:justify-between items-start lg:items-end">
                <div className=" w-full lg:w-auto mb-4 lg:mb-0">
                  <b>
                    <span className="text-[#444]"> Sort by</span>
                  </b>

                  <Listbox
                    value={post}
                    onChange={setPost}
                    className="relative mt-2 w-full lg:w-[11rem]"
                  >
                    {({ open }) => (
                      <div>
                        <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm sm:leading-6">
                          <span className="block truncate">{post} </span>
                        </Listbox.Button>
                        <Transition
                          show={open}
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options
                            static
                            value=""
                            className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                          >
                            <Listbox.Option
                              className={({ active }) =>
                                classNames(
                                  active
                                    ? "bg-[#f58220] text-white"
                                    : "text-gray-900",
                                  "cursor-default select-none relative py-2 pl-3 pr-9 text-gray-500"
                                )
                              }
                              value="Recently Accessed"
                              onClick={() => handleSortOptionClickReset()}
                            >
                              <span className="block truncate">
                                Recently Accessed
                              </span>
                            </Listbox.Option>

                            <Listbox.Option
                              className={({ active }) =>
                                classNames(
                                  active
                                    ? "bg-[#f58220] text-white"
                                    : "text-gray-900",
                                  "cursor-default select-none relative py-2 pl-3 pr-9 text-gray-500"
                                )
                              }
                              value="Recently Post"
                              onClick={() =>
                                handleSortOptionClick("Recently Post")
                              }
                            >
                              <span className="block truncate">
                                Recently Post
                              </span>
                            </Listbox.Option>

                            <Listbox.Option
                              className={({ active }) =>
                                classNames(
                                  active
                                    ? "bg-[#f58220] text-white"
                                    : "text-gray-900",
                                  "cursor-default select-none relative py-2 pl-3 pr-9 text-gray-500"
                                )
                              }
                              value="Title: A-to-Z"
                              onClick={() =>
                                handleSortOptionClick("Title: A-to-Z")
                              }
                            >
                              <span className="block truncate">
                                Title: A-to-Z
                              </span>
                            </Listbox.Option>

                            <Listbox.Option
                              className={({ active }) =>
                                classNames(
                                  active
                                    ? "bg-[#f58220] text-white"
                                    : "text-gray-900",
                                  "cursor-default select-none relative py-2 pl-3 pr-9 text-gray-500"
                                )
                              }
                              value="Title: Z-to-A"
                              onClick={() =>
                                handleSortOptionClick("Title: Z-to-A")
                              }
                            >
                              <span className="block truncate">
                                Title: Z-to-A
                              </span>
                            </Listbox.Option>
                            <Listbox.Option
                              className={({ active }) =>
                                classNames(
                                  active
                                    ? "bg-[#f58220] text-white"
                                    : "text-gray-900",
                                  "cursor-default select-none relative py-2 pl-3 pr-9 text-gray-500"
                                )
                              }
                              value="Old to New"
                              onClick={() =>
                                handleSortOptionClick("Old to New")
                              }
                            >
                              <span className="block truncate">Old to New</span>
                            </Listbox.Option>
                          </Listbox.Options>
                        </Transition>
                      </div>
                    )}
                  </Listbox>
                </div>

                <div className="w-full lg:w-auto mb-4 lg:mb-0 ml-0 lg:ml-4">
                  <b>
                    <span className="text-[#444]">Filter by</span>
                  </b>
                  <Listbox
                    value={category}
                    onChange={setCategory}
                    className="relative mt-2 w-full lg:w-[11rem]"
                  >
                    {({ open }) => (
                      <div>
                        <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm sm:leading-6">
                          <span className="block truncate">{category} </span>
                          {/* <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span> */}
                        </Listbox.Button>
                        <Transition
                          show={open}
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options
                            static
                            className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                          >
                            <Listbox.Option
                              className={({ active }) =>
                                classNames(
                                  active
                                    ? "bg-[#f58220] text-white"
                                    : "text-gray-900",
                                  "cursor-default select-none relative py-2 pl-3 pr-9 text-gray-500"
                                )
                              }
                              value="Categories"
                              onClick={() =>
                                handleSortOptionClickCategories("Categories")
                              }
                            >
                              <span className="block truncate">Categories</span>
                            </Listbox.Option>

                            <Listbox.Option
                              className={({ active }) =>
                                classNames(
                                  active
                                    ? "bg-[#f58220] text-white"
                                    : "text-gray-900",
                                  "cursor-default select-none relative py-2 pl-3 pr-9 text-gray-500"
                                )
                              }
                              value="Favorites"
                              onClick={() =>
                                handleSortOptionClickCategories("Favorites")
                              }
                            >
                              <span className="block truncate">Favorites</span>
                            </Listbox.Option>

                            <Listbox.Option
                              className={({ active }) =>
                                classNames(
                                  active
                                    ? "bg-[#f58220] text-white"
                                    : "text-gray-900",
                                  "cursor-default select-none relative py-2 pl-3 pr-9 text-gray-500"
                                )
                              }
                              value="Archived"
                              onClick={() =>
                                handleSortOptionClickCategories("Archived")
                              }
                            >
                              <span className="block truncate">Archived</span>
                            </Listbox.Option>

                            <Listbox.Option
                              className={({ active }) =>
                                classNames(
                                  active
                                    ? "bg-[#f58220] text-white"
                                    : "text-gray-900",
                                  "cursor-default select-none relative py-2 pl-3 pr-9 text-gray-500"
                                )
                              }
                              value="All Categories"
                              onClick={() =>
                                handleSortOptionClickCategories(
                                  "All Categories"
                                )
                              }
                            >
                              <span className="block truncate">
                                All Categories
                              </span>
                            </Listbox.Option>

                            <Listbox.Option
                              className={({ active }) =>
                                classNames(
                                  active
                                    ? "bg-[#f58220] text-white"
                                    : "text-gray-900",
                                  "cursor-default select-none relative py-2 pl-3 pr-9 text-gray-500"
                                )
                              }
                              value="Development"
                              onClick={() =>
                                handleSortOptionClickCategories("Development")
                              }
                            >
                              <span className="block truncate">
                                Development
                              </span>
                            </Listbox.Option>
                          </Listbox.Options>
                        </Transition>
                      </div>
                    )}
                  </Listbox>
                </div>

                <div className="w-full lg:w-auto mb-4 lg:mb-0 ml-0">
                  <Listbox
                    value={Postby}
                    onChange={setPostby}
                    className="relative mt-7 w-full lg:w-[11rem]"
                  >
                    {({ open }) => (
                      <div>
                        <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm sm:leading-6">
                          <span className="block truncate">{Postby}</span>
                          {/* <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span> */}
                        </Listbox.Button>
                        <Transition
                          show={open}
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options
                            static
                            className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                          >
                            <Listbox.Option
                              className={({ active }) =>
                                classNames(
                                  active
                                    ? "bg-[#f58220] text-white"
                                    : "text-gray-900",
                                  "cursor-default select-none relative py-2 pl-3 pr-9 text-gray-500"
                                )
                              }
                              value="Posted by All"
                              onClick={() => handleSortOptionClickReset()}
                            >
                              <span className="block truncate">
                                Posted by All
                              </span>
                            </Listbox.Option>

                            {uniqueAuthors.map((author, index) => {
                              return (
                                // <Listbox.Option
                                //   className={({ active }) =>
                                //     classNames(
                                //       active
                                //         ? "bg-[#f58220] text-white"
                                //         : "text-gray-900",
                                //       "cursor-default select-none relative py-2 pl-3 pr-9 text-gray-500"
                                //     )
                                //   }
                                //   value={author}
                                //   onClick={() =>
                                //     handleSortOptionClick("By Author", author)
                                //   }
                                //   key={index}
                                // >
                                //   <span className="block truncate">
                                //     {author}
                                //   </span>

                                //   {({ selected, active }) => (
                                //     <>
                                //       <div className="flex items-center">
                                //         <span
                                //           className={classNames(
                                //             selected
                                //               ? "font-semibold"
                                //               : "font-normal",
                                //             "ml-3 block truncate"
                                //           )}
                                //         >
                                //           {author}
                                //         </span>
                                //       </div>

                                //       {selected ? (
                                //         <span
                                //           className={classNames(
                                //             active
                                //               ? "text-white"
                                //               : "text-indigo-600",
                                //             "absolute inset-y-0 right-0 flex items-center pr-4"
                                //           )}
                                //         >
                                //           <CheckIcon
                                //             className="h-5 w-5"
                                //             aria-hidden="true"
                                //           />
                                //         </span>
                                //       ) : null}
                                //     </>
                                //   )}

                                // </Listbox.Option>
                                <Listbox.Option
                                  className={({ active }) =>
                                    classNames(
                                      active
                                        ? "bg-[#f58220] text-white"
                                        : "text-gray-900",
                                      "cursor-default select-none relative py-2 pl-3 pr-9 text-gray-500"
                                    )
                                  }
                                  value={author}
                                  onClick={() =>
                                    handleSortOptionClick("By Author", author)
                                  }
                                  key={index}
                                >
                                  <span className="block truncate">
                                    {author}
                                  </span>
                                  {({ selected, active }) =>
                                    selected && (
                                      <span
                                        className={classNames(
                                          active
                                            ? "text-white"
                                            : "text-indigo-600",
                                          "absolute inset-y-0 right-0 flex items-center pr-4"
                                        )}
                                      >
                                        <CheckIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    )
                                  }
                                </Listbox.Option>
                              );
                            })}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    )}
                  </Listbox>
                </div>

                <div className="w-full lg:w-auto mt-7">
                  <button
                    className="bg-orange-500 text-white hover:scale-125 transition-all ease duration-200 items-center shadow-lg p-8 flex justify-center mt-5  w-100 rounded-md  px-3 py-2 text-sm font-normal hover:bg-orange-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                    onClick={resetFilters}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full sm:w-full lg:w-1/3 p-4">
            <div className="rounded lg:p-8 h-full">
              <div className="my-course-filter-item my-course-search-content ml-auto">
                <span className="text-base font-semibold text-[#444]">
                  Search
                </span>

                <form className="pt-2">
                  <label
                    htmlFor="default-search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-black"
                  >
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </div>

                    <input
                      type="search"
                      id="default-search"
                      className=" relative block w-full p-4 ps-10 text-sm text-black-900 border border-white-300 rounded-lg bg-white-50   bg-white-700 border-white-600 placeholder-white-400 text-black focus:ring-orange-500 focus:border-orange-500 focus:outline-none"
                      placeholder="Select courses"
                      required=""
                      onChange={(e) => setSearch(e.target.value)}
                      value={search}
                    />
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        type="text"
                        className="w-5 h-6 absolute top-4 bg-white cursor-pointer"
                        style={{
                          position: "absolute",
                          top: "16px",
                          right: "16px",
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                        />
                      </svg>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section
          className=" flex-wrap  sm:w-full  m-auto mt-10"
          id="scroll_blog_div"
        >
          <div className="flex flex-wrap -m-4 mt-10 p-4">
            {/* {loading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <div className="p-4 md:w-1/3" key={index}>
                  <div
                    className="h-full border-gray-200 rounded-lg overflow-hidden"
                    style={{ boxShadow: "0 0 40px rgba(82,85,90,.1)" }}
                  >
                    <div className="relative">
                      <Skeleton className="lg:h-48 md:h-36 w-full" />
                    </div>
                    <div className="p-6">
                      <h2 className="w-24">
                        <Skeleton />
                      </h2>
                      <h1 className="w-64">
                        <Skeleton />
                      </h1>
                      <p className="leading-relaxed mb-3 w-full">
                        <Skeleton />
                      </p>
                      <div className="w-32">
                        <Skeleton height={40} />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : itemsToDiaplay ? (
              itemsToDiaplay && itemsToDiaplay.length > 0 ? (
                itemsToDiaplay.map((row, index) => {
                 const srcValue = srcValues[index];
                  const dateObj = new Date(row.dateModified);
                  const options = {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  };
                  const formattedDate = dateObj.toLocaleDateString(
                    "en-US",
                    options
                  );
                  return (
                    <div className="md:w-1/3 w-full p-4" key={row.postRowID}>
                      <div
                        className="h-full  border-gray-200  rounded-lg overflow-hidden"
                        style={{ boxShadow: "0 0 40px rgba(82,85,90,.1)" }}
                      >
                        <div className="relative">
                          <Image
                            className="lg:h-48 md:h-36 w-full object-fill object-center"
                            src={srcValue || not_found_img}
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
                            #{row.author}
                          </h2>
                          <Link href={`blog/${row.slug}`}>
                            <h5 className="title-font text-lg font-[600] text-[#4e5d64] hover:text-[#f58220] cursor-pointer mb-2">
                              {row.title}
                            </h5>
                          </Link>
                          <Link href={`blog/${row.slug}`}>
                            <p className="truncate leading-relaxed mb-3 text-[#7f8897] hover:text-[#f58220] cursor-pointer">
                              {row.description}
                            </p>
                          </Link>
                          <div className="flex items-baseline flex-wrap">
                            <Link
                              className="text-orange-600 inline-flex items-center md:mb-2 lg:mb-0 "
                              href={`blog/${row.slug}`}
                            >
                              <button className="items-center shadow-lg text-[#4e5d64] p-8 flex justify-center mt-5  w-100 rounded-md  px-3 py-2 text-sm font-normal hover:bg-orange-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500">
                                Read More
                                <svg
                                  className="w-4 h-4 ml-2"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M5 12h14" />
                                  <path d="M12 5l7 7-7 7" />
                                </svg>
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="w-full text-center">
                  <div className="flex justify-center">
                    <p>You searched for</p>
                    <span className="pl-2 text-purple-700 font-bold">
                      {search}
                    </span>
                  </div>
                  <div className="flex justify-center w-100 h-100">
                    <Image
                      src="https://img.freepik.com/premium-vector/file-found-illustration-with-confused-people-holding-big-magnifier-search-no-result_258153-336.jpg"
                      width={100}
                      height={100}
                      className="w-[15%]"
                      alt="not found image"
                      loading="lazy"
                    />
                  </div>
                  <h2 className="text-3xl font-semibold mt-2 mb-2">
                    We couldn t find any matches!
                  </h2>
                  <small>
                    Please check the spelling or try searching something else.
                  </small>
                </div>
              )
            ) : (
              <p>Loading...</p>
            )} */}

            {/* new file ------------------------------------------------------------------------------------ start*/}
            {/* {loading
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
              : itemsToDiaplay.map((row, index) => {
                  const srcValue = srcValues[index];
                  const dateObj = new Date(row.dateModified);
                  const options = {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  };
                  const formattedDate = dateObj.toLocaleDateString(
                    "en-US",
                    options
                  );
                  return (
                    <div className="md:w-1/3 w-full p-4" key={row.postRowID}>
                      <div
                        className="h-full  border-gray-200  rounded-lg overflow-hidden"
                        style={{ boxShadow: "0 0 40px rgba(82,85,90,.1)" }}
                      >
                        <div className="relative">
                          <Image
                            className="lg:h-48 md:h-36 w-full object-fill object-center"
                            src={srcValue || not_found_img}
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
                            #{row.author}
                          </h2>
                          <Link href={`article/${row.slug}`}>
                            <h5 className="title-font text-lg font-[600] text-[#4e5d64] hover:text-[#f58220] cursor-pointer mb-2">
                              {row.title}
                            </h5>
                          </Link>
                          <Link href={`article/${row.slug}`}>
                            <p className="truncate leading-relaxed mb-3 text-[#7f8897] hover:text-[#f58220] cursor-pointer">
                              {row.description}
                            </p>
                          </Link>
                          <div className="flex items-baseline flex-wrap">
                            <Link
                              href={`article/${row.slug}`}
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
                })} */}
            {/* new file ------------------------------------------------------------------------------------  end*/}

            {itemsToDiaplay ? (
              itemsToDiaplay && itemsToDiaplay.length > 0 ? (
                itemsToDiaplay.map((row, index) => {
                  const dateObj = new Date(row.dateModified);
                  const imgTag = row.img;
                  const match = imgTag
                    ? imgTag.match(/src=['"]([^'"]+)['"]/)
                    : null;
                  const imgUrl = match && match[1] ? match[1] : not_found_img;
                  const options = {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  };
                  const formattedDate = dateObj.toLocaleDateString(
                    "en-US",
                    options
                  );
                  return (
                    <div className="md:w-1/3 w-full p-4" key={row.postRowID}>
                      <div
                        className="h-full border-gray-200 rounded-lg overflow-hidden"
                        style={{ boxShadow: "0 0 40px rgba(82,85,90,.1)" }}
                      >
                        <div className="relative">
                          <Image
                            className="lg:h-48 md:h-36 w-full object-fill object-center"
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
                            #{row.author}
                          </h2>
                          <Link href={`article/${row.slug}`}>
                            <h5 className="title-font text-lg font-[600] text-[#4e5d64] hover:text-[#f58220] cursor-pointer mb-2">
                              {row.title}
                            </h5>
                          </Link>
                          <Link href={`article/${row.slug}`}>
                            <p className="truncate leading-relaxed mb-3 text-[#7f8897] hover:text-[#f58220] cursor-pointer">
                              {row.description}
                            </p>
                          </Link>
                          <div className="flex items-baseline flex-wrap">
                            <Link
                              href={`article/${row.slug}`}
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
              ) : (
                <div className="w-full text-center">
                  <div className="flex justify-center">
                    <p>You searched for</p>
                    <span className="pl-2 text-purple-700 font-bold">
                      {search}
                    </span>
                  </div>
                  <div className="flex justify-center w-100 h-100">
                    <Image
                      src="https://img.freepik.com/premium-vector/file-found-illustration-with-confused-people-holding-big-magnifier-search-no-result_258153-336.jpg"
                      width={100}
                      height={100}
                      className="w-[15%]"
                      alt="not found image"
                      loading="lazy"
                    />
                  </div>
                  <h2 className="text-3xl font-semibold mt-2 mb-2">
                    We couldn t find any matches!
                  </h2>
                  <small>
                    Please check the spelling or try searching something else.
                  </small>
                </div>
              )
            ) : null}
          </div>
        </section>

        <section className="flex-wrap  sm:w-full  m-auto mt-10">
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
              {itemToDisplayfinal.length > 0 && (
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                  className={`rounded-md relative ${
                    currentPage === 1
                      ? "bg-[#f58220] text-white"
                      : "hover:bg-[rgba(128,137,150,.1)]"
                  }`}
                  style={{ padding: "0.5rem 0.75rem", margin: "10px" }}
                >
                  1
                </button>
              )}

              {itemToDisplayfinal.length > 6 &&
                Array.from({ length: totalPages - 1 }, (_, i) => (
                  <button
                    onClick={() => handlePageChange(i + 2)}
                    key={i}
                    disabled={i + 2 === currentPage}
                    className={`rounded-md relative ${
                      i + 2 === currentPage
                        ? "bg-[#f58220] text-white"
                        : "hover:bg-[rgba(128,137,150,.1)]"
                    }`}
                    style={{ padding: "0.5rem 0.75rem", margin: "10px" }}
                  >
                    {i + 2}
                  </button>
                ))}

              <button
                onClick={handleNextClick}
                disabled={nextDisabled || itemsToDiaplay.length < 6}
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
              {`Showing ${currentPage} to ${totalPages} of ${itemToDisplayfinal.length} results`}
            </p>
          </div>
        </section>
      </main>
    </Fragment>
  );
};
//"https://apps.lpuonline.com/WebAPI/api/Blog/GetPostDetail?Slug=NA";

export async function getServerSideProps() {
  const APIURL = `${process.env.NEXT_PUBLIC_API_URL}/GetPostDetail?Slug=NA`;
  //const APIURL = 'https://jsonplaceholder.typicode.com/todos/1';
  try {
    const response = await axios.get(APIURL);
    const data = response.data;
    console.log(data, "data");
    return {
      props: {
        initialData: data,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        initialData: null,
      },
    };
  }
}
export default Index;
