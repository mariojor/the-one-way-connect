
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

interface Noticia {
  id: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  date: string;
  author: string;
}

const AdminNoticiaManager = () => {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    fetchNoticias();
  }, []);
  
  const fetchNoticias = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3001/api/noticias");
      if (!response.ok) throw new Error("Erro ao buscar notícias");
      
      const data = await response.json();
      setNoticias(data);
    } catch (error) {
      console.error("Erro ao carregar notícias:", error);
      toast.error("Não foi possível carregar as notícias");
    } finally {
      setLoading(false);
    }
  };
  
  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta notícia?")) {
      try {
        const response = await fetch(`http://localhost:3001/api/noticias/${id}`, {
          method: "DELETE",
        });
        
        if (response.ok) {
          setNoticias((prevNoticias) => prevNoticias.filter((noticia) => noticia.id !== id));
          toast.success("Notícia excluída com sucesso");
        } else {
          throw new Error("Erro ao excluir notícia");
        }
      } catch (error) {
        console.error("Erro ao excluir notícia:", error);
        toast.error("Não foi possível excluir a notícia");
      }
    }
  };
  
  const filteredNoticias = noticias.filter((noticia) =>
    noticia.title.toLowerCase().includes(searchTerm.toLowerCase())
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
      ) : noticias.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-md">
          <p className="text-gray-500">Nenhuma notícia cadastrada.</p>
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Autor</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNoticias.map((noticia) => (
                <TableRow key={noticia.id}>
                  <TableCell className="font-medium">{noticia.title}</TableCell>
                  <TableCell>{noticia.author}</TableCell>
                  <TableCell>
                    {noticia.date && format(parseISO(noticia.date), "dd/MM/yyyy", { locale: ptBR })}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link to={`/admin/noticias/editar/${noticia.id}`}>
                        <Button size="sm" variant="outline">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleDelete(noticia.id)}
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

export default AdminNoticiaManager;
