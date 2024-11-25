# 使用 Node.js 官方鏡像
FROM node:18

# 設定工作目錄
WORKDIR /usr/src/app

# 複製 package.json 和 yarn.lock
COPY package.json yarn.lock ./

# 安裝依賴
RUN yarn install

# 複製應用源碼
COPY . .

# 編譯應用 (適用於 Next.js)
RUN yarn build

# 開放 3000 端口
EXPOSE 3000

# 啟動應用
CMD ["yarn", "start"]