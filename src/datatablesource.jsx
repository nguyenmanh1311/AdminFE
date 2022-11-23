export const productColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "img",
    headerName: "Hình ảnh",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "title",
    headerName: "Tên sản phẩm",
    width: 230,
  },
  {
    field: "brand",
    headerName: "Thương hiệu",
    width: 120,
  },
  {
    field: "price",
    headerName: "Giá bán",
    width: 100,
  },
  {
    field: "import-price",
    headerName: "Giá nhập",
    width: 100,
  },
  {
    field: "description",
    headerName: "Mô tả",
    width: 200,
  },
];
export const commentColumns = [
  { field: "id", headerName: "IdComment", width: 70 },

  {
    field: "creator",
    headerName: "Username",
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
    width: 230,
  },

  {
    field: "create_date",
    headerName: "Date",
    width: 100,
  },
  {
    field: "replyforId",
    headerName: "IdParent",
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
    width: 100,
  },
];

export const userColumns = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "avatar",
    headerName: "Hình ảnh",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.avatar} alt="avatar" />
        </div>
      );
    },
  },
  {
    field: "username",
    headerName: "Họ tên khách hàng",
    width: 230,
    renderCell: (params) => {
      return <div className="cellWithImg">{params.row.username}</div>;
    },
  },
  {
    field: "sex",
    headerName: "Giới tính",
    width: 80,
  },
  {
    field: "birthday",
    headerName: "Ngày sinh",
    width: 100,
  },
  {
    field: "phone",
    headerName: "Số điện thoại",
    width: 100,
  },
  {
    field: "email",
    headerName: "Email",
    width: 100,
  },
  {
    field: "status",
    headerName: "Trạng thái",
    width: 100,
  },
  {
    field: "address",
    headerName: "Địa chỉ",
    width: 500,
    valueGetter: (params) => {
      let result = [];
      if (params.row.address) {
        result.push(
          params.row.address.homeAdd +
            ", " +
            params.row.address.ward +
            ", " +
            params.row.address.district +
            ", " +
            params.row.address.city
        );
      } else {
        result = ["Unknown"];
      }
      return result.join(", ");
    },
  },
];

export const reviewProductColumns = [
  {
    field: "id",
    headerName: "ID",
    width: 50,
    renderCell: (params) => {
      return <div className="cellWithImg">{params.row.id}</div>;
    },
  },
  {
    field: "product",
    headerName: "Product",
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
    width: 80,
    renderCell: (params) => {
      return <div className="cellWithImg">{params.row.star}</div>;
    },
  },
  {
    field: "totalVote",
    headerName: "Total Vote",
    width: 90,
    renderCell: (params) => {
      return <div className="cellWithImg">{params.row.totalVote}</div>;
    },
  },
];

export const reviewDetailColumns = [
  {
    field: "id",
    headerName: "ID",
    width: 400,
    renderCell: (params) => {
      return <div className="cellWithImg">{params.row.id}</div>;
    },
  },

  {
    field: "user",
    headerName: "User",
    width: 100,
    renderCell: (params) => {
      return <div className="cellWithImg">{params.row.user.username}</div>;
    },
  },

  {
    field: "star",
    headerName: "Stars",
    width: 80,
    renderCell: (params) => {
      return <div className="cellWithImg">{params.row.star}</div>;
    },
  },
  {
    field: "content",
    headerName: "Content",
    width: 230,
  },
];
