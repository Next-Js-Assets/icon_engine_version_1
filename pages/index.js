import { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import Title from "./Components/title";
import TopSearchBarContainer from "./Components/topSearchBarContainer";
import Layout from "./Components/layout";
// routing
import Link from "next/link";
import { useRouter } from "next/router";
// modals
import ShowDesignModal from "./Components/showDesignModal";
import DownloadIllustrationModal from "./Components/downloadIllustrationModal";
import IllustrationCard from "./Components/illustrationCard";
import DesignCard from "./Components/designCard";
import CategoryCard from "./Components/categoryCard";
import svgData from "../SVGManagerAPI/svgData";
import resizeSVG from "../SVGManagerAPI/SVGSizeModifierAPI";
import primaryColors from "../SVGManagerAPI/PrimaryColors";
import SearchEngine from "../SVGManagerAPI/SearchEngine";
import { serialize } from "bson";

const Items = [
  {
    name: "Leonard Krasner",
    role: "Senior Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1633264985178-d23fa9a59c96?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    twitterUrl: "#",
    linkedinUrl: "#",
    languages: 3,
  },
  {
    name: "Leonard Krasner",
    role: "Senior Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1633289475421-f0f851f6f00e?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    twitterUrl: "#",
    linkedinUrl: "#",
    languages: 2,
  },
  {
    name: "Leonard Krasner",
    role: "Senior Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1633313559082-5db0c86df12d?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOXx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    linkedinUrl: "#",
  },
  {
    name: "Leonard Krasner",
    role: "Senior Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1627293007095-8b335ebae6e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDN8TThqVmJMYlRSd3N8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
    twitterUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Leonard Krasner",
    role: "Senior Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1633113213095-5fda85346b43?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    twitterUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Leonard Krasner",
    role: "Senior Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1633113089635-115b38c66c49?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwyMXx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    twitterUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Leonard Krasner",
    role: "Senior Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1627490654190-61d45cb41693?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDF8TThqVmJMYlRSd3N8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
    twitterUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Leonard Krasner",
    role: "Senior Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1633277190581-d26618118553?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    linkedinUrl: "#",
  },
  {
    name: "Leonard Krasner",
    role: "Senior Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    twitterUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Leonard Krasner",
    role: "Senior Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1633295174543-b63811578a94?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    twitterUrl: "#",
    linkedinUrl: "#",
  },
  // More Items...
];

function Index(props) {
  const router = useRouter();
  useEffect(() => {
    fetch("/api/FrontEnd_api/load_newest_illustrations_api", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(
        (resp) => {
          return resp.json();
        },
        (error) => {
          console.log(error);
        }
      )
      .then((data) => {
        if (data.responseCode == 1) {
          console.log(data.responsePayload);
          setfetchedNewestIllustrationFromAPI(data.responsePayload);
        } else {
          console.log(data.responseMessage);
        }
      });
  }, []);
  useEffect(() => {
    fetch("/api/FrontEnd_api/load_most_popular_illustrations_api", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(
        (resp) => {
          return resp.json();
        },
        (error) => {
          console.log(error);
        }
      )
      .then((data) => {
        if (data.responseCode == 1) {
          console.log(data.responsePayload);
          setfetchedPopularIllustrationFromAPI(
            data.responsePayload.map((item) => item.allFields)
          );
          // setfetchedPopularIllustrationFromAPI(data.responsePayload);
        } else {
          console.log(data.responseMessage);
        }
      });
  }, []);
  // let iteraotor;

  // const [fetchedCategories, setFetchedCategories] = useState([]);

  // useEffect(() => {
  //   iteraotor = fetchMoreCategories();
  //   setFetchedCategories(iteraotor.next().value);
  //   console.log("in use effect");
  // });

  // //genratorfor categories
  // function* fetchMoreCategories() {
  //   let index = 9;
  //   while (index < categories.length) {
  //     yield categories.slice(index, index + 9);
  //     index = index + 9;
  //     console.log(index);
  //   }
  // }
  const [newIllustrations, setNewIllustrations] = useState([]);
  const [popularIllustrations, setPopularIllustrations] = useState([]);
  const [
    fetchedNewestIllustrationFromAPI,
    setfetchedNewestIllustrationFromAPI,
  ] = useState([]);
  const [
    fetchedPopularIllustrationFromAPI,
    setfetchedPopularIllustrationFromAPI,
  ] = useState([]);
  useEffect(() => {
    const EST_WIDTH = "300";
    const EST_HEIGHT = "200";
    const EST_VIEWBOX = `viewBox="40 -10 400 300"`;
    const MOBILEORDESKTOP = 1; // 1 for desktop, 0 for mobile

    let resizedDataForNewestIllustration = fetchedNewestIllustrationFromAPI.map(
      (illustration, index) => {
        return {
          id: illustration._id,
          name: illustration.IllustrationTitle,
          description: illustration.IllustrationDescription,
          languages: illustration.attachedLanguages,
          uploadDate: illustration.uploadDate,
          downloadingHistory: illustration.downloadingHistory,
          attachedCatagories: illustration.attachedCatagories,
          attachedTags: illustration.attachedTags,
          data: resizeSVG(
            illustration.IllustrationThumbnail,
            EST_WIDTH,
            EST_HEIGHT,
            EST_VIEWBOX,
            MOBILEORDESKTOP
          ),
        };
      }
    );
    let resizedDataForPopularIllustartion =
      fetchedPopularIllustrationFromAPI.map((illustration, index) => {
        return {
          id: illustration._id,
          name: illustration.IllustrationTitle,
          description: illustration.IllustrationDescription,
          languages: illustration.attachedLanguages,
          uploadDate: illustration.uploadDate,
          downloadingHistory: illustration.downloadingHistory,
          attachedCatagories: illustration.attachedCatagories,
          attachedTags: illustration.attachedTags,
          data: resizeSVG(
            illustration.IllustrationThumbnail,
            EST_WIDTH,
            EST_HEIGHT,
            EST_VIEWBOX,
            MOBILEORDESKTOP
          ),
        };
      });
    setNewIllustrations([...resizedDataForNewestIllustration]);
    setPopularIllustrations([...resizedDataForPopularIllustartion]);
    setCurrentPrimaryColors(primaryColors);
  }, [fetchedNewestIllustrationFromAPI, fetchedPopularIllustrationFromAPI]);
  // local states
  const [openShowDesignModal, setOpenShowDesignModal] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState({});
  const [currentPrimaryColors, setCurrentPrimaryColors] = useState([]);

  // handlers
  const handleSeeMoreCategoriesClick = () => {
    alert("show more");
    // setFetchedCategories((prev) => [...prev, ...iteraotor.next().value]);
  };
  const handleShowDesignModalClose = () => {
    setOpenShowDesignModal(false);
  };
  const handleShowDesignModalOpen = () => {
    setOpenShowDesignModal(true);
  };
  const handleStartUsingDesignClick = (design) => {
    setSelectedDesign(design);
    handleShowDesignModalOpen();
  };

  const handleGetSerachText = (searchValue, type) => {
    router.push({
      pathname: "/search",
      query: { type, searchValue },
    });
  };
  // return component
  return (
    <div className="mx-auto  lg:py-24">
      <div className="sm:px-44">
        <TopSearchBarContainer handleGetSerachText={handleGetSerachText} />
      </div>
      {/* categories*/}
      <div className="mt-40 bg-gray-900">
        <div className="sm:px-20 px-4  space-y-12 py-10">
          <Title title={`Categories`} color={`text-white`} />
          <ul
            role="list"
            className="space-y-4 grid grid-cols-2 gap-2 bg-gray-900 sm:space-y-0  lg:grid-cols-5 lg:gap-8"
          >
            {Items.map((category, index) => (
              <li
                key={`category_${index}`}
                className="py-10 px-4 border cursor-pointer bg-white text-center rounded-lg xl:px-4 xl:text-left"
              >
                <CategoryCard category={category} />
              </li>
            ))}
          </ul>
          <div className="space-y-5 pb-4 sm:space-y-4  md:max-w-xl lg:max-w-3xl xl:max-w-none">
            <span
              className="mx-2 cursor-pointer text-lg float-right text-white"
              onClick={handleSeeMoreCategoriesClick}
            >
              see More{" "}
            </span>
          </div>
        </div>
      </div>

      {/*illutration */}
      <div className="space-y-12 mt-20">
        <div className="sm:px-20 px-4  space-y-12 py-10">
          <Title title={`New Illustration`} />
          <ul
            role="list"
            className="space-y-4 grid grid-cols-2 gap-2  sm:space-y-0 lg:grid-cols-5 lg:gap-8"
          >
            {newIllustrations.map((illustraion, index) => (
              <li
                key={`newIllustraion_${index}`}
                className="pb-6  border cursor-pointer  text-center rounded-lg  text-center"
              >
                <IllustrationCard
                  illustraion={illustraion}
                  primaryColors={currentPrimaryColors}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-15 mt-20 bg-gray-100">
        <div className="sm:px-20 px-4  space-y-12 py-10">
          <Title title={`Most Popular Illustration`} />
          <ul
            role="list"
            className="space-y-4 grid grid-cols-2 gap-2  sm:space-y-0 lg:grid-cols-5 lg:gap-8"
          >
            {popularIllustrations.map((illustraion, index) => (
              <li
                key={`popularIllustration_${index}`}
                className="pb-6  bg-white cursor-pointer  text-center rounded-lg  text-center"
              >
                <IllustrationCard
                  illustraion={illustraion}
                  primaryColors={currentPrimaryColors}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/*Show Design Details Modal*/}
      <ShowDesignModal
        open={openShowDesignModal}
        handleClose={handleShowDesignModalClose}
        selectedDesign={selectedDesign}
      />
      {/* Designs */}
      <div className="space-y-12 mt-20 ">
        <div className="sm:px-20 sm:mx-20 mx-4 space-y-12 py-10 ">
          <Title title={`New Designs`} />
          <ul
            role="list"
            className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6  sm:space-y-0 lg:grid-cols-2 lg:gap-8"
          >
            {Items.map((design, index) => (
              <li
                key={`design_${index}`}
                className="pb-8  border cursor-pointer  text-center rounded-lg xl:text-left"
              >
                <DesignCard
                  design={design}
                  handleStartUsingDesignClick={handleStartUsingDesignClick}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-12 mt-20 bg-gray-900 pb-10">
        <div className="sm:px-20 sm:mx-20 mx-4  space-y-12 py-10 ">
          <Title title={`Most Popular Designs`} color={`text-white`} />
          <ul
            role="list"
            className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6  sm:space-y-0 lg:grid-cols-2 lg:gap-8"
          >
            {Items.map((design, index) => (
              <li
                key={`design_${index}`}
                className="pb-8 cursor-pointer bg-white  text-center rounded-lg xl:text-left"
              >
                <DesignCard
                  design={design}
                  handleStartUsingDesignClick={handleStartUsingDesignClick}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Index;

Index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
