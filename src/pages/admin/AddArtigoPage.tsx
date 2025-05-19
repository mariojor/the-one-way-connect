
import { useParams } from "react-router-dom";
import { FileText } from "lucide-react";
import AdminArtigoForm from "@/components/admin/AdminArtigoForm";

const AddArtigoPage = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container-custom py-4">
          <div className="flex items-center gap-4">
            <FileText className="h-8 w-8 text-one-way-blue" />
            <div>
              <h1 className="text-2xl font-bold">
                {isEditing ? "Editar Artigo" : "Novo Artigo"}
              </h1>
              <p className="text-gray-500 text-sm">
                {isEditing ? "Atualize os campos abaixo" : "Preencha os campos abaixo para adicionar um novo artigo"}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="container-custom py-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <AdminArtigoForm artigoId={id} />
        </div>
      </div>
    </div>
  );
};

export default AddArtigoPage;
