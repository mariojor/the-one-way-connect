
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

interface Missao {
  id: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  location: string;
  missionary: string;
  status: "ativo" | "concluido" | "planejado";
  date: string;
}

const AdminMissoesManager = () => {
  const [missoes, setMissoes] = useState<Missao[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    fetchMissoes();
  }, []);
  
  const fetchMissoes = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3001/api/missoes");
      if (!response.ok) throw new Error("Erro ao buscar missões");
      
      const data = await response.json();
      setMissoes(data);
    } catch (error) {
      console.error("Erro ao carregar missões:", error);
      toast.error("Não foi possível carregar as missões");
    } finally {
      setLoading(false);
    }
  };
  
  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta missão?")) {
      try {
        const response = await fetch(`http://localhost:3001/api/missoes/${id}`, {
          method: "DELETE",
        });
        
        if (response.ok) {
          setMissoes((prevMissoes) => prevMissoes.filter((missao) => missao.id !== id));
          toast.success("Missão excluída com sucesso");
        } else {
          throw new Error("Erro ao excluir missão");
        }
      } catch (error) {
        console.error("Erro ao excluir missão:", error);
        toast.error("Não foi possível excluir a missão");
      }
    }
  };
  
  const filteredMissoes = missoes.filter((missao) =>
    missao.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    missao.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    missao.missionary.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "ativo": return "default";
      case "concluido": return "secondary";
      case "planejado": return "outline";
      default: return "default";
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case "ativo": return "Ativo";
      case "concluido": return "Concluído";
      case "planejado": return "Planejado";
      default: return status;
    }
  };
  
  return (
    <div>
      <div className="mb-4">
        <Input
          placeholder="Pesquisar por título, localização ou missionário..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-one-way-blue" />
        </div>
      ) : missoes.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-md">
          <p className="text-gray-500">Nenhuma missão cadastrada.</p>
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Localização</TableHead>
                <TableHead>Missionário</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMissoes.map((missao) => (
                <TableRow key={missao.id}>
                  <TableCell className="font-medium">{missao.title}</TableCell>
                  <TableCell>{missao.location}</TableCell>
                  <TableCell>{missao.missionary}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(missao.status)}>
                      {getStatusText(missao.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link to={`/admin/missoes/editar/${missao.id}`}>
                        <Button size="sm" variant="outline">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleDelete(missao.id)}
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

export default AdminMissoesManager;
