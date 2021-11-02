import { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import Title from "../Components/title";
import Layout from "../Components/layout";
// routing
import Link from "next/link";
import SearchBar from "../Components/searchBar";
import DesignCard from "../Components/designCard";
import CategoryCard from "../Components/categoryCard";
import ShowDesignModal from "../Components/showDesignModal";
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
    languages: 3,
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
  const [openShowDesignModal, setOpenShowDesignModal] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState({});

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

  // return component
  return (
    <div className="mx-auto  lg:py-10">
      <div className="sm:px-20 px-4 ">
        <div className="sm:pb-10 pb-5 pt-5 sm:pt-1">
          <Title title={"Design"} fontSize={"text-6xl"} />
        </div>
        <input
          type="text"
          name="search"
          id="search"
          className={`-ml-px  sm:w-96 w:full inline-flex items-center 
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
      </div>
     
      {/*Show Design Details Modal*/}
      <ShowDesignModal
        open={openShowDesignModal}
        handleClose={handleShowDesignModalClose}
        selectedDesign={selectedDesign}
      />
      {/* Designs */}
      <div className="space-y-12 mt-20 ">
        <div className="sm:px-20 sm:mx-20 mx-4  space-y-12 py-10 ">
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

      <div className="space-y-12 mt-20 bg-gray-100 pb-10">
        <div className="sm:px-20 sm:mx-20 mx-4  space-y-12 py-10 ">
          <Title title={`Most Popular Designs`} />
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
