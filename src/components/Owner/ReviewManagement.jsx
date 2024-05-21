import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Rate } from "antd";
import { reviews, dishes, users } from "../../data/fakeData";
import "../../styles/styles.css";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";

const ReviewManagement = () => {
  const [reviewData, setReviewData] = useState(reviews);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentReview, setCurrentReview] = useState(null);

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
    setIsModalVisible(false);
  };

  const showModal = (review) => {
    setCurrentReview(review);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentReview(null);
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
        <Button
          className="pink-button"
          icon={<EditOutlined />}
          onClick={() => showModal(record)}
        >
          Sửa
        </Button>
      ),
    },
  ];

  return (
    <div className="owner-container">
      <div className="button-container">
        <Button
          className="pink-button"
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showModal(null)}
        >
          Thêm đánh giá
        </Button>
      </div>
      <Table dataSource={reviewData} columns={columns} rowKey="item_id" />
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
