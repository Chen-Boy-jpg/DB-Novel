import { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // 未登入時從 / 跳轉到 /login
      {
        source: "/",
        destination: "/login",
        permanent: false,
      },
      // 超級帳號登入後從 /home 跳轉到 /cms
      {
        source: "/home",
        has: [
          {
            type: "cookie",
            key: "role",
            value: "superadmin",
          },
        ],
        destination: "/cms",
        permanent: false,
      },
      // 一般帳號訪問 /cms 跳轉到 /home
      {
        source: "/cms",
        has: [
          {
            type: "cookie",
            key: "role",
            value: "user",
          },
        ],
        destination: "/home",
        permanent: false,
      },
      // 登入後超級帳號跳轉到 /cms
      {
        source: "/login",
        has: [
          {
            type: "cookie",
            key: "role",
            value: "superadmin",
          },
        ],
        destination: "/cms",
        permanent: false,
      },
      // 登入後一般帳號跳轉到 /home
      {
        source: "/login",
        has: [
          {
            type: "cookie",
            key: "role",
            value: "user",
          },
        ],
        destination: "/home",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
