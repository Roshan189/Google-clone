/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useResultContext } from "../contexts/ResultContextProvider";
import Loading from "./Loading";
import ReactPlayer from "react-player";

const Results = () => {
  const { results, isLoading, getResults, searchTerm } = useResultContext();
  const location = useLocation(); // images, news, videos

  useEffect(() => {
    if (searchTerm) {
      if (location.pathname === "/videos") {
        getResults(`/search/q=${searchTerm} videos`);
      } else {
        getResults(`${location.pathname}/q=${searchTerm}`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, location.pathname]);

  if (isLoading) return <Loading />;
  console.log(location.pathname);

  switch (location.pathname) {
    case "/search":
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56">
          {results?.map(({ link, title }, index) => (
            <div className=" md:w-2/5 w-full" key={index}>
              <a href={link} target="_blank" rel="noreferrer">
                <p className=" text-sm">
                  {link.length > 30 ? link.substring(0, 30) : link}
                </p>
                <p className=" text-lg hover:underline dark:text-blue-300 text-blue-700">
                  {title}
                </p>
              </a>
            </div>
          ))}
        </div>
      );
    case "/images":
      return (
        <div className=" flex flex-wrap justify-center items-center">
          {results?.map(({ image, link: { href, title } }, index) => (
            <a
              className=" sm:p-3 p-5"
              href={href}
              key={index}
              target="_blank"
              rel="noreferrer"
            >
              <img src={image?.src} alt={title} loading="lazy" />
              <p className="w-36 break-words text-sm mt-2">{title}</p>
            </a>
          ))}
        </div>
      );
    case "/news":
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56 items-center">
          {results?.map(({ links, id, source, title }) => (
            <div className=" md:w-2/5 w-full" key={id}>
              <a
                href={links?.[0].href}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                <p className=" text-lg dark:text-blue-300 text-blue-700">
                  {title}
                </p>
              </a>
              <div className=" flex-gap-4">
                <a href={source?.href} target="_blank" rel="noreferrer">
                  {source?.href}
                </a>
              </div>
            </div>
          ))}
        </div>
      );
    case "/videos":
      return (
        <div className=" flex flex-wrap">
          {results?.map((video, index) => (
            <div className="p-2" key={index}>
              {/* {console.log(video.additional_links?.[0].href)} */}
              {video?.additional_links?.[0]?.href && (
                <ReactPlayer
                  url={video.additional_links?.[0].href}
                  controls
                  width="355px"
                  height="200px"
                />
              )}
            </div>
          ))}
        </div>
      );

    default:
      return "ERROR!";
  }
};

export default Results;
