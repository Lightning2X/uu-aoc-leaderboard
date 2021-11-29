import { createContext, useContext } from "react";
import useMedia from "use-media";

export const useMediaQueryContext = () => useContext(MediaQueryContext);

export const MediaQueryContext = createContext({
  mobile: false,
});

export const useMediaQuery = function () {
  const mobile = useMedia("(min-width: 0px) and (max-width: 1024px)");

  return {
    mobile,
  };
};

export default useMediaQuery;
