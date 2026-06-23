#!/bin/bash
# iconstore 开发服务器启动脚本
# 使用方式: 双击运行, 或添加到登录项自动启动

cd "$(dirname "$0")/.."

if lsof -ti:5173 &>/dev/null; then
  echo "✅ iconstore 已在运行 (端口 5173)"
  open http://localhost:5173
  exit 0
fi

echo "🚀 启动 iconstore 开发服务器..."
nohup npx vite --host > /tmp/vite-server.log 2>&1 &

# 等待服务器就绪
for i in {1..15}; do
  sleep 1
  if curl -s -o /dev/null -w '' http://localhost:5173/ 2>/dev/null; then
    echo "✅ 服务器已就绪, 正在打开..."
    open http://localhost:5173
    exit 0
  fi
done

echo "❌ 启动超时, 请查看日志: cat /tmp/vite-server.log"
