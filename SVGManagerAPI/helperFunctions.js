import { listOfDesigns, listOfIllustrations } from "./TestData";
const hexToRgb = (hex) => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};
export default hexToRgb;

export const FetchAllIllustrations = async () => {
  // let fetchedIllustration=[]
  // fetch("/api/UserSide_api/load_illustrations_api", {
  //   method: "GET",
  //   body: JSON.stringify({}),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // })
  //   .then(
  //     (resp) => {
  //       return resp.json();
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   )
  //   .then((data) => {
  //     console.log(data);
  //     if (data.responseCode === 1) {
  //       fetchedIllustration = data.responsePayload
  //     }
  //   });
  return listOfIllustrations;
};

export const FetchAllDesigns = async () => {
  // let fetchedDesigns = [];
  // fetch("/api/UserSide_api/load_designs_api", {
  //   method: "GET",
  //   body: JSON.stringify({}),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // })
  //   .then(
  //     (resp) => {
  //       return resp.json();
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   )
  //   .then((data) => {
  //     console.log(data);
  //     if (data.responseCode === 1) {
  //       fetchedDesigns = data.responsePayload;
  //     }
  //   });
  return listOfDesigns;
};
