import React from "react";
import logo from "./assets/avatar.jpg";

export const productColumns = [
  {
    field: "index",
    renderHeader: (params) => <strong>STT</strong>,
    headerAlign: "center",
    align: "center",
    flex: 0.4,
  },
  {
    field: "product_images",
    renderHeader: (params) => <strong>Hình ảnh</strong>,
    headerAlign: "center",
    align: "center",
    flex: 1,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImgProduct"
            src={"https://" + params?.row.product_images[0]?.uri || logo}
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
    flex: 1.4,
  },
  {
    field: "brandName",
    renderHeader: (params) => <strong>Thương hiệu</strong>,
    align: "center",
    headerAlign: "center",
    flex: 0.8,
  },
  {
    field: "categoryName",
    renderHeader: (params) => <strong>Thể loại</strong>,
    headerAlign: "center",
    align: "center",
    flex: 1,
  },
  {
    field: "Price",
    renderHeader: (params) => <strong>Giá bán</strong>,
    headerAlign: "center",
    align: "center",
    flex: 0.8,
  },
  {
    field: "Stand_cost",
    renderHeader: (params) => <strong>Giá nhập</strong>,
    headerAlign: "center",
    align: "center",
    flex: 0.8,
  },
  {
    field: "description",
    renderHeader: (params) => <strong>Mô tả</strong>,
    headerAlign: "center",
    flex: 1.2,
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
    field: "index",
    renderHeader: () => <strong>STT</strong>,
    headerAlign: "center",
    align: "center",
    flex: 0.4,
  },
  {
    field: "avatar",
    renderHeader: () => <strong>Hình ảnh</strong>,
    headerAlign: "center",
    sortable: false,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImgAvatar"
            src={params.row.avatar ? "https://" + params.row.avatar : logo}
            alt="avatar"
          />
        </div>
      );
    },
    align: "center",
    flex: 0.5,
  },
  {
    field: "fullname",
    renderHeader: () => <strong>Họ tên khách hàng</strong>,
    sortable: false,
    flex: 1,
  },
  {
    field: "phone_number",
    renderHeader: () => <strong>Số điện thoại</strong>,
    headerAlign: "center",
    flex: 0.7,
    align: "center",
    sortable: false,
  },
  {
    field: "email",
    renderHeader: () => <strong>Email</strong>,
    headerAlign: "center",
    width: 150,
    flex: 1.4,
    sortable: false,
  },

  // {
  //   field: "address",
  //   renderHeader: () => <strong>Địa chỉ</strong>,
  //   headerAlign: "center",
  //   sortable: false,
  //   flex: 2,
  // },
];

export const staffColumns = [
  {
    field: "index",
    renderHeader: (params) => <strong>STT</strong>,
    headerAlign: "center",
    align: "center",
    flex: 0.4,
  },
  {
    field: "avatar",
    renderHeader: (params) => <strong>Hình ảnh</strong>,
    headerAlign: "center",
    sortable: false,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImgAvatar"
            src={params.row.avatar ? "https://" + params.row.avatar : logo}
            alt="avatar"
          />
        </div>
      );
    },
    align: "center",
    flex: 0.5,
  },
  {
    field: "fullname",
    renderHeader: (params) => <strong>Họ tên nhân viên</strong>,
    sortable: false,
    flex: 1,
  },
  // {
  //   field: "gender",
  //   renderHeader: (params) => <strong>Giới tính</strong>,
  //   headerAlign: "center",
  //   sortable: false,
  //   align: "center",
  // },
  // {
  //   field: "dateOfBirth",
  //   renderHeader: (params) => <strong>Ngày sinh</strong>,
  //   headerAlign: "center",
  //   align: "center",
  //   flex: 0.8,
  //   sortable: false,
  // },
  {
    field: "phone_number",
    renderHeader: () => <strong>Số điện thoại</strong>,
    headerAlign: "center",
    flex: 0.7,
    align: "center",
    sortable: false,
  },
  {
    field: "email",
    renderHeader: (params) => <strong>Email</strong>,
    headerAlign: "center",
    width: 150,
    flex: 1.4,
    sortable: false,
  },

  // {
  //   field: "address",
  //   renderHeader: (params) => <strong>Địa chỉ</strong>,
  //   headerAlign: "center",
  //   sortable: false,
  //   flex: 1.7,
  // },
];

export const reviewProductColumns = [
  {
    field: "id",
    headerName: "STT",
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
    field: "index",
    renderHeader: () => <strong>STT</strong>,
    headerAlign: "center",
    align: "center",
    flex: 0.4,
  },
  {
    field: "name",
    renderHeader: () => <strong>Tên thương hiệu</strong>,
    headerAlign: "center",
    align: "center",
    flex: 1.1,
  },

  {
    field: "description",
    renderHeader: (params) => <strong>Mô tả</strong>,
    headerAlign: "center",
    flex: 6,
  },

  {
    field: "createdDate",
    renderHeader: (params) => <strong>Ngày tạo</strong>,
    headerAlign: "center",
    align: "center",
    flex: 1,
  },
];

export const reviewDetailColumns = [
  {
    field: "id",
    headerName: "STT",
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

export const orderColumns = [
  {
    field: "index",
    renderHeader: (params) => <strong>STT</strong>,
    headerAlign: "center",
    align: "center",
    flex: 0.3,
  },
  {
    field: "fullname",
    renderHeader: (params) => <strong>Tên khách hàng</strong>,
    headerAlign: "center",
    align: "center",
    flex: 0.7,
  },

  {
    field: "totalPrice",
    renderHeader: (params) => <strong>Tổng giá</strong>,
    headerAlign: "center",
    align: "center",
    flex: 0.5,
  },

  {
    field: "createdDate",
    renderHeader: (params) => <strong>Ngày đặt mua</strong>,
    headerAlign: "center",
    align: "center",
    flex: 0.6,
  },

  {
    field: "payment_method",
    renderHeader: (params) => <strong>Phương thức thanh toán</strong>,
    headerAlign: "center",
    align: "center",
    flex: 0.8,
    renderCell: (params) => {
      const value = params.value;
      let modifiedValue = value;

      if (value === 0) {
        modifiedValue = "MOMO";
      } else if (value === 1) {
        modifiedValue = "VNPAY";
      } else if (value === 3) {
        modifiedValue = "COD";
      }

      return <div>{modifiedValue}</div>;
    },
  },
];

export const newColumns = [
  {
    field: "index",
    renderHeader: (params) => <strong>STT</strong>,
    headerAlign: "center",
    align: "center",
    flex: 0.2,
  },
  {
    field: "post_images",
    renderHeader: (params) => <strong>Ảnh bìa</strong>,
    headerAlign: "center",
    align: "center",
    flex: 0.7,
    renderCell: (params) => {
      const image = params?.row.post_images[0]?.uri
        ? "https://" + params?.row.post_images[0]?.uri
        : logo;
      return (
        <div className="cellWithImg">
          <img className="cellImgNews" src={image} alt="avatar" />
        </div>
      );
    },
  },
  {
    field: "title",
    renderHeader: (params) => <strong>Tiêu đề</strong>,
    headerAlign: "center",
    align: "center",
    flex: 0.7,
  },
  {
    field: "createdDate",
    renderHeader: (params) => <strong>Ngày tạo</strong>,
    headerAlign: "center",
    align: "center",
    flex: 0.5,
  },
  {
    field: "creatorName",
    renderHeader: (params) => <strong>Người tạo</strong>,
    headerAlign: "center",
    align: "center",
    flex: 0.5,
  },
  {
    field: "editorName",
    renderHeader: (params) => <strong>Người chỉnh sửa cuối</strong>,
    headerAlign: "center",
    align: "center",
    flex: 0.5,
  },
];

export const categoryColumns = [
  {
    field: "index",
    renderHeader: () => <strong>STT</strong>,
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
    flex: 6,
  },

  {
    field: "createdDate",
    renderHeader: (params) => <strong>Ngày tạo</strong>,
    headerAlign: "center",
    align: "center",
    flex: 1,
  },
];
