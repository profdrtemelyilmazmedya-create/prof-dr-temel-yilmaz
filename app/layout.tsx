export const metadata = {
  title: "Prof. Dr. Mehmet Temel Yılmaz",
  description: "Areteus Sağlık",
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
