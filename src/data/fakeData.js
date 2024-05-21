export const users = [
  {
    id: 1,
    name: "Quản trị viên",
    password: "123456",
    email: "admin@example.com",
    phone: "0123456789",
    address: "123 Đường Quản Trị",
    role: "admin",
    image: "",
    level: 1,
    coin: 0,
    createdAt: "2023-01-01",
    updatedAt: "2023-01-01",
  },
  {
    id: 2,
    name: "Chủ Nhà Hàng",
    password: "123456",
    email: "owner@example.com",
    phone: "0987654321",
    address: "456 Đường Chủ Nhà Hàng",
    role: "restaurant",
    image: "",
    level: 1,
    coin: 0,
    createdAt: "2023-01-01",
    updatedAt: "2023-01-01",
  },
  {
    id: 3,
    name: "Người Dùng",
    password: "password",
    email: "user@example.com",
    phone: "0112233445",
    address: "789 Đường Người Dùng",
    role: "user",
    image: "",
    level: 1,
    coin: 100,
    createdAt: "2023-01-10",
    updatedAt: "2023-01-10",
  },
  {
    id: 4,
    name: "Nhân Viên Giao Hàng",
    password: "password",
    email: "shipper@example.com",
    phone: "0998877665",
    address: "101 Đường Giao Hàng",
    role: "shipper",
    image: "",
    level: 1,
    coin: 50,
    createdAt: "2023-01-15",
    updatedAt: "2023-01-15",
  },
];

export const restaurants = [
  {
    id: 1,
    name: "Quán Pizza",
    address: "123 Đường Pizza",
    phone: "1112223333",
    opening_hours: "10:00 - 22:00",
    createdAt: "2023-01-01",
    updatedAt: "2023-01-01",
  },
  {
    id: 2,
    name: "Quán Hamburger",
    address: "456 Đường Hamburger",
    phone: "4445556666",
    opening_hours: "11:00 - 23:00",
    createdAt: "2023-01-01",
    updatedAt: "2023-01-01",
  },
  {
    id: 3,
    name: "Quán Phở",
    address: "789 Đường Phở",
    phone: "7778889999",
    opening_hours: "08:00 - 20:00",
    createdAt: "2023-01-05",
    updatedAt: "2023-01-05",
  },
  {
    id: 4,
    name: "Nhà Hàng Hải Sản",
    address: "101 Đường Hải Sản",
    phone: "3334445555",
    opening_hours: "12:00 - 22:00",
    createdAt: "2023-01-10",
    updatedAt: "2023-01-10",
  },
];

export const dishes = [
  {
    id: 1,
    restaurant_id: 1,
    name: "Pizza",
    img: "",
    price: 100000,
    rate: 4.5,
    type: "Chính",
    createdAt: "2023-01-01",
    updatedAt: "2023-01-01",
  },
  {
    id: 2,
    restaurant_id: 2,
    name: "Hamburger",
    img: "",
    price: 80000,
    rate: 4,
    type: "Chính",
    createdAt: "2023-01-01",
    updatedAt: "2023-01-01",
  },
  {
    id: 3,
    restaurant_id: 3,
    name: "Phở",
    img: "",
    price: 50000,
    rate: 4.8,
    type: "Chính",
    createdAt: "2023-01-05",
    updatedAt: "2023-01-05",
  },
  {
    id: 4,
    restaurant_id: 4,
    name: "Cua Rang Me",
    img: "",
    price: 200000,
    rate: 5,
    type: "Chính",
    createdAt: "2023-01-10",
    updatedAt: "2023-01-10",
  },
];

export const orders = [
  {
    id: 1,
    user_id: 1,
    restaurant_id: 1,
    price: 200000,
    ship: 50000,
    discount: 0,
    total_amount: 250000,
    createdAt: "2023-01-01",
    updatedAt: "2023-01-01",
  },
  {
    id: 2,
    user_id: 2,
    restaurant_id: 2,
    price: 150000,
    ship: 30000,
    discount: 20000,
    total_amount: 160000,
    createdAt: "2023-01-02",
    updatedAt: "2023-01-02",
  },
  {
    id: 3,
    user_id: 3,
    restaurant_id: 3,
    price: 100000,
    ship: 20000,
    discount: 10000,
    total_amount: 110000,
    createdAt: "2023-01-03",
    updatedAt: "2023-01-03",
  },
  {
    id: 4,
    user_id: 4,
    restaurant_id: 4,
    price: 300000,
    ship: 50000,
    discount: 0,
    total_amount: 350000,
    createdAt: "2023-01-04",
    updatedAt: "2023-01-04",
  },
];

export const reviews = [
  {
    id: 1,
    item_id: 1,
    user_id: 1,
    rating: 4,
    comment: "Món ăn ngon!",
    createdAt: "2023-01-01",
    updatedAt: "2023-01-01",
  },
  {
    id: 2,
    item_id: 1,
    user_id: 2,
    rating: 5,
    comment: "Dịch vụ tuyệt vời!",
    createdAt: "2023-01-02",
    updatedAt: "2023-01-02",
  },
  {
    id: 3,
    item_id: 2,
    user_id: 3,
    rating: 3,
    comment: "Trải nghiệm trung bình.",
    createdAt: "2023-01-03",
    updatedAt: "2023-01-03",
  },
  {
    id: 4,
    item_id: 3,
    user_id: 4,
    rating: 4.5,
    comment: "Phở rất ngon!",
    createdAt: "2023-01-05",
    updatedAt: "2023-01-05",
  },
  {
    id: 5,
    item_id: 4,
    user_id: 3,
    rating: 5,
    comment: "Hải sản tươi ngon!",
    createdAt: "2023-01-10",
    updatedAt: "2023-01-10",
  },
];
