import { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import Title from "../Components/title";
import Layout from "../Components/layout";
// routing
import Link from "next/link";
import SearchBar from "../Components/searchBar";
import ColorPickerContainer from "../Components/colorPickerContainer";
import primaryColors from "../../SVGManagerAPI/PrimaryColors";
import DownloadIllustrationModal from "../Components/downloadIllustrationModal";
import CategoryCard from "../Components/categoryCard";
import IllustrationCard from "../Components/illustrationCard";
import BackgroundSwitch from "../Components/backgroundSwitch";
import svgData from "../../SVGManagerAPI/svgData";
import { useMediaQuery } from "@mui/material";
import produce from "immer";
import resizeSVG from "../../SVGManagerAPI/SVGSizeModifierAPI";

function Index(props) {
  // local states
  const [popularIllustrations, setPopularIllustrations] = useState([]);
  const [newIllustrations, setNewIllustrations] = useState([]);
  const [
    fetchedNewestIllustrationFromAPI,
    setfetchedNewestIllustrationFromAPI,
  ] = useState([]);
  const [
    fetchedPopularIllustrationFromAPI,
    setfetchedPopularIllustrationFromAPI,
  ] = useState([]);
  const [currentPrimaryColors, setCurrentPrimaryColors] = useState([]);
  const [targetColor, setTargetColor] = useState({
    currentValue: null,
    prevValue: null,
    colorKey: null,
  });

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
  // handlers
  const handleSeeMoreCategoriesClick = () => {
    alert("show more");
    // setFetchedCategories((prev) => [...prev, ...iteraotor.next().value]);
  };
  const handleOpenIllustrationModal = (
    svgToDisplay,
    name,
    primaryColorsPosition
  ) => {
    // console.log(Item);
    setSelectedIllustration({ svgToDisplay, name, primaryColorsPosition });
    setOpenIllustrationModal(true);
  };

  const handleColorChange = (e) => {
    console.log("in handle color change");

    let newPrimaryColors = currentPrimaryColors.map((color) => {
      if (color.colorKey == e.target.id) {
        setTargetColor(
          produce(targetColor, (draft) => {
            draft.colorKey = color.colorKey;
            draft.prevValue = color.colorValue;
            draft.currentValue = e.target.value;
            return draft;
          })
        );
        return { colorValue: e.target.value, colorKey: color.colorKey };
      } else return color;
    });
    setCurrentPrimaryColors(newPrimaryColors);
  };

  return (
    <div className="mx-auto  lg:py-10">
      <div className="sm:px-20 px-4 ">
        <div className="sm:pb-10 pb-5 pt-5 sm:pt-1">
          <Title title={"Illustration"} fontSize={"text-6xl"} />
        </div>
        <input
          type="text"
          name="search"
          id="search"
          className={`-ml-px  sm:w-96 w:36 mb:2 inline-flex items-center 
      px-4 py-2 border border-gray-300 bg-white text-sm font-medium 
      text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none 
      focus:ring-1 focus:ring-gray-500 focus:border-gray-500`}
          placeholder="Search..."
        />
        <button
          type="submit"
          className={`-ml-px inline-flex
       items-center px-10 py-2 rounded-r-md border 
       bg-gray-900 text-white
       border-gray-300 bg-white text-sm font-medium 
      `}
        >
          Search
        </button>
        <div className="ml-0 sm:ml-3 block sm:inline mt-5  sm:mt-0">
          <ColorPickerContainer
            handleColorChange={handleColorChange}
            currentPrimaryColors={currentPrimaryColors}
          />
        </div>
        {/* <div className="ml-0 sm:ml-3 block sm:inline mt-5 bg-white rounded-md border border-gray-300 py-3 px-2  sm:mt-0">
          <label className="text-sm mr-1 font-medium text-gray-700">
            Background
          </label>{" "}
          <BackgroundSwitch />
        </div> */}
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
                key={`illustraion_${index}`}
                className="pb-6  border  text-center rounded-lg  text-center"
              >
                <IllustrationCard
                  illustraion={illustraion}
                  targetColor={targetColor}
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
                key={`illustraion_${index}`}
                className="pb-6  bg-white cursor-pointer  text-center rounded-lg  text-center"
              >
                <IllustrationCard
                  illustraion={illustraion}
                  targetColor={targetColor}
                  primaryColors={currentPrimaryColors}
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
