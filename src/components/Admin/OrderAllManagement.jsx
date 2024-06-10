import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  Rate,
  DatePicker,
  Row,
  Col,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { dishes, restaurants } from "../../data/fakeData";
import "../../styles/styles.css";
import moment from "moment";
import OrderAPI from "../../API/OrderAPI";

const { Option } = Select;
const { RangePicker } = DatePicker;

const OrderAllManagement = () => {
  const [orderData, setOrderData] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rowSelected, setRowSelected] = useState("");

  const [dates, setDates] = useState([]);


  const getAllOrders = async () => {
    const res = OrderAPI.Get_All();
    return res;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllOrders();
        setOrderData(data);
        console.log(data);
      } catch (error) {
        console.log("err", error);
      }
    };
    fetchData();
  }, [isModalVisible]);


  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleDeleteOrder = async () => {
    const res = await OrderAPI.Delete_Admin(rowSelected);
    if (res.status === "SUCCESS") {
      handleCancel();
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setRowSelected("");
  };

  const handleDateChange = (dates) => {
    setDates(dates);
  };

  const handleSearchByDate = () => {
    if (dates.length === 2) {
      const [start, end] = dates;
      const filtered = orderData.filter((dish) => {
        const createdAt = moment(dish.created_at);
        return createdAt.isBetween(start, end, "days", "[]");
      });
      setOrderData(filtered);
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
      title: "Quán Ăn",
      dataIndex: "restaurant_name",
      key: "restaurant_name",
      sorter: (a, b) => a.restaurant_name.length - b.restaurant_name.length,
      ...getColumnSearchProps("restaurant_name"),
    },
    { title: "Tên khách hàng",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),},
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      sorter: (a, b) => a.phone - b.phone,
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      ...getColumnSearchProps("address"),
    },
    {
      title: "Món ăn",
      dataIndex: "dishes",
      sorter: (a, b) => (a.dishes || []).length - (b.dishes || []).length,
      ...getColumnSearchProps("dishes"),
      render: (dishes) => (
        <div>
          {Array.isArray(dishes) && dishes.length > 0 ? (
            dishes.map((dish, index) => (
              <div key={index} style={{ marginBottom: "5px" }}>
                <p>
                  <strong>Tên món:</strong> {dish.name}
                </p>
                <p>
                  <strong>Giá:</strong> {dish.price}
                </p>
                <p>
                  <strong>Số lượng:</strong> {dish.quantity}
                </p>
                <br></br>
              </div>
            ))
          ) : (
            <p>Không có món nào</p>
          )}
        </div>
      ),
    },
    {
      title: "Tiền",
      dataIndex: "money",
      sorter: (a, b) => (a.money || []).length - (b.money || []).length,
      ...getColumnSearchProps("dishes"),
      render: (money) => (
        <div>
          {Array.isArray(money) && money.length > 0 ? (
            money.map((item, index) => (
              <div key={index} style={{ marginBottom: "5px" }}>
                <p>
                  <strong>Giá tiền:</strong> {item.price}
                </p>
                <p>
                  <strong>Phí ship:</strong> {item.ship}
                </p>
                <p>
                  <strong>Giảm giá:</strong> {item.discount}
                </p>
                <p>
                  <strong>Tổng tiền:</strong> {item.total_amount}
                </p>
                <br></br>
              </div>
            ))
          ) : (
            <p>Trống</p>
          )}
        </div>
      ),
    },
    {
      title: "Ghi chú",
      dataIndex: "option",
      ...getColumnSearchProps("option"),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (text, record) => (
        <div className="action-buttons">
          <Button
            className="pink-button"
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteOrder(rowSelected)}
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
      <Table dataSource={orderData} columns={columns} rowKey="id" onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setRowSelected(record.id);
            },
          };
        }} />
    
    </div>
  );
};

export default OrderAllManagement;
