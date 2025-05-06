# Sử dụng Node.js làm base image
FROM node:16 AS build

# Đặt thư mục làm việc
WORKDIR /app

# Tăng bộ nhớ heap cho Node.js
ENV NODE_OPTIONS="--max-old-space-size=8192" 
# 8GB bộ nhớ heap

# Copy package.json và cài đặt dependencies, bỏ qua lỗi peer dependencies
COPY package.json ./
RUN npm install --legacy-peer-deps

# Copy phần còn lại của ứng dụng và build
COPY ./ ./
RUN npm run build --verbose

# Dùng nginx để serve ứng dụng
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
