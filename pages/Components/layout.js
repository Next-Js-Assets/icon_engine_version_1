import Footer from "./footer";
import Header from "./header";
import Link from "next/link";
import Drawer from "./Drawer";
// navigation options
const navigation = [
  { name: "Home", href: "/" },
  { name: "Illustration", href: "/Illustration" },
  { name: "Design", href: "/Design" },
  { name: "Disclaimer", href: "/disclaimer" },
  { name: "AboutUs", href: "/aboutUs" },
  { name: "Contact", href: "/contact" },
];
const Layout = ({ children }) => {

  return (
    <>
      <Drawer drawerId="drawer" navigation={navigation} />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};
export default Layout;
// =======
//     return (
//         <>
//             <Header />
//             <main    >{ children }</main>
//             <Footer />
//         </>
//     )  
// }
// export default Layout;
// >>>>>>> Connecting-Admin-to-MongoDB
