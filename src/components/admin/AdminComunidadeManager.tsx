
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
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Loader2, Pencil, Trash2 } from "lucide-react";

interface ConteudoComunidade {
  id: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  author: string;
  date: string;
  type: "evento" | "noticia" | "post";
}

const AdminComunidadeManager = () => {
  const [conteudos, setConteudos] = useState<ConteudoComunidade[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    fetchConteudos();
  }, []);
  
  const fetchConteudos = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3001/api/comunidade");
      if (!response.ok) throw new Error("Erro ao buscar conteúdos");
      
      const data = await response.json();
      setConteudos(data);
    } catch (error) {
      console.error("Erro ao carregar conteúdos:", error);
      toast.error("Não foi possível carregar os conteúdos");
    } finally {
      setLoading(false);
    }
  };
  
  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este conteúdo?")) {
      try {
        const response = await fetch(`http://localhost:3001/api/comunidade/${id}`, {
          method: "DELETE",
        });
        
        if (response.ok) {
          setConteudos((prevConteudos) => prevConteudos.filter((conteudo) => conteudo.id !== id));
          toast.success("Conteúdo excluído com sucesso");
        } else {
          throw new Error("Erro ao excluir conteúdo");
        }
      } catch (error) {
        console.error("Erro ao excluir conteúdo:", error);
        toast.error("Não foi possível excluir o conteúdo");
      }
    }
  };
  
  const filteredConteudos = conteudos.filter((conteudo) =>
    conteudo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conteudo.type.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getTypeVariant = (type: string) => {
    switch (type) {
      case "evento": return "default";
      case "noticia": return "secondary";
      case "post": return "outline";
      default: return "default";
    }
  };
  
  const getTypeText = (type: string) => {
    switch (type) {
      case "evento": return "Evento";
      case "noticia": return "Notícia";
      case "post": return "Postagem";
      default: return type;
    }
  };
  
  return (
    <div>
      <div className="mb-4">
        <Input
          placeholder="Pesquisar por título ou tipo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-one-way-blue" />
        </div>
      ) : conteudos.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-md">
          <p className="text-gray-500">Nenhum conteúdo cadastrado.</p>
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Autor</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredConteudos.map((conteudo) => (
                <TableRow key={conteudo.id}>
                  <TableCell className="font-medium">{conteudo.title}</TableCell>
                  <TableCell>
                    <Badge variant={getTypeVariant(conteudo.type)}>
                      {getTypeText(conteudo.type)}
                    </Badge>
                  </TableCell>
                  <TableCell>{conteudo.author}</TableCell>
                  <TableCell>
                    {conteudo.date && format(parseISO(conteudo.date), "dd/MM/yyyy", { locale: ptBR })}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link to={`/admin/comunidade/editar/${conteudo.id}`}>
                        <Button size="sm" variant="outline">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleDelete(conteudo.id)}
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

export default AdminComunidadeManager;
