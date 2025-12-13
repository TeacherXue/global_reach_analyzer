# Docker 部署指南

## 在飞牛NAS上部署

## 🚀 推荐方案：本地构建镜像，然后导入到NAS

### ⚠️ 重要：架构匹配问题

**如果遇到 `exec format error` 错误**，说明镜像架构与 NAS 不匹配。

**解决方案：使用 buildx 构建指定架构的镜像**

### 步骤1：在本地构建镜像（使用正确的架构）

**方法1：使用自动化脚本（推荐）**

```bash
# 对于 x86_64 架构的 NAS（大多数情况）
./build-for-nas.sh

# 对于 ARM 架构的 NAS
NAS_ARCH=linux/arm64 ./build-for-nas.sh

# 如果需要 API Key
GEMINI_API_KEY=your_api_key ./build-for-nas.sh
```

**方法2：手动使用 buildx**

```bash
# 确保 buildx 可用
docker buildx version

# 创建 builder（如果还没有）
docker buildx create --name multiarch-builder --use

# 构建镜像（x86_64 架构，适用于大多数 NAS）
docker buildx build \
  --platform linux/amd64 \
  -f Dockerfile.simple \
  -t global-reach-analyzer:latest \
  --load \
  .

# 如果是 ARM 架构的 NAS，使用：
# --platform linux/arm64

# 导出镜像
docker save -o global-reach-analyzer.tar global-reach-analyzer:latest
```

**方法3：如果 buildx 不可用，使用 --platform 参数**

```bash
# 构建时指定平台
docker build \
  --platform linux/amd64 \
  -f Dockerfile.simple \
  -t global-reach-analyzer:latest \
  .

# 导出镜像
docker save -o global-reach-analyzer.tar global-reach-analyzer:latest
```

### 步骤2：传输到 NAS

```bash
# 使用 SCP
scp global-reach-analyzer.tar admin@NAS_IP:/vol1/1000/docker/

# 或压缩后传输（更快）
gzip global-reach-analyzer.tar
scp global-reach-analyzer.tar.gz admin@NAS_IP:/vol1/1000/docker/
```

### 步骤3：在 NAS 上导入和运行

```bash
# SSH 到 NAS
ssh admin@NAS_IP

# 进入目录
cd /vol1/1000/docker/

# 如果压缩了，先解压
gunzip global-reach-analyzer.tar.gz  # 如果需要

# 导入镜像
sudo docker load -i global-reach-analyzer.tar

# 验证镜像
sudo docker images | grep global-reach-analyzer

# 运行容器
sudo docker run -d \
  --name global-reach-analyzer \
  -p 3000:80 \
  --restart unless-stopped \
  global-reach-analyzer:latest
```

### 步骤4：访问应用

浏览器访问：`http://你的NAS IP:3000`

---

## 备选方案：直接在NAS上构建

### ⚠️ 镜像源问题解决

如果遇到 `401 Unauthorized` 或镜像拉取失败，说明飞牛NAS的Docker镜像源配置有问题。可以使用以下方法：

**方法1：配置Docker镜像加速器（最推荐）**
在飞牛NAS的Docker设置中，配置镜像加速器。编辑 `/etc/docker/daemon.json`（如果不存在则创建）：
```json
{
  "registry-mirrors": [
    "https://docker.mirrors.ustc.edu.cn",
    "https://hub-mirror.c.163.com",
    "https://mirror.ccs.tencentyun.com"
  ]
}
```
然后重启Docker服务：
```bash
sudo systemctl restart docker
```

配置后，使用标准的 `Dockerfile` 或 `Dockerfile.simple` 即可。

**方法2：使用简单的Dockerfile（推荐）**
如果已经配置了镜像加速器，直接使用：
```bash
docker build -f Dockerfile.simple -t global-reach-analyzer .
```

**方法3：使用带前缀的Dockerfile**
如果镜像加速器不工作，可以尝试：
```bash
docker build -f Dockerfile -t global-reach-analyzer .
# 或
docker build -f Dockerfile.aliyun -t global-reach-analyzer .
```

### 方法一：使用 Docker Compose（推荐）

1. **上传文件到飞牛NAS**
   - 将整个项目文件夹上传到 NAS 的某个目录，例如：`/volume1/docker/global-reach-analyzer`

2. **进入项目目录**
   ```bash
   cd /volume1/docker/global-reach-analyzer
   ```

3. **构建并启动容器**
   ```bash
   docker-compose up -d
   ```
   
   **如果遇到镜像源问题，可以指定使用备用Dockerfile：**
   ```bash
   # 使用简单版本（推荐，需要先配置镜像加速器）
   docker build -f Dockerfile.simple -t global-reach-analyzer .
   
   # 或使用带前缀的版本
   docker build -f Dockerfile -t global-reach-analyzer .
   ```

4. **查看日志**
   ```bash
   docker-compose logs -f
   ```

5. **访问应用**
   - 浏览器访问：`http://你的NAS IP:3000`

### 方法二：使用 Docker 命令

1. **构建镜像**
   ```bash
   docker build -t global-reach-analyzer .
   ```

2. **运行容器**
   ```bash
   docker run -d \
     --name global-reach-analyzer \
     -p 3000:80 \
     --restart unless-stopped \
     global-reach-analyzer
   ```

### 在飞牛NAS Web界面部署

1. 打开飞牛NAS的Docker管理界面
2. 选择"镜像" -> "构建镜像"
3. 选择项目目录，使用 Dockerfile 构建
4. 构建完成后，创建容器：
   - 镜像：选择刚构建的镜像
   - 端口映射：3000:80
   - 重启策略：unless-stopped

### 环境变量配置（可选）

如果应用需要 Gemini API Key，可以通过以下方式配置：

**方法1：使用 .env 文件（推荐）**
1. 在项目根目录创建 `.env` 文件（不要提交到 git）：
```bash
GEMINI_API_KEY=your_api_key_here
```

2. 构建时会自动读取 `.env` 文件中的变量：
```bash
docker-compose build
docker-compose up -d
```

**方法2：在构建时直接传入**
```bash
docker build --build-arg GEMINI_API_KEY=your_api_key_here -t global-reach-analyzer .
```

**注意：** 
- API Key 会在构建时被打包到前端代码中（因为 Vite 的 define 会在构建时替换）
- 这意味着 API Key 会暴露在浏览器中
- 如果担心安全性，建议使用后端代理 API 请求

### 更新应用

1. **停止容器**
   ```bash
   docker-compose down
   ```

2. **重新构建**
   ```bash
   docker-compose build --no-cache
   ```

3. **启动容器**
   ```bash
   docker-compose up -d
   ```

### 常用命令

- 查看运行状态：`docker-compose ps`
- 查看日志：`docker-compose logs -f`
- 停止服务：`docker-compose stop`
- 重启服务：`docker-compose restart`
- 删除容器和镜像：`docker-compose down --rmi all`

### 端口修改

如果需要修改端口，编辑 `docker-compose.yml` 文件中的端口映射：
```yaml
ports:
  - "你的端口:80"  # 例如 "8080:80"
```

