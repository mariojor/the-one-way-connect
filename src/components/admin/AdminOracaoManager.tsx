
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
import { Loader2, Pencil, Trash2 } from "lucide-react";

interface Oracao {
  id: string;
  titulo: string;
  versiculo: string;
  texto: string;
  conteudo: string;
  date: string;
}

const AdminOracaoManager = () => {
  const [oracoes, setOracoes] = useState<Oracao[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    fetchOracoes();
  }, []);
  
  const fetchOracoes = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3001/api/oracoes");
      if (!response.ok) throw new Error("Erro ao buscar orações");
      
      const data = await response.json();
      setOracoes(data);
    } catch (error) {
      console.error("Erro ao carregar orações:", error);
      toast.error("Não foi possível carregar as orações");
    } finally {
      setLoading(false);
    }
  };
  
  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta oração?")) {
      try {
        const response = await fetch(`http://localhost:3001/api/oracoes/${id}`, {
          method: "DELETE",
        });
        
        if (response.ok) {
          setOracoes((prevOracoes) => prevOracoes.filter((oracao) => oracao.id !== id));
          toast.success("Oração excluída com sucesso");
        } else {
          throw new Error("Erro ao excluir oração");
        }
      } catch (error) {
        console.error("Erro ao excluir oração:", error);
        toast.error("Não foi possível excluir a oração");
      }
    }
  };
  
  const filteredOracoes = oracoes.filter((oracao) =>
    oracao.titulo.toLowerCase().includes(searchTerm.toLowerCase())
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
      ) : oracoes.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-md">
          <p className="text-gray-500">Nenhuma oração cadastrada.</p>
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Versículo</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOracoes.map((oracao) => (
                <TableRow key={oracao.id}>
                  <TableCell className="font-medium">{oracao.titulo}</TableCell>
                  <TableCell>{oracao.versiculo}</TableCell>
                  <TableCell>
                    {oracao.date && format(parseISO(oracao.date), "dd/MM/yyyy", { locale: ptBR })}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link to={`/admin/oracao/editar/${oracao.id}`}>
                        <Button size="sm" variant="outline">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleDelete(oracao.id)}
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

export default AdminOracaoManager;
