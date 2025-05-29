import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Rate,
  DatePicker,
  Row,
  Col,
} from "antd";
import { reviews, dishes, users } from "../../data/fakeData";
import "../../styles/styles.css";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import moment from "moment";
import ReviewAPI from "../../API/ReviewAPI";

const { RangePicker } = DatePicker;

const ReviewManagement = () => {
  const [form] = Form.useForm();
  const [reviewData, setReviewData] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rowSelected, setRowSelected] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [dates, setDates] = useState([]);

  const idUser = localStorage.getItem('userId');

  const getAllReviews = async () => {
    const res = ReviewAPI.Get_Res(idUser);
    return res;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllReviews();
        console.log("Review data:", data); // 👈 Kiểm tra ở đây
        setReviewData(data);
      } catch (error) {
        console.log("err", error);
      }
    };
    fetchData();
  }, [isModalVisible]);



  const handleDeleteReview = async (reviewId) => {
    try {
      const res = await ReviewAPI.Delete(reviewId);
      if (res.status === "success") {
        // Gọi lại load danh sách review mới nhất
        const data = await getAllReviews();
        setReviewData(data);
      } else {
        // Xử lý nếu xoá không thành công
        console.log("Xóa không thành công", res);
      }
    } catch (error) {
      console.log("Lỗi khi xoá review:", error);
    }
  };



  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleDateChange = (dates) => {
    setDates(dates);
  };

  const handleSearchByDate = () => {
    if (dates.length === 2) {
      const [start, end] = dates;
      const filtered = reviewData.filter((review) => {
        const createdAt = moment(review.created_at);
        return createdAt.isBetween(start, end, "days", "[]");
      });
      setReviewData(filtered);
    }
  };

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />

        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{
            width: 90,
          }}
        >
          Search
        </Button>
        <Button
          onClick={() => clearFilters && handleReset(clearFilters)}
          size="small"
          style={{
            width: 90,
          }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });


  const columns = [
    {
      title: "Tên khách hàng",
      dataIndex: "user_name",
      key: "user_name",
      sorter: (a, b) => a.user_name.length - b.user_name.length,
      ...getColumnSearchProps("user_name"),
    },
    {
      title: "Đánh giá",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => <Rate disabled value={rating} />,
      sorter: (a, b) => a.rating - b.rating,
      ...getColumnSearchProps("rating"),
    },
    {
      title: "Bình luận",
      dataIndex: "comment",
      key: "comment",
      sorter: (a, b) => a.comment.length - b.comment.length,
      ...getColumnSearchProps("comment"),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (text, record) => (
        <div className="action-buttons">
          <Button
            className="pink-button"
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteReview(record.id)}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="owner-container">
      <Row className="button-container" gutter={[16, 16]}>
        <Col>
          <DatePicker
            placeholder="Từ ngày"
            onChange={(date) => handleDateChange([date, dates[1]])}
          />
        </Col>
        <Col>
          <DatePicker
            placeholder="Đến ngày"
            onChange={(date) => handleDateChange([dates[0], date])}
          />
        </Col>
        <Col>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={handleSearchByDate}
          >
            Tìm kiếm
          </Button>
        </Col>
      </Row>
      <Table
        dataSource={reviewData}
        columns={columns}
        rowKey="id" onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setRowSelected(record.id);
            },
          };
        }}
      />

    </div>
  );
};

export default ReviewManagement;
