import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div style={{ marginTop: "3rem" }}>{children}</div>
      <Footer />
    </>
  );
}
