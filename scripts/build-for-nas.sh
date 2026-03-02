#!/bin/bash

# 为飞牛 NAS 构建 Docker 镜像的脚本
# 支持多架构构建（自动检测或指定架构）

set -e

# 获取脚本所在目录，然后切换到项目根目录
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$PROJECT_ROOT"

IMAGE_NAME="global-reach-analyzer"
IMAGE_TAG="latest"
OUTPUT_FILE="${IMAGE_NAME}.tar"

# 检测 NAS 架构（默认使用 linux/amd64，如果是 ARM NAS 可以改为 linux/arm64）
NAS_ARCH="${NAS_ARCH:-linux/amd64}"

echo "🚀 开始为飞牛 NAS 构建 Docker 镜像..."
echo "📋 目标架构: ${NAS_ARCH}"

# 检查是否安装了 buildx
if ! docker buildx version &> /dev/null; then
    echo "❌ Docker buildx 未安装，请先安装："
    echo "   Docker Desktop: 已包含 buildx"
    echo "   或运行: docker buildx install"
    exit 1
fi

# 创建并使用 buildx builder（如果不存在）
BUILDER_NAME="multiarch-builder"
if ! docker buildx ls | grep -q "$BUILDER_NAME"; then
    echo "📦 创建 buildx builder..."
    docker buildx create --name "$BUILDER_NAME" --use
fi

docker buildx use "$BUILDER_NAME"

# 检查是否需要 API Key
if [ -n "$GEMINI_API_KEY" ]; then
    echo "📝 使用提供的 GEMINI_API_KEY 构建..."
    docker buildx build \
        --platform "${NAS_ARCH}" \
        --build-arg GEMINI_API_KEY="$GEMINI_API_KEY" \
        -f docker/Dockerfile.simple \
        -t ${IMAGE_NAME}:${IMAGE_TAG} \
        --load \
        .
else
    echo "📝 构建镜像（无 API Key）..."
    docker buildx build \
        --platform "${NAS_ARCH}" \
        -f docker/Dockerfile.simple \
        -t ${IMAGE_NAME}:${IMAGE_TAG} \
        --load \
        .
fi

echo "✅ 镜像构建完成！"
echo "📦 开始导出镜像..."

docker save -o ${OUTPUT_FILE} ${IMAGE_NAME}:${IMAGE_TAG}

FILE_SIZE=$(du -h ${OUTPUT_FILE} | cut -f1)
echo "✅ 镜像已导出到: ${OUTPUT_FILE} (大小: ${FILE_SIZE})"

# 询问是否压缩
read -p "是否要压缩镜像文件以减小传输大小? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🗜️  正在压缩..."
    gzip -f ${OUTPUT_FILE}
    COMPRESSED_FILE="${OUTPUT_FILE}.gz"
    COMPRESSED_SIZE=$(du -h ${COMPRESSED_FILE} | cut -f1)
    echo "✅ 压缩完成: ${COMPRESSED_FILE} (大小: ${COMPRESSED_SIZE})"
    echo ""
    echo "📤 下一步：将 ${COMPRESSED_FILE} 传输到 NAS"
    echo "   使用 SCP: scp ${COMPRESSED_FILE} admin@NAS_IP:/vol1/1000/docker/"
    echo ""
    echo "📋 在 NAS 上导入镜像的命令："
    echo "   1. gunzip ${COMPRESSED_FILE}"
    echo "   2. sudo docker load -i ${OUTPUT_FILE}"
else
    echo ""
    echo "📤 下一步：将 ${OUTPUT_FILE} 传输到 NAS"
    echo "   使用 SCP: scp ${OUTPUT_FILE} admin@NAS_IP:/vol1/1000/docker/"
    echo ""
    echo "📋 在 NAS 上导入镜像的命令："
    echo "   sudo docker load -i ${OUTPUT_FILE}"
fi

echo ""
echo "💡 提示：如果 NAS 是 ARM 架构，请设置环境变量："
echo "   export NAS_ARCH=linux/arm64"
echo "   然后重新运行此脚本"

