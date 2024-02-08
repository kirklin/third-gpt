import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Providers } from "./providers";
import Analytics from "~/components/Analytics";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: "Third GPT - AI, GPT, ChatGPT导航网站",
  description: "Third GPT是一个导航网站，提供关于人工智能（AI）、GPT模型和ChatGPT的相关信息，为您探索AI世界提供便捷。",
  // 添加更多的SEO属性
  keywords: "AI, GPT, ChatGPT, 人工智能, 导航网站, AIGC",
  robots: "index, follow", // 搜索引擎爬虫的行为指令
  other: {
    author: "Kirk Lin (https://github.com/kirklin)",
    canonical: "https://www.thirdGPT.com", // 建议搜索引擎抓取页面的主要URL
    ogTitle: "Third GPT - AI, GPT, ChatGPT导航网站",
    ogDescription: "Third GPT是一个导航网站，提供关于人工智能（AI）、GPT模型和ChatGPT的相关信息，为您探索AI世界提供便捷。",
    ogType: "website", // Open Graph协议类型
    ogImage: "https://www.thirdGPT.com/og-image.jpg", // Open Graph分享时的默认图片
    twitterCard: "summary_large_image", // Twitter卡片类型
    twitterSite: "@lkirkun", // Twitter网站账号
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div id="app">
            {children}
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
