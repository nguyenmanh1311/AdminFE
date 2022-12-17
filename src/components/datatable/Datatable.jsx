import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const idPro = useParams();
  const handleDelete = (id, repply) => {
    // setData(data.filter((item) => item.id !== id));
    if (type === "comment") {
      const getCommentDel = rows.find((item) => item.id === id);
      if (repply === null) {
        //Tìm phần tử con
        let commentsDel = rows.filter((item) => item.creator.replyforId === id);
        if (commentsDel.length === 0) {
          removeComments(dispatch, id, idPro.commentId);
        } else {
          //khi xóa cha thì sẽ xóa các con comment
          for (let index = 0; index < commentsDel.length; index++) {
            removeComments(dispatch, commentsDel[index].id, idPro.commentId);
          }
          removeComments(dispatch, id, idPro.commentId);
        }
      } else {
        removeComments(dispatch, id, idPro.commentId);
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
      renderHeader: (params) => <strong>Xử lý</strong>,
      headerAlign: "center",
      flex: 1.5,
      align: "center",
      renderCell: (params) => {
        return (
          <div className="cellAction ">
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
            {type === "brands" && (
              <Link
                to={`/brands/${params.row.id}`}
                style={{ textDecoration: "none" }}
              >
                <div className="viewButton">Xem</div>
              </Link>
            )}
            {type === "categories" && (
              <Link
                to={`/categories/${params.row.id}`}
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
              <>
                <Link
                  to={`/products/${params.row.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="viewButton">Xem</div>
                </Link>
                {/* <Link
                  to={`/products/${params.row.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="updateButton">Sửa</div>
                </Link> */}
              </>
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
      <div className="flex justify-between mb-3">
        <div className="font-semibold text-[24px]">Quản lý {title}</div>

        <div
          onClick={() => {
            navigate("/" + type + "/new");
          }}
          className="bg-blue-500 text-white w-[200px] rounded-md p-2 flex justify-center items-center cursor-pointer hover:drop-shadow-md transition-all duration-200"
        >
          Thêm mới
        </div>
      </div>
      <DataGrid
        className="datagrid"
        rows={rows}
        columns={productColumns?.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        sx={{
          ".MuiDataGrid-columnSeparator": {
            display: "none",
          },
          "&.MuiDataGrid-root": {
            border: "none",
          },
        }}
      />
      <CreatePostModal></CreatePostModal>
    </div>
  );
};

export default Datatable;
