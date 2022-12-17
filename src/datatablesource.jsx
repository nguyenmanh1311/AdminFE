import React, { useState } from "react";
export const productColumns = [
  {
    field: "id",
    renderHeader: (params) => <strong>ID</strong>,
    headerAlign: "center",
    align: "center",
    flex: 0.4,
  },
  {
    field: "image",
    renderHeader: (params) => <strong>Hình ảnh</strong>,
    headerAlign: "center",
    align: "center",
    flex: 0.7,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={"http://localhost:8080/api/v1/user/image/" + params.row.image}
            alt="avatar"
          />
        </div>
      );
    },
  },
  {
    field: "name",
    renderHeader: (params) => <strong>Tên sản phẩm</strong>,
    headerAlign: "center",
    flex: 2,
  },
  {
    field: "brandName",
    renderHeader: (params) => <strong>Thương hiệu</strong>,
    align: "center",
    headerAlign: "center",
    flex: 0.8,
  },
  {
    field: "cateName",
    renderHeader: (params) => <strong>Thể loại</strong>,
    headerAlign: "center",
    align: "center",
    flex: 1,
  },
  {
    field: "price",
    renderHeader: (params) => <strong>Giá bán</strong>,
    headerAlign: "center",
    align: "center",
    flex: 0.6,
  },
  {
    field: "standCost",
    renderHeader: (params) => <strong>Giá nhập</strong>,
    headerAlign: "center",
    align: "center",
    flex: 0.6,
  },
  {
    field: "description",
    renderHeader: (params) => <strong>Mô tả</strong>,
    headerAlign: "center",
    flex: 2,
  },
];
export const commentColumns = [
  { field: "id", headerName: "IdComment", headerAlign: "center", width: 70 },

  {
    field: "creator",
    headerName: "Username",
    headerAlign: "center",
    width: 150,
    valueGetter: (params) => {
      let result = [];
      if (params.row.creator) {
        if (params.row.creator.username) {
          result.push(params.row.creator.username);
        }
      } else {
        result = ["Unknown"];
      }
      return result.join(", ");
    },
  },
  {
    field: "content",
    headerName: "Content",
    headerAlign: "center",
    width: 230,
  },

  {
    field: "create_date",
    headerName: "Date",
    headerAlign: "center",
    width: 100,
  },
  {
    field: "replyforId",
    headerName: "IdParent",
    headerAlign: "center",
    width: 130,
    valueGetter: (params) => {
      let result = [];
      if (params.row.creator) {
        if (params.row.creator.replyforId) {
          result.push(params.row.creator.replyforId);
        }
      } else {
        result = ["Unknown"];
      }
      return result.join(", ");
    },
  },
  ,
  {
    field: "productId",
    headerName: "Product",
    headerAlign: "center",
    width: 100,
  },
];
export const userColumns = [
  {
    field: "id",
    renderHeader: (params) => <strong>ID</strong>,
    headerAlign: "center",
    align: "center",
    flex: 0.4,
  },
  {
    field: "photo",
    renderHeader: (params) => <strong>Hình ảnh</strong>,
    headerAlign: "center",
    sortable: false,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={"http://localhost:8080/api/v1/user/image/" + params.row.photo}
            alt="avatar"
          />
        </div>
      );
    },
    align: "center",
    flex: 0.7,
  },
  {
    field: "fullName",
    renderHeader: (params) => <strong>Họ tên khách hàng</strong>,
    sortable: false,
  },
  {
    field: "gender",
    renderHeader: (params) => <strong>Giới tính</strong>,
    headerAlign: "center",
    sortable: false,
    align: "center",
  },
  {
    field: "dateOfBirth",
    renderHeader: (params) => <strong>Ngày sinh</strong>,
    headerAlign: "center",
    align: "center",
    flex: 0.8,
    sortable: false,
  },
  {
    field: "phone",
    renderHeader: (params) => <strong>Số điện thoại</strong>,
    headerAlign: "center",
    flex: 0.8,
    align: "center",
    sortable: false,
  },
  {
    field: "email",
    renderHeader: (params) => <strong>Email</strong>,
    headerAlign: "center",
    width: 150,
    flex: 0.7,
    sortable: false,
  },

  {
    field: "address",
    renderHeader: (params) => <strong>Địa chỉ</strong>,
    headerAlign: "center",
    sortable: false,
    flex: 1.7,
    // valueGetter: (params) => {
    //   let result = [];
    //   if (params.row.address) {
    //     result.push(
    //       params.row.address.homeAdd +
    //         ", " +
    //         params.row.address.ward +
    //         ", " +
    //         params.row.address.district +
    //         ", " +
    //         params.row.address.city
    //     );
    //   } else {
    //     result = ["Unknown"];
    //   }
    //   return result.join(", ");
    // },
  },
];

export const reviewProductColumns = [
  {
    field: "id",
    headerName: "ID",
    headerAlign: "center",
    width: 70,
    renderCell: (params) => {
      return <div className="cellWithImg">{params.row.id}</div>;
    },
  },
  {
    field: "product",
    headerName: "Product",
    headerAlign: "center",
    width: 550,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.title}
        </div>
      );
    },
  },

  {
    field: "star",
    headerName: "Stars",
    headerAlign: "center",
    width: 80,
    renderCell: (params) => {
      return <div className="cellWithImg">{params.row.star}</div>;
    },
  },
  {
    field: "totalVote",
    headerName: "Total Vote",
    headerAlign: "center",
    width: 90,
    renderCell: (params) => {
      return <div className="cellWithImg">{params.row.totalVote}</div>;
    },
  },
];

export const brandColumns = [
  {
    field: "id",
    renderHeader: (params) => <strong>ID</strong>,
    headerAlign: "center",
    align: "center",
    flex: 0.4,
  },
  {
    field: "name",
    renderHeader: (params) => <strong>Tên thương hiệu</strong>,
    headerAlign: "center",
    align: "center",
    flex: 1.1,
  },

  {
    field: "description",
    renderHeader: (params) => <strong>Mô tả</strong>,
    headerAlign: "center",
    flex: 6.8,
  },
];

export const reviewDetailColumns = [
  {
    field: "id",
    headerName: "ID",
    headerAlign: "center",
    width: 70,
    renderCell: (params) => {
      return <div className="cellWithImg">{params.row.id}</div>;
    },
  },

  {
    field: "user",
    headerName: "User",
    headerAlign: "center",
    width: 100,
    renderCell: (params) => {
      return <div className="cellWithImg">{params.row.user.username}</div>;
    },
  },

  {
    field: "star",
    headerName: "Stars",
    headerAlign: "center",
    width: 80,
    renderCell: (params) => {
      return <div className="cellWithImg">{params.row.star}</div>;
    },
  },
  {
    field: "content",
    headerName: "Content",
    headerAlign: "center",
    width: 230,
  },
];
export const categoryColumns = [
  {
    field: "id",
    renderHeader: () => <strong>ID</strong>,
    headerAlign: "center",
    align: "center",
    flex: 0.4,
  },

  {
    field: "name",
    renderHeader: () => <strong>Tên phân loại</strong>,
    headerAlign: "center",
    flex: 1.1,
  },

  {
    field: "description",
    renderHeader: () => <strong>Mô tả</strong>,
    headerAlign: "center",
    flex: 7,
  },
];
