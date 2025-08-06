import AdminAuth from "@/components/admin/AdminAuth";
import CatalogueManager from "@/components/admin/CatalogueManager";

export default function AdminPage() {
  return (
    <AdminAuth>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6 text-white">Admin Panel</h1>
        <CatalogueManager />
      </div>
    </AdminAuth>
  );
}
