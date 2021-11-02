/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";
import ChipsList from "../../../Support/ChipsList";
import SelectSecondaryLangaugeModal from "./SelectSecondaryLangaugeModal";
import produce from "immer";
export default function EditDesignModal({setShouldListReload,...props}) {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [isAddSecondaryLanguageModalOpen, setIsAddSecondaryLaguageModalOpen] =
    useState(false);
  const [listOfSelectedCatagories, setListOfSelectedCatagories] = useState([]);
  const [listOfSelectedTags, setListOfSelectedTags] = useState([]);
  const [listOfSecondaryLanguages, setListOfSecondaryLanguages] = useState([]);
  const [primaryLanguage, setPrimaryLanguage] = useState("English");
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [title, setTitle] = useState();
  const [referLink, setReferLink] = useState();
  const [description, setDescription] = useState();
  const [listOfCatagories, setListOfCatagories] = useState([]);
  const [listOfTags, setListOfTags] = useState([]);
  const [serverResponse,setServerResponse]=useState("")
  const [listOfLanguages, setListOfLanguages] = useState([
    {
      title: "Language 1",
    },
    {
      title: "Language 2",
    },
    {
      title: "Language 3",
    },
    {
      title: "Language 4",
    },
  ]);

  useEffect(() => {
    setOpen(props.isOpen); 
    setListOfSecondaryLanguages(props.selectedItem.attachedLanguages);
    console.log("HERERER")
    console.log(props.selectedItem.attachedLanguages)
    setListOfSelectedCatagories(props.selectedItem.attachedCatagories);
    setListOfSelectedTags(props.selectedItem.attachedTags);
    setSelectedThumbnail(props.selectedItem.designThumbnail);
    setTitle(props.selectedItem.designTitle);
    setReferLink(props.selectedItem.designCanvaLink);
    setDescription(props.selectedItem.designDescription);
    
  }, [props.isOpen]);

  console.log("outside")
  console.log(listOfSecondaryLanguages);

  useEffect(() => {
    // Loading catagories and tags.
   
    fetch("/api/AdminPanel_api/load_catagories_api", {
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
          setListOfCatagories(data.responsePayload);
        } else if (data.responseCode === 2) {
          console.log(data);
        } else {
        }
      });
    fetch("/api/AdminPanel_api/load_tags_api", {
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
          setListOfTags(data.responsePayload);
        } else if (data.responseCode === 2) {
          console.log(data);
        } else {
        }
      });
  }, []);

  const handelSelectCatagory = (event) => {
    setListOfSelectedCatagories(
      produce(listOfSelectedCatagories, (draft) => {
        draft.push({ key: new Date().getTime(), label: event.target.value });
        return draft;
      })
    );
  };

  const handeSelectTag = (event) => {
    setListOfSelectedTags(
      produce(listOfSelectedTags, (draft) => {
        draft.push({ key: new Date().getTime(), label: event.target.value });
        return draft;
      })
    );
  };

  const handelUpdate = () => {
    setServerResponse("Please wait.. ")
    const data = {
      _id:props.selectedItem._id,
      designTitle: title,
      designCanvaLink: referLink,
      designThumbnail: selectedThumbnail,
      designDescription: description,
      attachedCatagories: listOfSelectedCatagories,
      attachedTags: listOfSelectedTags,
      attachedLanguages: listOfSecondaryLanguages,
    };
    fetch("/api/AdminPanel_api/update_design_api", {
      method: "POST",
      body: JSON.stringify(data),
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
          // setListOfCatagories(data.responsePayload);
          props.setIsOpen(false);
          setOpen(false);
          setServerResponse("Updated")
          setShouldListReload(true);
        } else if (data.responseCode === 2) {
          console.log(data);
          setServerResponse(data.responsePayload)
        } else {
        }
      });
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={() => {
          setOpen(false);
          props.setIsOpen(false);
        }}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <form className="space-y-8 divide-y divide-gray-200">
                  <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                    <div>
                      <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          New Desing
                        </h3>
                      </div>

                      <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                          <label
                            htmlFor="titleLink"
                            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                          >
                            Title
                          </label>
                          <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <div className="max-w-lg flex rounded-md shadow-sm">
                              <input
                                type="text"
                                name="titleLink"
                                id="titleLink"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                autoComplete="titleLink"
                                className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                          <label
                            htmlFor="canvaLink"
                            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                          >
                            Refer Link
                          </label>
                          <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <div className="max-w-lg flex rounded-md shadow-sm">
                              <input
                                type="text"
                                name="canvaLink"
                                id="canvaLink"
                                value={referLink}
                                onChange={(e) => setReferLink(e.target.value)}
                                autoComplete="canvaLink"
                                className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                          <label
                            htmlFor="about"
                            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                          >
                            Description
                          </label>
                          <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <textarea
                              id="about"
                              name="about"
                              rows={3}
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                            />
                            <p className="mt-2 text-sm text-gray-500">
                              Write a few sentences about designing
                            </p>
                          </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                          <label
                            htmlFor="cover-photo"
                            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                          >
                            Cover photo
                          </label>
                          <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                              <div className="space-y-1 text-center">
                                <div>
                                  {selectedThumbnail != null ? (
                                    <div
                                      style={{
                                        height: "12rem",
                                        width: "12rem",
                                      }}
                                    >
                                      <img src={selectedThumbnail} />
                                    </div>
                                  ) : (
                                    <div>
                                      <svg
                                        className="mx-auto h-12 w-12 text-gray-400"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="1 0 48 48"
                                        aria-hidden="true"
                                      >
                                        <path
                                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </div>
                                  )}
                                </div>
                                <div className="flex text-sm text-gray-600">
                                  <label
                                    htmlFor="file-upload"
                                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                  >
                                    <span>Upload a file</span>
                                    <input
                                      id="file-upload"
                                      name="file-upload"
                                      type="file"
                                      className="sr-only"
                                      onChange={(e) => {
                                        // setSelectedThumbnail(e.target.files[0])
                                        var reader = new FileReader();
                                        reader.readAsDataURL(e.target.files[0]);
                                        reader.onload = function () {
                                          setSelectedThumbnail(reader.result);
                                        };
                                        reader.onerror = function (error) {
                                          console.log("Error: ", error);
                                        };
                                      }}
                                    />
                                  </label>
                                  <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">
                                  PNG, JPG, GIF up to 10MB
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                      <div className="sm:grid lg:grid lg:grid-cols-1 sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label
                          htmlFor="catagory"
                          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Select Catagory
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <select
                            id="catagory"
                            name="catagory"
                            autoComplete="catagory"
                            className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                            onChange={handelSelectCatagory}
                          >
                            {listOfCatagories.map((item, index) => {
                              return (
                                <option id={index} key={index}>
                                  {item.title}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div>
                          <ChipsList
                            data={listOfSelectedCatagories}
                            setData={setListOfSelectedCatagories}
                          />
                        </div>
                      </div>

                      <div className="sm:grid lg:grid lg:grid-cols-1 sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Select tags
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <select
                            id="country"
                            name="country"
                            autoComplete="country"
                            className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                            onChange={handeSelectTag}
                          >
                            {listOfTags.map((item, index) => {
                              return (
                                <option id={index} key={index}>
                                  {item.title}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div>
                          <ChipsList
                            data={listOfSelectedTags}
                            setData={setListOfSelectedTags}
                          />
                        </div>
                      </div>

                      <div className="sm:grid lg:grid lg:grid-cols-1 sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <div>{`Primary Language : ${primaryLanguage}`}</div>
                        <div>
                          {" "}
                          <button
                            type="button"
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={(e) => {
                              setIsAddSecondaryLaguageModalOpen(true);
                            }}
                          >
                            Add/Remove Secondary langauge
                          </button>
                        </div>
                        <div>
                          <ChipsList
                            isDeleteAllow={false}
                            data={listOfSecondaryLanguages}
                            setData={setListOfSecondaryLanguages}
                          />
                        </div>

                        {
                          <SelectSecondaryLangaugeModal
                            listOfSecondaryLanguages={listOfSecondaryLanguages}
                            setListOfSecondaryLanguages={
                              setListOfSecondaryLanguages
                            }
                            isOpen={isAddSecondaryLanguageModalOpen}
                            setIsOpen={setIsAddSecondaryLaguageModalOpen}
                          />
                        }
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                  onClick={() => {
                    // props.setIsOpen(false);
                    // setOpen(false);
                    handelUpdate();
                  }}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => {
                    setOpen(false);
                    props.setIsOpen(false);
                  }}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
