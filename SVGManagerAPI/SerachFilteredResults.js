import { createNextState } from "@reduxjs/toolkit";

export const SerachFilteredResults = (
  refinedKeywords,
  fetchedResults,
  selectedCategoriesValue,
  selectedTagsValue
) => {
  console.log("--------inside SerachFilteredResults---------");
  // when input is empty
  if (refinedKeywords.length == 0) {
    console.log("------when input is empty")
    // check for categories
    if (selectedCategoriesValue != "all") {
      let resultsBasedOnCategory = fetchedResults.filter((illustraion) => {
        let illustraionFound = false;
        illustraion.attachedCatagories.forEach((category) => {
          if (category.label.toLowerCase() == selectedCategoriesValue) {
            illustraionFound = true;
          }
        });
        if (illustraionFound) {
          return illustraion;
        }
      });
      if (selectedTagsValue.length == 0) {
        return resultsBasedOnCategory;
      } else {
        let resultsBasedOnTags = fetchedResults.filter((illustraion) => {
          let illustraionFound = false;
          illustraion.attachedTags.forEach((tag) => {
            if (tag.label.toLowerCase() == selectedTagsValue) {
              illustraionFound = true;
            }
          });
          if (illustraionFound) {
            return illustraion;
          }
        });
        return resultsBasedOnTags;
      }
    } else {
      if (selectedTagsValue.length == 0) {
        return fetchedResults;
      } else {
        let resultsBasedOnTags = fetchedResults.filter((illustraion) => {
          let illustraionFound = false;
          illustraion.attachedTags.forEach((tag) => {
            if (tag.label.toLowerCase() == selectedTagsValue) {
              illustraionFound = true;
            }
          });
          if (illustraionFound) {
            return illustraion;
          }
        });
        return resultsBasedOnTags;
      }
    }
  } else if (refinedKeywords.length > 0) {
    console.log("when ther eis something in input")
  }
};
