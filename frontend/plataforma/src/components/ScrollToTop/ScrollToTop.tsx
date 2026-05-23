import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  // listen for location changes
  const { pathname } = useLocation();

  useEffect(() => {
    // scroll to the very top of the window
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;