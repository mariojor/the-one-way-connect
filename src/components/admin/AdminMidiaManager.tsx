
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Loader2, Pencil, Trash2, Video } from "lucide-react";

interface Midia {
  id: string;
  title: string;
  author: string;
  description: string;
  url: string;
  thumbnailUrl: string;
  type: string;
  duration: string;
  category: string;
  date: string;
}

const AdminMidiaManager = () => {
  const [midias, setMidias] = useState<Midia[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    fetchMidias();
  }, []);
  
  const fetchMidias = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3001/api/midia");
      if (!response.ok) throw new Error("Erro ao buscar mídias");
      
      const data = await response.json();
      setMidias(data);
    } catch (error) {
      console.error("Erro ao carregar mídias:", error);
      toast.error("Não foi possível carregar as mídias");
    } finally {
      setLoading(false);
    }
  };
  
  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta mídia?")) {
      try {
        const response = await fetch(`http://localhost:3001/api/midia/${id}`, {
          method: "DELETE",
        });
        
        if (response.ok) {
          setMidias((prevMidias) => prevMidias.filter((midia) => midia.id !== id));
          toast.success("Mídia excluída com sucesso");
        } else {
          throw new Error("Erro ao excluir mídia");
        }
      } catch (error) {
        console.error("Erro ao excluir mídia:", error);
        toast.error("Não foi possível excluir a mídia");
      }
    }
  };
  
  const filteredMidias = midias.filter((midia) =>
    midia.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    midia.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    midia.type.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div>
      <div className="mb-4">
        <Input
          placeholder="Pesquisar por título..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-one-way-blue" />
        </div>
      ) : midias.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-md">
          <p className="text-gray-500">Nenhuma mídia cadastrada.</p>
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Autor</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMidias.map((midia) => (
                <TableRow key={midia.id}>
                  <TableCell className="font-medium">{midia.title}</TableCell>
                  <TableCell>{midia.author}</TableCell>
                  <TableCell>{midia.type}</TableCell>
                  <TableCell>{midia.category}</TableCell>
                  <TableCell>
                    {midia.date && format(parseISO(midia.date), "dd/MM/yyyy", { locale: ptBR })}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link to={`/admin/midia/editar/${midia.id}`}>
                        <Button size="sm" variant="outline">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleDelete(midia.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AdminMidiaManager;
