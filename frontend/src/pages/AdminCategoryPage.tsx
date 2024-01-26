import AdminSideBar from "../components/Sidebar/AdminSideBar";
import CategoriesTab from "../components/Lists/CategoriesTab";
import Footer from "../components/Footer/Footer";

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
