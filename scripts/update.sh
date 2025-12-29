#!/bin/bash
# 更新脚本 - 在 tar 文件所在目录执行

TAR_FILE="./global-reach-analyzer.tar"
CONTAINER_NAME="global-reach-analyzer"
IMAGE_NAME="global-reach-analyzer:latest"

echo "🔄 开始更新..."
echo "📦 TAR 文件路径: $TAR_FILE"

# 检查 tar 文件是否存在
if [ ! -f "$TAR_FILE" ]; then
    echo "❌ 错误: 找不到 tar 文件: $TAR_FILE"
    exit 1
fi

# 加载新镜像
docker load -i $TAR_FILE

# 停止并删除旧容器
docker stop $CONTAINER_NAME 2>/dev/null
docker rm $CONTAINER_NAME 2>/dev/null

# 启动新容器
docker run -d \
  --name $CONTAINER_NAME \
  --restart unless-stopped \
  -p 3222:80 \
  $IMAGE_NAME

# 清理旧镜像
docker image prune -f

echo "✅ 更新完成！"
docker ps | grep $CONTAINER_NAME