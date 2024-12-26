import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} - Service Sphere`;
  }, [title]);
};
export default useTitle;
