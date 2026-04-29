export default function Home() {
  return (
    <main
      style={{
        margin: 0,
        minHeight: "100vh",
        backgroundColor: "#f6f3ef",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src="/hero.jpg"
        alt="Areteus Sağlık"
        style={{
          width: "100%",
          height: "auto",
          maxHeight: "100vh",
          objectFit: "contain",
          display: "block",
        }}
      />
    </main>
  );
}
