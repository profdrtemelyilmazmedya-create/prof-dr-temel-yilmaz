export const metadata = {
  title: "Prof. Dr. M. Temel Yılmaz",
  description: "Areteus Sağlık",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
