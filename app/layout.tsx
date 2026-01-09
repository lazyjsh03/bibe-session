import type { Metadata } from "next";
import "./styles/globals.css";

export const metadata: Metadata = {
  title: "팀 협업 투두앱",
  description: "팀이 함께 작업을 관리하는 투두 앱",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
