import "tailwindcss/tailwind.css";
import { useEffect, useState } from "react";
import SearchBar from "../Components/searchBar";
import CustomDropDown from "../Components/CustomDropDown";
import Title from "../Components/title";
import ShowDesignModal from "../Components/showDesignModal";
import IllustrationCard from "../Components/illustrationCard";
import DesignCard from "../Components/designCard";
import Layout from "../Components/layout";
import BackgroundSwitch from "../Components/backgroundSwitch";
import primaryColors from "../../SVGManagerAPI/PrimaryColors";
import svgData from "../../SVGManagerAPI/svgData";
import getSizeDetails from "../../SVGManagerAPI/SVGSizeModifierAPI";
import { withRouter } from "next/router";
import SearchEngine from "../../SVGManagerAPI/SearchEngine";
import GetRefinedKeyword from "../Components/GetRefinedKeyword";
import {SerachFilteredResults} from '../../SVGManagerAPI/SerachFilteredResults'
const Items = [
  {
    name: "Leonard Krasner",
    role: "Senior Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1633264985178-d23fa9a59c96?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    twitterUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Leonard Krasner",
    role: "Senior Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1633289475421-f0f851f6f00e?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    twitterUrl: "#",
    linkedinUrl: "#",
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
  {
    name: "Leonard Krasner",
    role: "Senior Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1633264985178-d23fa9a59c96?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    twitterUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Leonard Krasner",
    role: "Senior Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1633289475421-f0f851f6f00e?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    twitterUrl: "#",
    linkedinUrl: "#",
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

const tags = [
  "Bussiness",
  "art",
  "facebook",
  "office work",
  "bussiness workers",
  "Bussiness",
  "art",
  "facebook",
  "office work",
  "bussiness workers",
  "art",
  "facebook",
  "office work",
  "bussiness workers",
];

function Index({ router }) {
  const [openShowDesignModal, setOpenShowDesignModal] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState({});
  const [currentIllustrations, setCurrentIllustrations] = useState([]);
  const [currentPrimaryColors, setCurrentPrimaryColors] = useState([]);
  //---------------------------filters states-----------
  const [refinedKeywords, setRefinedKewords] = useState([]);
  const [fetchedResultsFromAPI, setFetchedResultsFromAPI] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [categoryName, setCatgoryName] = useState("all");
  const [sortType, setSortType] = useState("newest");
  const [type, setType] = useState("all");
  const [language, setLanguage] = useState("English");
  const [searchInput, setSerachInput] = useState("");
  //---------------------------------used to fetch results once
  useEffect(() => {
    const searchValue = router.query.searchValue.toLowerCase();
    setType(router.query.type);
    if (searchValue != "") setRefinedKewords(GetRefinedKeyword(searchValue));
  }, []);
  useEffect(() => {
    SearchEngine(type).then(
      (data) => {
          console.log("----------search results---------");
          console.log(data);
          setFetchedResultsFromAPI(data);
      },
      (error) => {
        console.log(error.message);
      }
    );
  }, [type]);
  useEffect(() => {
    console.log("------when fiters changes---------");
    console.log(
      SerachFilteredResults(
        refinedKeywords,
        fetchedResultsFromAPI,
        categoryName,
        selectedTags
      )
    );
  }, [sortType, language, type, categoryName, selectedTags]);

  useEffect(() => {
    const EST_WIDTH = "200";
    const EST_HEIGHT = "200";
    const EST_VIEWBOX = `viewBox="45 -40 400 400"`;
    const MOBILEORDESKTOP = 1; // 1 for desktop, 0 for mobile
    let resizedData = svgData.map((svg, index) => {
      return {
        id: svg.id,
        name: svg.name,
        data: getSizeDetails(
          svg.data,
          EST_WIDTH,
          EST_HEIGHT,
          EST_VIEWBOX,
          MOBILEORDESKTOP
        ),
      };
    });
    setCurrentIllustrations([...resizedData]);
    setCurrentPrimaryColors([...primaryColors]);
  }, []);
  //handlers
  const handleShowDesignModalClose = () => {
    setOpenShowDesignModal(false);
  };
  const handletagSelection = (tagValue) => {
    setSelectedTags((prevTags) => [...prevTags, tagValue]);
  };
  const handleShowDesignModalOpen = () => {
    setOpenShowDesignModal(true);
  };
  const handleStartUsingDesignClick = (design) => {
    setSelectedDesign(design);
    handleShowDesignModalOpen();
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
      {/*Show Design Details Modal*/}
      <ShowDesignModal
        open={openShowDesignModal}
        handleClose={handleShowDesignModalClose}
        selectedDesign={selectedDesign}
      />
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
                options={["bussiness", "game", "social"]}
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
              {tags.slice(0, 9).map((tag, index) => (
                <span
                  key={index}
                  className="mx-1 inline-block my-1 bg-white border-2 px-4 py-2 rounded-full cursor-pointer"
                  onClick={() => handletagSelection(tag)}
                >
                  {tag}
                </span>
              ))}
              <span
                className="mx-1 inline-block my-1 bg-white border-2 px-4 py-2 rounded-full cursor-pointer"
                onClick={() => alert("show more")}
              >
                {" "}
                {`+${tags.length - 9}`}
              </span>
            </div>
          </div>
        </div>
        <div className="sm:col-span-5">
          {/*Designs*/}
          <div className="space-y-12 ">
            <div className="sm:px-20 px-4  space-y-12 py-10 ">
              <Title title={`Designs`} />
              <ul
                role="list"
                className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6  sm:space-y-0 lg:grid-cols-2 lg:gap-8"
              >
                {Items.slice(0, 4).map((design, index) => (
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
              <div className="bg-gray-100 py-2 text-center">
                <span className="cursor-pointer">Load More</span>
              </div>
            </div>
          </div>

          {/*Illustrations*/}
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
        </div>
      </div>
    </div>
  );
}

export default withRouter(Index);

Index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
