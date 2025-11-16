import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <Navbar />

      <main className="max-w-6xl mx-auto py-10 px-6">{children}</main>

      <Footer />
    </div>
  );
}
