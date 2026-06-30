import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

function MainLayout({
  children,
}) {
  return (
    <div
      className="
      min-h-screen
      bg-zinc-50
      dark:bg-zinc-950
      text-zinc-900
      dark:text-white
      "
    >
      <Navbar />

      {children}

      <Footer />
    </div>
  );
}

export default MainLayout;