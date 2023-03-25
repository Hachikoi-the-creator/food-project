import Navbar from "./Navbar";
import Footer from "./Footer";
import { LayoutMain } from "./styles/LayoutStuff";

export default function Layout({ children }) {
  return (
    <LayoutMain>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </LayoutMain>
  );
}
