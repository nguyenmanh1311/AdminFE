/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import newsService from "../services/news.service";
import { GlobalUtil } from "../utils/GlobalUtil";
import swal2 from "sweetalert2";
const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const stt = useRef();
  const deleteNews = (_id) => {
    (async function () {
      const response = await newsService.deleteNewsByID(_id);
      if (response.status_code === 200) {
        swal2.fire({
          title: "Xóa bài viết thành công!",
        });
        getNews();
      }
    })();
  };
  function getNews() {
    const data = {
      page_count: 10,
      order_by: "CreatedAt desc",
      page: currentPageNumber,
    };
    newsService.getAllNews(data).then((res) => {
      stt.current = res?.offset + 1;
      setData(() => {
        const onResult = res.data.map((item, index) => {
          if (stt.current > 10) {
            return {
              index: stt.current++,
              createdDate: GlobalUtil.dateConvert(item.created_at),
              creatorName: item.creator.fullname,
              editorName: item.editor.fullname,
              ...item,
            };
          }
          if (stt.current <= 10) {
            return {
              index: ++index,
              createdDate: GlobalUtil.dateConvert(item.created_at),
              creatorName: item.creator.fullname,
              editorName: item.editor.fullname,
              ...item,
            };
          }
        });
        return onResult;
      });
      const pageCountRounded = Math.ceil(res.total_count / res.page_size);
      setPageCount(pageCountRounded);
    });
  }
  useEffect(() => {
    getNews();
  }, [currentPageNumber]);
  const _data = {
    data,
    setData,
    currentPageNumber,
    setCurrentPageNumber,
    pageCount,
    setPageCount,
    deleteNews,
    getNews,
  };
  return (
    <DataContext.Provider value={{ ..._data }}>{children}</DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);
