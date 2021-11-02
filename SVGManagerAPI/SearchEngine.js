import { FetchAllIllustrations, FetchAllDesigns } from "./helperFunctions";

const SearchEngine = async (type = "all") => {
  let matchedResults = [];

  if (type == "all") {
  } else if (type == "illustration") {
    matchedResults = await FetchAllIllustrations();
  } else if (type == "design") {
    matchedResults = await FetchAllDesigns();
  }
  console.log("-------matched Results-------");
  console.log(matchedResults);
  return matchedResults;
};

export default SearchEngine;
