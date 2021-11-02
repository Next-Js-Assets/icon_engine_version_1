import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";
import TableRowHolders from "./TableRowHolders";


function ViewAllUsers(props) {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [shouldListReload, setShouldListReload] = useState(false);
  const [serverResponse, setServerResponse] = useState("Loading...");
  useEffect(() => {
    setShouldListReload(true);
  }, []);
  useEffect(() => {
    // Load designs.
    console.log("We are trying to relaoad the list.");
    if (shouldListReload) {
      fetch("/api/AdminPanel_api/download_downloading_history_of_user_api", {
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
          console.log(data);
          if (data.responseCode === 1) {
            console.log("Loaded history");
            console.log(data.responsePayload);
            setServerResponse("");
            // setListOfAllIllustrations(data.responsePayload);
            let tempArray = [];
            data.responsePayload.forEach((item, index) => {
              let tempDownHist = [];
              let counter=0;
              item.dowloadedIllustrations.forEach((illus,illusIndex)=>{
                tempDownHist.push({
                  downloadId:counter,
                  downloadItemType:"Illustration",
                  downloadItemTitle:illus.illstrationTitle,
                  downloadDateAndTime:"-",
                })
                counter++;
              })

              item.dowloadedDesigns.forEach((design,illusIndex)=>{
                tempDownHist.push({
                  downloadId:counter,
                  downloadItemType:"Design",
                  downloadItemTitle:design.downloadedDesignTitle,
                  downloadDateAndTime:"-",
                })
                counter++;
              })

              tempArray.push({
                _id:item._id,
                downloadId:index,
                userEmail: item.email,
                userName: item.firstName,
                userCountry: item.country,
                userAccountStatus:item.userAccountStatus,
                userWebsite: item.websiteLink,
                userDownloadingHistor:tempDownHist
              });

             
            });
            setListOfUsers(tempArray);
          } else if (data.responseCode === 2) {
            console.log(data);
            setServerResponse(data.responseMessage);
          } else {
          }
        });
    }
  }, [shouldListReload]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {"Name"}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {"Email"}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {"Country"}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {"Website"}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
             {" Account Status"}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {"Total Downloads"}
            </th>
          </tr>
        </thead>
        <tbody>
          {listOfUsers.map((person, personIdx) => {
            return (
              <TableRowHolders
                key={personIdx}
                personIdx={personIdx}
                person={person}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ViewAllUsers;
