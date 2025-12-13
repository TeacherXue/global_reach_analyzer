# 构建阶段 - 使用公共镜像源（如果飞牛NAS镜像源有问题，可以尝试这个）
FROM docker.io/library/node:20-alpine AS builder

WORKDIR /app

# 复制 package 文件
COPY package*.json ./

# 安装依赖
RUN npm ci

# 复制源代码
COPY . .

# 构建参数 - 用于传递环境变量（ARG 不会保留在最终镜像中）
ARG GEMINI_API_KEY

# 构建应用（通过环境变量传递给构建过程）
RUN GEMINI_API_KEY=$GEMINI_API_KEY npm run build

# 生产阶段 - 使用 nginx（使用公共镜像源）
FROM docker.io/library/nginx:alpine

# 复制构建产物到 nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]

