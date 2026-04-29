import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prof. Dr. Mehmet Temel Yılmaz | Areteus Sağlık",
  description: "Prof. Dr. Mehmet Temel Yılmaz kişisel web sitesi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
