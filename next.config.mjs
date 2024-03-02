const debug = process.env.NODE_ENV !== "production";
const repository = "MyHomeVer2";

const nextConfig = {
  reactStrictMode: true,
  output: !debug ? "export" : undefined,
  distDir: "out",
  assetPrefix: !debug ? `/${repository}/` : "", // production 일때 prefix 경로
  trailingSlash: true, // 빌드 시 폴더 구조 그대로 생성하도록
  images: {
    path: "/",
    loader: "imgix",
  },

  mode: "jit",
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

export default nextConfig;
