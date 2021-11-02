import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";
import { ExclamationIcon, XIcon } from "@heroicons/react/outline";
import BackgroundSwitch from "./backgroundSwitch";
import SVGToPNG from "../../SVGManagerAPI/SVGToPNG";
export default function SvgOrPngDialog({
  open = false,
  handleClose,
  selectedIllustration,
  selectedIllustrationTitle,
  selectedIllustrationDescription,
  selectedIllustrationId,
  fileName,
  userEmail = "nigeetawadhwani@gmail.com",
  userCountry = "pakistan",
  userWebsiteLink = "http://facebook.com",
  userName = "Nigeeta",
}) {
  const cancelButtonRef = useRef(null);
  const [PNGFormat, setPNGFormat] = useState(null);
  // useEffect(() => {
  // //  console.log("from svg and png");
  //   //console.log(selectedIllustration);
  // }, [selectedIllustration]);

  const handleDownloadPGN = () => {
    let data = {
      svg: selectedIllustration,
      mimetype: "image/png",
      width: 300,
      height: 200,
      quality: 1,
      outputFormat: "blob",
    };
    SVGToPNG(data)
      .then((outputData) => {
        downloadFile(outputData);
        addRecordInHistroy();
      })
      .catch(function (err) {
        // Log any error
        console.log(err);
      });
  };
  const downloadFile = (data) => {
    // console.log("downloading png file");
    const imageURL = URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = imageURL;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadSVG = async () => {
    let svg = selectedIllustration;
    const blob = await new Blob([svg], { type: "image/svg+xml" });
    // console.log("svg blob");
    // console.log(blob);
    downloadFile(blob);
    addRecordInHistroy();
  };
  const addRecordInHistroy = () => {
    let data = {
      email: userEmail,
      name: userName,
      country: userCountry,
      websiteLink: userWebsiteLink,
      illustrationId: selectedIllustrationId,
      illstrationTitle: selectedIllustrationTitle,
      illustrationThumbnail: selectedIllustration,
      illustrationDescription: selectedIllustrationDescription,
    };
    fetch("/api/FrontEnd_api/add_downloaded_Illustration_record_api", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(
        (res) => res.json(),
        (err) => console.log(err)
      )
      .then((data) => {
        if (data.responseCode == 1) {
          handleClose();
        } else {
          console.log(data.responseMessage);
        }
      });
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto "
        initialFocus={cancelButtonRef}
        onClose={handleClose}
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
            <Dialog.Overlay className="fixed inset-0 bg-gray-300 bg-opacity-20 transition-opacity" />
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
            <div
              className="inline-block 
            align-bottom bg-white rounded-lg px-1 w-1/4 pt-5 pb-4 
            text-left overflow-hidden shadow-xl transform 
            transition-all sm:my-8 sm:align-middle sm:p-6"
            >
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500
                   focus:outline-none "
                  onClick={handleClose}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-3xl leading-6 font-medium"
                  >
                    Download
                  </Dialog.Title>
                  <hr className=" mt-5" />
                  <div className="mt-7 text-center">
                    {/* <div className="ml-0 sm:ml-3 block sm:inline mt-5 bg-white   sm:mt-0">
                      <label className="text-lg mr-1 font-medium text-gray-700">
                        Background
                      </label>{" "}
                      <BackgroundSwitch />
                    </div> */}
                  </div>
                  <div className=" mt-7">
                    <button
                      type="button"
                      className="w-auto inline px-4 mr-1
                      rounded-md border border-transparent shadow-sm px-1 py-2 
                      bg-gray-600 text-base font-medium text-white hover:bg-gray-700
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:col-start-2 sm:text-sm"
                      onClick={handleDownloadSVG}
                    >
                      SVG
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-auto ml-1 px-4 inline rounded-md border border-gray-300 shadow-sm px-1
                       py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                      onClick={handleDownloadPGN}
                      ref={cancelButtonRef}
                    >
                      PNG
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
