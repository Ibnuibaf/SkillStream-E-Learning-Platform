import AdminSideBar from "../components/AdminSideBar";
import CategoriesTab from "../components/CategoriesTab";
import Footer from "../components/Footer";

function AdminCategoryPage() {
  return (
    <div className="min-h-screen flex flex-row">
      <div>
        <AdminSideBar />
      </div>
      <div className="w-full ">
        <CategoriesTab />
        <Footer />
      </div>
    </div>
  );
}

export default AdminCategoryPage;
