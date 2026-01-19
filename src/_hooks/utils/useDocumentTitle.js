import { useEffect } from "react";

const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = `RemindMe | ${title}`;
  }, [title]);
};

export default useDocumentTitle;
