
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

interface Estudo {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  author: string;
  imageUrl: string;
  level: "iniciante" | "intermediario" | "avancado";
}

const AdminEstudoManager = () => {
  const [estudos, setEstudos] = useState<Estudo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    fetchEstudos();
  }, []);
  
  const fetchEstudos = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3001/api/estudos");
      if (!response.ok) throw new Error("Erro ao buscar estudos");
      
      const data = await response.json();
      setEstudos(data);
    } catch (error) {
      console.error("Erro ao carregar estudos:", error);
      toast.error("Não foi possível carregar os estudos");
    } finally {
      setLoading(false);
    }
  };
  
  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este estudo?")) {
      try {
        const response = await fetch(`http://localhost:3001/api/estudos/${id}`, {
          method: "DELETE",
        });
        
        if (response.ok) {
          setEstudos((prevEstudos) => prevEstudos.filter((estudo) => estudo.id !== id));
          toast.success("Estudo excluído com sucesso");
        } else {
          throw new Error("Erro ao excluir estudo");
        }
      } catch (error) {
        console.error("Erro ao excluir estudo:", error);
        toast.error("Não foi possível excluir o estudo");
      }
    }
  };
  
  const filteredEstudos = estudos.filter((estudo) =>
    estudo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getLevelVariant = (level: string) => {
    switch (level) {
      case "iniciante": return "default";
      case "intermediario": return "outline";
      case "avancado": return "secondary";
      default: return "default";
    }
  };
  
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
      ) : estudos.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-md">
          <p className="text-gray-500">Nenhum estudo cadastrado.</p>
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Nível</TableHead>
                <TableHead>Autor</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEstudos.map((estudo) => (
                <TableRow key={estudo.id}>
                  <TableCell className="font-medium">{estudo.title}</TableCell>
                  <TableCell>{estudo.category}</TableCell>
                  <TableCell>
                    <Badge variant={getLevelVariant(estudo.level)}>
                      {estudo.level === "iniciante" ? "Iniciante" : 
                       estudo.level === "intermediario" ? "Intermediário" : "Avançado"}
                    </Badge>
                  </TableCell>
                  <TableCell>{estudo.author}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link to={`/admin/estudos/editar/${estudo.id}`}>
                        <Button size="sm" variant="outline">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleDelete(estudo.id)}
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

export default AdminEstudoManager;
