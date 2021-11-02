import "tailwindcss/tailwind.css";
import { useEffect, useState } from "react";
import SearchBar from "../Components/searchBar";
import CustomDropDown from "../Components/CustomDropDown";
import Title from "../Components/title";
import IllustrationCard from "../Components/illustrationCard";
import DesignCard from "../Components/designCard";
import Layout from "../Components/layout";
import BackgroundSwitch from "../Components/backgroundSwitch";
import primaryColors from "../../SVGManagerAPI/PrimaryColors";
import { withRouter } from "next/router";
import SearchEngine from "../../SVGManagerAPI/SearchEngine";
import GetRefinedKeyword from "../Components/GetRefinedKeyword";
import { SerachFilteredResults } from "../../SVGManagerAPI/SerachFilteredResults";
import resizeSVG from "../../SVGManagerAPI/SVGSizeModifierAPI";

function Index({ router }) {
  const [currentIllustrations, setCurrentIllustrations] = useState([]);
  const [currentPrimaryColors, setCurrentPrimaryColors] = useState([]);
  const [fetchedIllustrations, setFetchedIllustration] = useState([]);
  const [fetchedDesigns, setFetchedDesigns] = useState([]);
  //---------------------------filters states-----------
  const [refinedKeywords, setRefinedKewords] = useState([]);
  const [fetchedResultsFromAPI, setFetchedResultsFromAPI] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [categoryName, setCatgoryName] = useState("all");
  const [sortType, setSortType] = useState("newest");
  const [type, setType] = useState("all");
  const [language, setLanguage] = useState("English");
  const [searchInput, setSerachInput] = useState("");
  const [categoriesList, setCategoriesList] = useState([]);
  const [categoryNames, setCategoryNames] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  const [tagsTitleList, setTagsTitleList] = useState([]);
  //---------------------------------used to fetch results once
  useEffect(() => {
    //console.log(router.query.type);
    if (router.query.searchValue != undefined) {
      const searchValue = router.query.searchValue.toLowerCase();
      if (searchValue != "") setRefinedKewords(GetRefinedKeyword(searchValue));
    }
    if (router.query.type != undefined) setType(router.query.type);

    if (router.query.category != undefined)
      setCatgoryName(router.query.category);
  }, []);
  useEffect(() => {
    if (type != undefined) {
      SearchEngine(type.toLowerCase()).then(
        (data) => {
          console.log("----------search results from serach page---------");
          console.log(data);
          setFetchedResultsFromAPI(data);
        },
        (error) => {
          //console.log(error.message);
        }
      );
    }
  }, [type]);

  useEffect(() => {
    console.log("------when fiters changes---------");
    // console.log(
    //   SerachFilteredResults(
    //     refinedKeywords,
    //     fetchedResultsFromAPI,
    //     categoryName,
    //     selectedTags
    //   )
    // );
  }, [sortType, language, type, categoryName, selectedTags]);

  useEffect(() => {
    const EST_WIDTH = "200";
    const EST_HEIGHT = "200";
    const EST_VIEWBOX = `viewBox="45 -40 400 400"`;
    const MOBILEORDESKTOP = 1; // 1 for desktop, 0 for mobile
    console.log("outside=================");

    if (fetchedResultsFromAPI.illustrations != undefined) {
      console.log("inside here====================================");
      let resizedData = fetchedResultsFromAPI.illustrations.map(
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
      setCurrentIllustrations([...resizedData]);
      setCurrentPrimaryColors([...primaryColors]);
    }
  }, [fetchedResultsFromAPI]);

  // useEffect(() => {
  //   fetch("/api/FrontEnd_api/load_newest_designs_api", {
  //     method: "POST",
  //     body: JSON.stringify({}),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then(
  //       (resp) => {
  //         return resp.json();
  //       },
  //       (error) => {
  //         //console.log(error);
  //       }
  //     )
  //     .then((data) => {
  //       if (data.responseCode == 1) {
  //         //console.log(data.responsePayload);
  //         setFetchedDesigns(data.responsePayload);
  //       } else {
  //         //console.log(data.responseMessage);
  //       }
  //     });
  // }, []);
  // useEffect(() => {
  //   fetch("/api/FrontEnd_api/load_newest_illustrations_api", {
  //     method: "POST",
  //     body: JSON.stringify({}),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then(
  //       (resp) => {
  //         return resp.json();
  //       },
  //       (error) => {
  //         //console.log(error);
  //       }
  //     )
  //     .then((data) => {
  //       if (data.responseCode == 1) {
  //         //console.log(data.responsePayload);
  //         setFetchedIllustration(data.responsePayload);
  //       } else {
  //         //console.log(data.responseMessage);
  //       }
  //     });
  // }, []);

  useEffect(() => {
    fetch("/api/FrontEnd_api/load_all_categories_api", {
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
          //console.log(error);
        }
      )
      .then((data) => {
        if (data.responseCode == 1) {
          //console.log("---------");
          //console.log(data.responsePayload);
          setCategoriesList(data.responsePayload);
        } else {
          //console.log(data.responseMessage);
        }
      });

    fetch("/api/FrontEnd_api/load_all_tags_api", {
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
          //console.log(error);
        }
      )
      .then((data) => {
        if (data.responseCode == 1) {
          //console.log("---------");
          //console.log(data.responsePayload);
          setTagsList(data.responsePayload);
        } else {
          //console.log(data.responseMessage);
        }
      });
  }, []);
  useEffect(() => {
    //console.log("in category names " + categoriesList.length);
    if (categoriesList.length > 0) {
      setCategoryNames(categoriesList.map((category) => category.title));
    }
    if (tagsList.length > 0) {
      setTagsTitleList(tagsList.map((tag) => tag.title));
    }
  }, [categoriesList, tagsList]);

  //handlers

  const handletagSelection = (tagValue, tagId) => {
    setSelectedTags((prevTags) => [...prevTags, tagValue]);
    //console.log("-----------------selected tags-------------");
    //console.log(selectedTags);
    // document.getElementById(tagId).classList.remove("bg-white");
  };

  const handleSearchInputChange = (event) => {
    setSerachInput(event.target.value);
    setRefinedKewords(GetRefinedKeyword(event.target.value));
  };
  const handleSerachButtonClick = (event) => {
    event.preventDefault();
    alert("serach");
  };
  const handleLanguageChange = (value) => {
    setLanguage(value);
  };
  const handlCategoryChange = (value) => {
    setCatgoryName(value);
  };
  const handleSortChange = (value) => {
    setSortType(value);
  };
  const handleTypeChange = (value) => {
    setType(value);
  };
  return (
    <div className="mx-auto ">
      <div className="mx-auto text-center  py-4  justify-items-center bg-gray-100">
        <input
          type="text"
          name="search"
          id="search"
          className={`-ml-px  sm:w-3/6  w-1/2 inline-flex items-center 
            px-4 py-2 border border-gray-300 bg-white text-lg font-medium 
            text-gray-700  focus:z-10 focus:outline-none 
            focus:ring-1 `}
          placeholder="Search..."
          value={searchInput}
          onChange={handleSearchInputChange}
        />
        <button
          type="submit"
          className={`-ml-px inline-flex
       items-center px-10 py-2 rounded-r-md border 
       bg-gray-900 text-white
       border-gray-300 bg-white  text-lg font-medium 
      `}
          onClick={handleSerachButtonClick}
        >
          Search
        </button>
      </div>

      <div className="grid sm:grid-cols-6 ">
        <div className="sm:col-span-1 bg-gray-100">
          <div className="mb-1 sm:py-4 py-1 rounded cursor-pointer bg-gray-100">
            {/*type */}
            <h1 className="text-lg ml-8 ">Type</h1>
            <div className="mx-2 ml-8">
              <CustomDropDown
                options={["all", "design", "illustration"]}
                name={type}
                handleChoice={handleTypeChange}
              />
            </div>
          </div>
          <div className=" mb-1 sm:py-4 py-1  rounded cursor-pointer bg-gray-100">
            {/** categories */}
            <h1 className="text-lg  ml-8">Category</h1>
            <div className="ml-8 mt-1">
              {" "}
              <CustomDropDown
                options={categoryNames}
                name={categoryName}
                handleChoice={handlCategoryChange}
              />
            </div>
          </div>

          <div className="mb-1 sm:py-4 py-1  rounded cursor-pointer bg-gray-100">
            {/* sort */}
            <h1 className="text-lg ml-8">Sort</h1>
            <div className="ml-8 mt-1">
              <CustomDropDown
                options={["newest", "most popular", "older"]}
                name={sortType}
                handleChoice={handleSortChange}
              />
            </div>
          </div>
          <div className="mb-1 sm:py-4 py-1  rounded cursor-pointer bg-gray-100">
            {/* sort */}
            <h1 className="text-lg  ml-8">Language</h1>
            <div className="ml-8 mt-1">
              <CustomDropDown
                options={["English", "Hindhi", "German"]}
                name={language}
                handleChoice={handleLanguageChange}
              />
            </div>
          </div>
          {/* <div className="mb-1 sm:py-4 py-1 rounded cursor-pointer bg-gray-100">
            
            <h1 className="text-lg  ml-8">Background</h1>
            <div className="ml-8 mt-1">
              <BackgroundSwitch />
            </div>
          </div> */}
          <div className="mb-1 sm:py-4 py-1 rounded cursor-pointer bg-gray-100">
            <h1 className="text-lg  ml-8">Tags</h1>
            <div className="sm:mx-10 mb-10 ml-8 justify-items-center">
              {tagsTitleList.map((tag, index) => (
                <span
                  key={`tag_no_${index}`}
                  className="mx-1 inline-block my-1 bg-white border-2 px-4 py-2 rounded-full cursor-pointer"
                  onClick={() => handletagSelection(tag, `tag_no_${index}`)}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="sm:col-span-5">
          {/*Designs*/}
          {(type.toLowerCase() == "design" ||
            type.toLowerCase() == "all") && (
            <div className="space-y-12 ">
              <div className="sm:px-20 px-4  space-y-12 py-10 ">
                <Title title={`Designs`} />
                <ul
                  role="list"
                  className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6  sm:space-y-0 lg:grid-cols-2 lg:gap-8"
                >
                  {fetchedResultsFromAPI.designs != undefined &&
                    fetchedResultsFromAPI.designs
                      .slice(0, 12)
                      .map((design, index) => (
                        <li
                          key={`design_${index}`}
                          className="pb-8  border cursor-pointer  text-center rounded-lg xl:text-left"
                        >
                          <DesignCard design={design} />
                        </li>
                      ))}
                </ul>
                <div className="bg-gray-100 py-2 text-center">
                  <span className="cursor-pointer">Load More</span>
                </div>
              </div>
            </div>
          )}

          {/*Illustrations*/}
          {(type.toLowerCase() == "all" ||
            type.toLowerCase() == "illustration") && (
            <div className="space-y-12 mt-10">
              <div className="sm:px-20 px-4 space-y-12 py-10">
                <Title title={`Illustration`} />

                <ul
                  role="list"
                  className="space-y-4 grid grid-cols-2 gap-2  sm:space-y-0 lg:grid-cols-5 lg:gap-8"
                >
                  {currentIllustrations.map((illustraion, index) => (
                    <li
                      key={`illustraion_${index}`}
                      className="pb-6  border cursor-pointer  text-center rounded-lg  text-center"
                    >
                      <IllustrationCard
                        illustraion={illustraion}
                        primaryColors={currentPrimaryColors}
                      />
                    </li>
                  ))}
                </ul>
                <div className="bg-gray-100 py-2 text-center">
                  <span className="cursor-pointer">Load More</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withRouter(Index);

Index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
