import { useState } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
// routing
import Link from "next/link";
import { Fragment } from "react";
import EditProfileDEtailsDialog from "./editProfileDetailsDialog";

// navigation options
const navigation = [
  { name: "Profile", href: "/profile" },
  { name: "Illustration", href: "/Illustration" },
  { name: "Design", href: "/Design" },
  { name: "Activity", href: "/Activity" },
  { name: "Disclaimer", href: "/disclaimer" },
  { name: "AboutUs", href: "/aboutUs" },
  { name: "Contact", href: "/contact" },
];

const userNavigation = [
  {
    name: "Edit Profile",
  },
  {
    name: "Sign out",
  },
];

const user = {
  name: "Chelsea Hagon",
  email: "chelseahagon@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

//Header Component
const ActivityHeader = () => {
  const [openEditProfileDetailsDialog, setOpenEditProfileDetailsDiaolg] =
    useState(false);

  const handleEditProfileDetailsDialogClose = (event) => {
    setOpenEditProfileDetailsDiaolg(false);
  };
  const handleEditProfileClick = (event) => {
    event.preventDefault();
    setOpenEditProfileDetailsDiaolg(true);
  };
  const handleSignOutClick = (event) => {
    event.preventDefault();
    alert("sign out");
  };
  const handleOpenActivityDrawer = (event) => {
    event.preventDefault();
    let drawerComponent = document.getElementById("activityDrawer");
    drawerComponent.classList.remove("hidden");
  };
  return (
    <header
      className="bg-gray-900 sticky top-0 border-b border-gray-600"
      style={{ zIndex: 1 }}
    >
      {/**pass user details object in dialog with complete user Detaisl */}
      <EditProfileDEtailsDialog
        open={openEditProfileDetailsDialog}
        handleClose={handleEditProfileDetailsDialogClose}
      />
      <nav className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
          <div className="flex items-center">
            <span
              className="sm:hidden mr-5 block"
              onClick={handleOpenActivityDrawer}
            >
              <img src="https://img.icons8.com/ios-glyphs/30/ffffff/line-width.png" />
            </span>
            <span className="sr-only">Workflow</span>
            <img
              className="h-10 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
              alt=""
            />

            <div className="hidden ml-10 space-x-4 lg:block">
              {navigation.slice(0, 3).map((link) => (
                <Link href={link.href} key={link.name}>
                  <a className="text-base font-medium text-white hover:text-indigo-50">
                    {link.name}
                  </a>
                </Link>
              ))}
            </div>
          </div>

          <div className="ml-10 space-x-4 ">
            <div className="md:inline-block hidden  space-x-4 ">
              {navigation.slice(3).map((link) => (
                <Link href={link.href} key={link.name}>
                  <a className="text-base font-medium text-white hover:text-indigo-50">
                    {link.name}
                  </a>
                </Link>
              ))}
            </div>

            {/* Profile dropdown */}
            <span className="inline-block">
              <Menu as="div" className="flex-shrink-0 relative ml-5">
                <div>
                  <Menu.Button className="bg-white rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={user.imageUrl}
                      alt=""
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">
                    <Menu.Item key={userNavigation[0].name}>
                      {({ active }) => (
                        <h4
                          onClick={handleEditProfileClick}
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900 cursor-pointer"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          {userNavigation[0].name}
                        </h4>
                      )}
                    </Menu.Item>
                    <Menu.Item key={userNavigation[1].name}>
                      {({ active }) => (
                        <h4
                          onClick={handleSignOutClick}
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900 cursor-pointer"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          {userNavigation[1].name}
                        </h4>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </span>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default ActivityHeader;
