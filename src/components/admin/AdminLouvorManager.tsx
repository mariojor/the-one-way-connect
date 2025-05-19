
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
import { Badge } from "@/components/ui/badge";
import { Loader2, Pencil, Trash2 } from "lucide-react";

interface Louvor {
  id: string;
  titulo: string;
  artista: string;
  album: string;
  ano: string;
  categoria: string;
  letra?: string;
  audio?: string;
}

const AdminLouvorManager = () => {
  const [louvores, setLouvores] = useState<Louvor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    fetchLouvores();
  }, []);
  
  const fetchLouvores = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3001/api/louvores");
      if (!response.ok) throw new Error("Erro ao buscar louvores");
      
      const data = await response.json();
      setLouvores(data);
    } catch (error) {
      console.error("Erro ao carregar louvores:", error);
      toast.error("Não foi possível carregar os louvores");
    } finally {
      setLoading(false);
    }
  };
  
  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este louvor?")) {
      try {
        const response = await fetch(`http://localhost:3001/api/louvores/${id}`, {
          method: "DELETE",
        });
        
        if (response.ok) {
          setLouvores((prevLouvores) => prevLouvores.filter((louvor) => louvor.id !== id));
          toast.success("Louvor excluído com sucesso");
        } else {
          throw new Error("Erro ao excluir louvor");
        }
      } catch (error) {
        console.error("Erro ao excluir louvor:", error);
        toast.error("Não foi possível excluir o louvor");
      }
    }
  };
  
  const filteredLouvores = louvores.filter((louvor) =>
    louvor.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    louvor.artista.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div>
      <div className="mb-4">
        <Input
          placeholder="Pesquisar por título ou artista..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-one-way-blue" />
        </div>
      ) : louvores.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-md">
          <p className="text-gray-500">Nenhum louvor cadastrado.</p>
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Artista</TableHead>
                <TableHead>Álbum</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLouvores.map((louvor) => (
                <TableRow key={louvor.id}>
                  <TableCell className="font-medium">{louvor.titulo}</TableCell>
                  <TableCell>{louvor.artista}</TableCell>
                  <TableCell>{louvor.album} ({louvor.ano})</TableCell>
                  <TableCell>
                    <Badge variant="outline">{louvor.categoria}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link to={`/admin/louvor/editar/${louvor.id}`}>
                        <Button size="sm" variant="outline">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleDelete(louvor.id)}
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

export default AdminLouvorManager;
