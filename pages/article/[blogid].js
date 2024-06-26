import React, { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import RightForm from "@/components/RightForm";
import parse from "html-react-parser";
import axios from "axios";
import Head from "next/head";

function Index({ initialData }) {
  const [showMore, setShowMore] = useState(false);
  const [toggleVisibility, setToggleVisibility] = useState(false);
  const [loading, setLoading] = useState(true);
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const handleToggle = () => {
    setToggleVisibility(!toggleVisibility);
  };

  useEffect(() => {
    // Set up breadcrumb data
    const breadcrumbData = [
      { label: "LPU Online", path: "https://www.lpuonline.com/" },
      { label: "blog", path: "/blog" },
      { label: initialData[0]?.title || "Blog Post" },
    ];

    // Set the breadcrumbs state
    setBreadcrumbs(breadcrumbData);

    // Simulate loading for 3 seconds
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 3000);

    // Clear the timeout when the component unmounts or when the initialData changes
    return () => clearTimeout(loadingTimeout);
  }, [initialData]); // Watch for changes in initialData to trigger the effect

  const dateObj = new Date(initialData[0].dateCreated);
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = dateObj.toLocaleDateString("en-US", options);
  const reactElements = parse(initialData[0].postContent);

  return (
    <Fragment>
      <Head>
        <title>{initialData[0].title}</title>
      </Head>
      <section
        className="w-full flex items-center lg:p-[20px]"
        style={{
          backgroundImage: `url('/blog/pattern.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          margin: "revert",
        }}
      >
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-between sm:w-full m-auto mt-4">
            <div className="w-full p-8 lg:w-2/3">
              <h1 className="lg:text-[35px] text-[25px] font-bold tracking-tight text-[#444] pb-3">
                {initialData[0].title}
              </h1>
              {/* blog breadcrumbs section */}
              <p className="pb-3 text-[#7f8897]">
                {breadcrumbs.map((data, index) => {
                  return (
                    <span key={index}>
                      {index === breadcrumbs.length - 1 ? (
                        <span className="pr-2">{data.label}</span>
                      ) : (
                        <a href={data.path} className="pr-2">
                          {data.label} /{" "}
                        </a>
                      )}
                    </span>
                  );
                })}
              </p>

              <p className="text-[#7f8897]">
                <span>
                  By <span>{initialData[0].author} </span>
                  <span> {formattedDate}</span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="flex flex-wrap justify-between sm:w-full m-auto mt-4">
          <div className="w-full sm:w-full lg:w-2/3  sm:p-6 lg:p-[15px] ">
            <div
              className="rounded-8 p-8"
              style={{ boxShadow: "0 0 40px rgba(82,85,90,.1)" }}
            >
              <div className="w-full">
                <article id="margin_div">{reactElements}</article>
              </div>

              <hr className="mt-5" />
              <h1 className="mt-2 text-[18px] font-bold tracking-tight text-[#444] mb-4">
                Tags
              </h1>
              <div className="flex flex-wrap justify-between items-center">
                <ul className="flex flex-wrap text-base">
                  <li className="mr-2 pt-2 pr-4 pb-2 pl-4 rounded text-[#7f8897] border border-[1px solid rgba(128,137,150,.2)] hover:text-orange-500 hover:border-orange-500">
                    <a href="#" className="">
                      Online
                    </a>
                  </li>
                  <li className="mr-2 pt-2 pr-4 pb-2 pl-4 rounded text-[#7f8897] border border-[1px solid rgba(128,137,150,.2)] hover:text-orange-500 hover:border-orange-500">
                    <a href="#" className="">
                      Study
                    </a>
                  </li>
                </ul>

                <div>
                  <button
                    onClick={handleToggle}
                    className="bg-white text-black font-bold rounded-full w-[40px] h-[40px] flex items-center justify-center shadow-lg focus:visible focus:outline-none"
                  >
                    {toggleVisibility ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path strokeLinecap="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                        />
                      </svg>
                    )}
                  </button>

                  {toggleVisibility && (
                    <div className="relative">
                      <ul
                        className="flex absolute top-[-40px] right-[3rem] space-x-1 ease-in duration-300"
                        id="iconsclass"
                      >
                        <li className="bg-[#3e5b99] p-[10px] rounded-full text-white">
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.facebook.com/LPUOnline"
                            aria-label="facebook"
                          >
                            <svg
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              className="w-5 h-5"
                              viewBox="0 0 24 24"
                            >
                              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                            </svg>
                          </a>
                        </li>
                        <li className="bg-[#3aaae1] p-[10px] rounded-full text-white">
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://twitter.com/LpuOnline"
                            aria-label="twitter"
                          >
                            <svg
                              fill="white"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              className="w-5 h-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                            >
                              <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path>
                            </svg>
                          </a>
                        </li>
                        <li className="bg-[#3e5b99] p-[10px] rounded-full text-white">
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.linkedin.com/company/lpuonline/"
                            aria-label="linkedin"
                          >
                            <svg
                              fill="#fff"
                              className="w-5 h-5"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                              data-name="Layer 1"
                            >
                              <path d="M17.5,8.999a5.41868,5.41868,0,0,0-2.56543.64453A.99918.99918,0,0,0,14,8.999H10a.99943.99943,0,0,0-1,1v12a.99942.99942,0,0,0,1,1h4a.99942.99942,0,0,0,1-1v-5.5a1,1,0,1,1,2,0v5.5a.99942.99942,0,0,0,1,1h4a.99942.99942,0,0,0,1-1v-7.5A5.50685,5.50685,0,0,0,17.5,8.999Zm3.5,12H19v-4.5a3,3,0,1,0-6,0v4.5H11v-10h2v.70313a1.00048,1.00048,0,0,0,1.78125.625A3.48258,3.48258,0,0,1,21,14.499Zm-14-12H3a.99943.99943,0,0,0-1,1v12a.99942.99942,0,0,0,1,1H7a.99942.99942,0,0,0,1-1v-12A.99943.99943,0,0,0,7,8.999Zm-1,12H4v-10H6ZM5.01465,1.542A3.23283,3.23283,0,1,0,4.958,7.999h.02832a3.23341,3.23341,0,1,0,.02832-6.457ZM4.98633,5.999H4.958A1.22193,1.22193,0,0,1,3.58887,4.77051c0-.7461.55957-1.22852,1.42578-1.22852A1.2335,1.2335,0,0,1,6.41113,4.77051C6.41113,5.5166,5.85156,5.999,4.98633,5.999Z" />
                            </svg>
                          </a>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="h-fit  mt-24">
              <ul role="list ">
                <h1 className="mt-2 font-bold tracking-tight pl-4 text-gray-900 text-2xl lg:pl-0 ">
                  About the author
                </h1>
                <li className="flex justify-between gap-x-6 py-5 px-6 mb-10">
                  <div className=" sm:grid sm:grid-cols-1 sm:gap-4 sm:px-0 ">
                    <div className="flex items-start  border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
                      <div className="sm:mr-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                        <Image
                          style={{
                            height: "8rem",
                            width: "8rem",
                            borderRadius: "50%",
                            backgroundColor: "#f0f0f0",
                          }}
                          src="https://www.lpuonline.com/images/small-avatar-1.jpg"
                          alt="not"
                          width={100}
                          height={100}
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-grow text-left  mt-6 sm:mt-0">
                        <h2 className="text-[#4e5d64] text-lg title-font font-bold mb-2">
                          {initialData[0].author}
                        </h2>
                        <p>www.lpuonline.com</p>
                        <p className="leading-relaxed text-base">
                          {initialData[0].title}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="h-fit w-full sm:w-full lg:w-1/3 p-4 sm:p-6 lg:p-[15px] sticky  top-[100px] rounded-8">
            <RightForm />
            <div
              className="rounded-8 p-8 mt-10"
              style={{ boxShadow: "0 0 40px rgba(82,85,90,.1)" }}
            >
              <h1 className="font-semibold tracking-tight text-[#4e5d64] text-lg">
                Search
              </h1>
              <div className="mt-5 mb-5">
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

              <form>
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
                  />
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
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

            <div
              className="rounded-8 p-8 mt-10"
              style={{ boxShadow: "0 0 40px rgba(82,85,90,.1)" }}
            >
              <h1 className="text-lg font-semibold tracking-tight text-[#4e5d64]">
                Categories
              </h1>
              <div className="mt-5 mb-5">
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
              <div className="flex items-center mb-4">
                <input
                  id="filter-mobile-color-2"
                  name="color[#000]"
                  value="blue"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                ></input>
                <label
                  htmlFor="online-study-checkbox"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-dark-300"
                >
                  Online Study
                </label>
                <span className="pl-1 text-[#7f8897]">(9,300)</span>
              </div>

              <div className="flex items-center mb-4">
                <input
                  id="online-study-checkbox"
                  type="checkbox"
                  defaultValue=""
                  className="red-input"
                />
                <label
                  htmlFor="online-study-checkbox"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-dark-300"
                >
                  Study Tips
                </label>
                <span className="pl-1 text-[#7f8897]">(1,600)</span>
              </div>

              {showMore && (
                <>
                  <div className="flex items-center mb-4">
                    <input
                      id="online-study-checkbox"
                      type="checkbox"
                      defaultValue=""
                      className="red-input"
                    />
                    <label
                      htmlFor="online-study-checkbox"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-dark-300"
                    >
                      Educational Technology
                    </label>
                    <span className="pl-1 text-[#7f8897]">(14,357)</span>
                  </div>

                  <div className="flex items-center mb-4">
                    <input
                      id="online-study-checkbox"
                      type="checkbox"
                      defaultValue=""
                      className="red-input"
                    />
                    <label
                      htmlFor="online-study-checkbox"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-dark-300"
                    >
                      Photography
                    </label>
                    <span className="pl-1 text-[#7f8897]">(741)</span>
                  </div>

                  <div className="flex items-center mb-4">
                    <input
                      id="online-study-checkbox"
                      type="checkbox"
                      defaultValue=""
                      className="red-input"
                    />
                    <label
                      htmlFor="online-study-checkbox"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-dark-300"
                    >
                      Subject-Specific
                    </label>
                    <span className="pl-1 text-[#7f8897]">(852)</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <input
                      id="online-study-checkbox"
                      type="checkbox"
                      defaultValue=""
                      className="red-input"
                    />
                    <label
                      htmlFor="online-study-checkbox"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-dark-300"
                    >
                      Online Course
                    </label>
                    <span className="pl-1 text-[#7f8897]">(951)</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <input
                      id="online-study-checkbox"
                      type="checkbox"
                      defaultValue=""
                      className="red-input"
                    />
                    <label
                      htmlFor="online-study-checkbox"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-dark-300"
                    >
                      Learning Resources
                    </label>
                    <span className="pl-1 text-[#7f8897]">(782)</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <input
                      id="online-study-checkbox"
                      type="checkbox"
                      defaultValue=""
                      className="red-input"
                    />
                    <label
                      htmlFor="online-study-checkbox"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-dark-300"
                    >
                      Career and Skill
                    </label>
                    <span className="pl-1 text-[#7f8897]">(753)</span>
                  </div>
                </>
              )}

              <button
                onClick={toggleShowMore}
                className="text-grey-500 hover:text-orange-600 cursor-pointer focus:outline-none transition-max-height duration-300 ease-in-out"
              >
                {showMore ? (
                  <>
                    <span className="ml-1 flex items-end text-[#7f8897] text-[15px]">
                      Show less
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 15.75 7.5-7.5 7.5 7.5"
                        />
                      </svg>
                    </span>
                  </>
                ) : (
                  <>
                    <span className="ml-1 flex items-end text-[#7f8897] text-[15px]">
                      Show more
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m19.5 8.25-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}


export default Index;

export async function getServerSideProps(context) {
  const { params } = context;
  const { blogid } = params;

  try {
    const response = `${process.env.NEXT_PUBLIC_API_URL}/GetPostDetail?Slug=${blogid}`;
    //const response = `https://apps.lpuonline.com/WebAPI/api/Blog/GetPostDetail?Slug=${blogid}`;
    const postData = await axios.get(response);
    const data = postData.data;
    return {
      props: {
        initialData: data,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);

    return {
      props: {
        initialData: [],
      },
    };
  }
}
