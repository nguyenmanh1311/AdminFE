/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useState, useRef } from "react";
import newsService from "../services/news.service";
import { GlobalUtil } from "../utils/GlobalUtil";
import swal2 from "sweetalert2";

const useNews = (id) => {
  const [data, setData] = useState([]);
  useEffect(() => {}, [id]);
  return {
    data,
    setData,
    currentPageNumber,
    setCurrentPageNumber,
    pageCount,
    setPageCount,
    deleteNews,
  };
};

export default useNews;
