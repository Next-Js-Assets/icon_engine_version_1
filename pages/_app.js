import Layout from "./Components/layout";
import "tailwindcss/tailwind.css";

const MyApp = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(<Component {...pageProps} />);
}; 

export default MyApp;
