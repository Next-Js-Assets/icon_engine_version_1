import IllustrationCard from "../Components/illustrationCard";
import Title from "../Components/title";
import DesignCard from "../Components/designCard";
import Layout from "../Components/layout";
import Footer from "../Components/footer";
import ActivityHeader from "../Components/activityHeader";
import Drawer from "../Components/Drawer";
import { useState, useEffect } from "react";
import resizeSVG from "../../SVGManagerAPI/SVGSizeModifierAPI";
import Link from "next/link";
import primaryColors from "../../SVGManagerAPI/PrimaryColors";
import recentDownloadIllustrationByPublic from "../../SVGManagerAPI/recentDownloadIllustartionByPublic";
const navigation = [
  { name: "Home", href: "/" },
  { name: "Illustration", href: "/Illustration" },
  { name: "Design", href: "/Design" },
  { name: "Activity", href: "#" },
  { name: "Disclaimer", href: "/disclaimer" },
  { name: "AboutUs", href: "/aboutUs" },
  { name: "Contact", href: "/contact" },
];
const Items = [
  {
    name: "Leonard Krasner",
    role: "Senior Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1633264985178-d23fa9a59c96?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    twitterUrl: "#",
    linkedinUrl: "#",
    downloadedBy: {
      firstName: "Nageeta",
      country: "Pakistan",
      websiteLink: "/",
    },
  },
  {
    name: "Leonard Krasner",
    role: "Senior Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1633289475421-f0f851f6f00e?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    twitterUrl: "#",
    linkedinUrl: "#",
    downloadedBy: {
      firstName: "Nadir",
      country: "United States",
      websiteLink: "/",
    },
  },
  {
    name: "Leonard Krasner",
    role: "Senior Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1633313559082-5db0c86df12d?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOXx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    linkedinUrl: "#",
    downloadedBy: {
      firstName: "Zeeshan",
      country: "Canada",
      websiteLink: "/",
    },
  },
  {
    name: "Leonard Krasner",
    role: "Senior Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1627293007095-8b335ebae6e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDN8TThqVmJMYlRSd3N8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
    twitterUrl: "#",
    linkedinUrl: "#",
    downloadedBy: {
      firstName: "Nageeta",
      country: "Pakistan",
      websiteLink: "/",
    },
  },
  {
    name: "Leonard Krasner",
    role: "Senior Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1633113213095-5fda85346b43?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    twitterUrl: "#",
    linkedinUrl: "#",
    downloadedBy: {
      firstName: "Nageeta",
      country: "Pakistan",
      websiteLink: "/",
    },
  },
  {
    name: "Leonard Krasner",
    role: "Senior Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1633113089635-115b38c66c49?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwyMXx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    twitterUrl: "#",
    linkedinUrl: "#",
    downloadedBy: {
      firstName: "Nadir",
      country: "United States",
      websiteLink: "/",
    },
  },
  {
    name: "Leonard Krasner",
    role: "Senior Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1627490654190-61d45cb41693?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDF8TThqVmJMYlRSd3N8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
    twitterUrl: "#",
    linkedinUrl: "#",
    downloadedBy: {
      firstName: "Nadir",
      country: "United States",
      websiteLink: "/",
    },
  },
  {
    name: "Leonard Krasner",
    role: "Senior Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1633277190581-d26618118553?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    linkedinUrl: "#",
    downloadedBy: {
      firstName: "Nadir",
      country: "United States",
      websiteLink: "/",
    },
  },
  {
    name: "Leonard Krasner",
    role: "Senior Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    twitterUrl: "#",
    linkedinUrl: "#",
    downloadedBy: {
      firstName: "Nadir",
      country: "United States",
      websiteLink: "/",
    },
  },
  {
    name: "Leonard Krasner",
    role: "Senior Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1633295174543-b63811578a94?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    twitterUrl: "#",
    linkedinUrl: "#",
    downloadedBy: {
      firstName: "Nadir",
      country: "United States",
      websiteLink: "/",
    },
  },
  // More Items...
];

const Index = () => {
  const [recentDownloadIllustration, setRecentDownloadIllustration] = useState(
    []
  );
  const [currentPrimaryColors, setCurrentPrimaryColors] = useState([]);
  useEffect(() => {
    const EST_WIDTH = "300";
    const EST_HEIGHT = "200";
    const EST_VIEWBOX = `viewBox="40 -10 400 300"`;
    const MOBILEORDESKTOP = 1; // 1 for desktop, 0 for mobile

    let resizedData = recentDownloadIllustrationByPublic.map((svg, index) => {
      return {
        id: svg.id,
        name: svg.name,
        downloadedBy: svg.downloadedBy,
        data: resizeSVG(
          svg.data,
          EST_WIDTH,
          EST_HEIGHT,
          EST_VIEWBOX,
          MOBILEORDESKTOP
        ),
      };
    });
    setRecentDownloadIllustration([...resizedData]);
    setCurrentPrimaryColors(primaryColors);
  }, []);

  return (
    <div>
      <div className="grid  grid-cols-1">
        <div>
          {/*illutration */}
          <div className="space-y-12 mt-20">
            <div className="sm:px-20 px-4 space-y-12 py-10">
              <Title title={`Recent Download Illustrations`} />
              <ul
                role="list"
                className="space-y-4 grid grid-cols-2 gap-2  sm:space-y-0 lg:grid-cols-5 lg:gap-8"
              >
                {recentDownloadIllustration.length > 0 &&
                  recentDownloadIllustration.map((illustraion, index) => (
                    <li
                      key={`illustraion_${index}`}
                      className="pb-6  border cursor-pointer   rounded-lg  "
                    >
                      <div className="">
                        <h3 className=" mx-1 pt-2 text-lg inline-block">
                          {illustraion.downloadedBy != undefined && illustraion.downloadedBy.firstName}
                        </h3>
                        <span className="h-5 w-5 inline-block float-right pt-2 mx-2">
                          {/* <Link href={illustraion.downloadedBy.websiteLink}> */}
                          <img src="https://img.icons8.com/material-outlined/24/000000/forward-arrow.png" />{" "}
                          {/* </Link> */}
                        </span>
                      </div>
                      <h4 className="mx-2 float-left pb-2 block text-gray-500 text-md ">
                        {illustraion.downloadedBy != undefined && illustraion.downloadedBy.country}
                      </h4>
                      <IllustrationCard
                        illustraion={illustraion}
                        primaryColors={currentPrimaryColors}
                      />
                    </li>
                  ))}
              </ul>
              <div className="space-y-1 pb-4 sm:space-y-1  md:max-w-xl lg:max-w-3xl xl:max-w-none">
                <span className="mx-2 cursor-pointer text-lg float-right ">
                  see More{" "}
                </span>
              </div>
            </div>
          </div>
          {/* Designs */}
          <div className="space-y-12 mt-10 ">
            <div className="sm:px-20 px-4 space-y-12 py-10 ">
              <Title title={`Recent Download Designs`} />
              <ul
                role="list"
                className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6  sm:space-y-0 lg:grid-cols-2 lg:gap-8"
              >
                {Items.slice(0, 4).map((design, index) => (
                  <li
                    key={`design_${index}`}
                    className="pb-8  border cursor-pointer  text-center rounded-lg xl:text-left"
                  >
                    <div className="">
                      <h3 className=" mx-1 pt-2 text-xl inline-block">
                        {design.downloadedBy.firstName}
                      </h3>
                      <span className="h-8 w-8 inline-block float-right pt-2 mx-2">
                        {/* <Link href={illustraion.downloadedBy.websiteLink}> */}
                        <img src="https://img.icons8.com/material-outlined/24/000000/forward-arrow.png" />{" "}
                        {/* </Link> */}
                      </span>
                    </div>
                    <h4 className="mx-2 float-left pb-2 block text-gray-500 text-lg">
                      {design.downloadedBy.country}
                    </h4>
                    <DesignCard design={design} />
                  </li>
                ))}
              </ul>
              <div className="space-y-5 pb-4 sm:space-y-4  md:max-w-xl lg:max-w-3xl xl:max-w-none">
                <span className="mx-2 cursor-pointer text-lg float-right ">
                  see More{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Index;

Index.getLayout = function getLayout(page) {
  return (
    <>
      <Drawer drawerId="activityDrawer" navigation={navigation} />
      <ActivityHeader />
      <main>{page}</main>
      <Footer />{" "}
    </>
  );
};
