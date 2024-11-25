# 使用官方 Python 基礎映像
FROM python:3.10-slim

# 設置工作目錄
WORKDIR /app

# 複製應用文件
COPY . /app

# 安裝依賴
RUN pip install --no-cache-dir -r requirements.txt

# 暴露應用執行端口
EXPOSE 5000

# 啟動 Flask 應用
CMD ["python", "app.py"]