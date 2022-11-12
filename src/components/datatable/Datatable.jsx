import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useInsertionEffect } from "react";
import { removeComments } from "../../redux/comment/commentApi";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { removeUser } from "../../redux/user/userApi";
import { removeReviews } from "../../redux/review/reviewApi";
import { showModal, offModal } from "../../redux/modal/modalApi";
import CreatePostModal from "../CreateModal";
import productService from "../../services/product.service";
const Datatable = ({
  rows,
  title,
  productColumns,
  type = "",
  reply = false,
}) => {
  const dispatch = useDispatch();
  const idPro = useParams();
  console.log("rows", rows);
  const handleDelete = (id, repply) => {
    // setData(data.filter((item) => item.id !== id));
    if (type === "comment") {
      const getCommentDel = rows.find((item) => item.id === id);
      if (repply === null) {
        //Tìm phần tử con
        let commentsDel = rows.filter((item) => item.creator.replyforId === id);
        if (commentsDel.length === 0) {
          removeComments(dispatch, id, idPro.commentId);
          console.log("idDel1", id);
        } else {
          //khi xóa cha thì sẽ xóa các con comment
          for (let index = 0; index < commentsDel.length; index++) {
            console.log("idDel2", commentsDel[index].id);
            removeComments(dispatch, commentsDel[index].id, idPro.commentId);
          }
          removeComments(dispatch, id, idPro.commentId);
        }
      } else {
        removeComments(dispatch, id, idPro.commentId);
        console.log("idDel3", id);
      }
    }
    if (type === "review") {
      removeReviews(dispatch, id, idPro.commentId);
    }
    if (type === "user") {
      removeUser(dispatch, id);
    }
    // if (type === 'products') {
    //   productService.deleteProductByID(id)
    // }
    if (confirm("Bạn có chắc muốn xóa sản phẩm này không") == true) {
      productService.deleteProductByID(id);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } else {
    }
    console.log(id);
  };
  // const hanleReplly = (id)=>{
  //   repplyComments(dispatch,id,idPro.commentId)
  // }
  const handleAddPostModal = (repllyforId) => {
    showModal(dispatch, repllyforId);
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {type === "comment" && !reply && (
              <Link
                to={`/comments/${params.row.id}`}
                style={{ textDecoration: "none" }}
              >
                <div className="viewButton">Xem</div>
              </Link>
            )}
            {type === "comment" && reply && (
              <button
                className=""
                onClick={() => {
                  if (params.row.creator.replyforId) {
                    handleAddPostModal(params.row.creator.replyforId);
                  } else {
                    handleAddPostModal(params.row.id);
                  }
                }}
              >
                Replly
              </button>
            )}
            {type === "review" && (
              <Link
                to={`/reviews/${params.row.id}`}
                style={{ textDecoration: "none" }}
              >
                <div className="viewButton">Xem</div>
              </Link>
            )}
            {type === "user" && (
              <Link
                to={`/users/${params.row.id}`}
                style={{ textDecoration: "none" }}
              >
                <div className="viewButton">Xem</div>
              </Link>
            )}
            {type === "products" && (
              <Link
                to={`/products/${params.row.id}`}
                style={{ textDecoration: "none" }}
              >
                <div className="viewButton">Xem</div>
              </Link>
            )}
            <div
              className="deleteButton"
              onClick={() => {
                if (type === "comment") {
                  handleDelete(params.row.id, params.row.creator.replyforId);
                } else {
                  handleDelete(params.row.id);
                }
              }}
            >
              Xóa
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Quản lý {title}
        <Link to={"/" + type + "/new"} className="link px-3">
          Thêm mới
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={rows}
        columns={productColumns?.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
      <CreatePostModal></CreatePostModal>
    </div>
  );
};

export default Datatable;
