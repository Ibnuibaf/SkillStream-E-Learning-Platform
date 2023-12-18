import AdminSideBar from "../components/AdminSideBar";
import CategoriesTab from "../components/CategoriesTab";

function AdminCategoryPage() {
  return (
    <div className="min-h-screen flex flex-row">
      <div>
        <AdminSideBar />
      </div>
      <div className="w-full ">
        <CategoriesTab/>
      </div>
    </div>
  );
}

export default AdminCategoryPage;