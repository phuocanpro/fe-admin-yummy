import React, { useState } from "react";
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

const { RangePicker } = DatePicker;

const ReviewManagement = () => {
  const [reviewData, setReviewData] = useState(reviews);
  const [filteredData, setFilteredData] = useState(reviews);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentReview, setCurrentReview] = useState(null);
  const [dates, setDates] = useState([]);

  const handleAddOrUpdateReview = (values) => {
    if (currentReview) {
      setReviewData(
        reviewData.map((review) =>
          review.item_id === currentReview.item_id &&
          review.user_id === currentReview.user_id
            ? { ...review, ...values }
            : review
        )
      );
    } else {
      setReviewData([
        ...reviewData,
        { ...values, item_id: reviewData.length + 1 },
      ]);
    }
    setFilteredData(reviewData);
    setIsModalVisible(false);
  };

  const handleDeleteReview = (item_id, user_id) => {
    setReviewData(
      reviewData.filter(
        (review) => review.item_id !== item_id || review.user_id !== user_id
      )
    );
    setFilteredData(
      filteredData.filter(
        (review) => review.item_id !== item_id || review.user_id !== user_id
      )
    );
  };

  const showModal = (review) => {
    setCurrentReview(review);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentReview(null);
  };

  const handleDateChange = (dates) => {
    setDates(dates);
  };

  const handleSearchByDate = () => {
    if (dates.length === 2) {
      const [start, end] = dates;
      const filtered = reviewData.filter((review) => {
        const createdAt = moment(review.createdAt);
        return createdAt.isBetween(start, end, "days", "[]");
      });
      setFilteredData(filtered);
    }
  };

  const columns = [
    {
      title: "Món ăn",
      dataIndex: "item_id",
      key: "item_id",
      render: (id) => dishes.find((d) => d.id === id)?.name || "Không rõ",
    },
    {
      title: "Người dùng",
      dataIndex: "user_id",
      key: "user_id",
      render: (id) => users.find((u) => u.id === id)?.name || "Không rõ",
    },
    {
      title: "Đánh giá",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => <Rate disabled value={rating} />,
    },
    { title: "Bình luận", dataIndex: "comment", key: "comment" },
    {
      title: "Hành động",
      key: "actions",
      render: (text, record) => (
        <div className="action-buttons">
          <Button
            className="pink-button"
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
          >
            Sửa
          </Button>
          <Button
            className="pink-button"
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteReview(record.item_id, record.user_id)}
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
          <Button
            className="pink-button"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => showModal(null)}
          >
            Thêm đánh giá
          </Button>
        </Col>
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
        dataSource={filteredData}
        columns={columns}
        rowKey={(record) => `${record.item_id}-${record.user_id}`}
      />
      <Modal
        title={currentReview ? "Sửa đánh giá" : "Thêm đánh giá"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form initialValues={currentReview} onFinish={handleAddOrUpdateReview}>
          <Form.Item name="item_id" label="Món ăn" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="user_id"
            label="Người dùng"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="rating"
            label="Đánh giá"
            rules={[{ required: true }]}
          >
            <Rate />
          </Form.Item>
          <Form.Item
            name="comment"
            label="Bình luận"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Button className="pink-button" type="primary" htmlType="submit">
            {currentReview ? "Cập nhật" : "Thêm"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default ReviewManagement;
