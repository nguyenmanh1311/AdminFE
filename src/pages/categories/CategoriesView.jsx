import { useState, useEffect } from "react";
import Sidebar from "~/components/sidebar/Sidebar";
import Navbar from "~/components/navbar/Navbar";
import Datatable from "~/components/datatable/Datatable";
import { useLocation, useParams } from "react-router-dom";
import { ProductService } from "~/services";
import { categoryColumns } from "~/datatablesource";
import { getAllComments } from "../../redux/comment/commentApi";
import { useDispatch, useSelector } from "react-redux";
const CategoriesView = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState([]);
  useEffect(() => {
    getAllComments(dispatch, categoryId);
    ProductService.getProduct(categoryId).then((res) => setProduct(res.data));
  }, []);
  let getComment = useSelector((state) => state.comments.comment.data);

  return (
    <div>
      <div>
        <Datatable
          rows={getComment}
          title=""
          columns={categoryColumns}
          type="categories"
          reply={true}
        />
      </div>
    </div>
  );
};

export default CategoriesView;
