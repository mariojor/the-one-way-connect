
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Edit2, 
  Trash2,
  Loader2,
  Tag,
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

// Tipo para Artigo
interface Artigo {
  id: string;
  title: string;
  author: string;
  date: string;
  summary: string;
  content: string;
  imageUrl: string;
  tags: string[];
}

const AdminArtigoManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTag, setFilterTag] = useState("");
  
  const fetchArtigos = async () => {
    const response = await fetch('http://localhost:3001/api/artigos');
    if (!response.ok) throw new Error('Erro ao buscar artigos');
    return response.json() as Promise<Artigo[]>;
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['artigos'],
    queryFn: fetchArtigos,
  });

  const handleEdit = (id: string) => {
    // Implementação futura para edição de artigo
    toast.info(`Editando artigo ID: ${id}`);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este artigo?")) return;
    
    try {
      const response = await fetch(`http://localhost:3001/api/artigos/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error("Falha ao excluir artigo");
      
      toast.success("Artigo excluído com sucesso");
      refetch();
    } catch (error) {
      console.error("Erro ao excluir:", error);
      toast.error("Erro ao excluir artigo");
    }
  };

  const filteredArtigos = data?.filter(artigo => {
    const matchesSearch = 
      artigo.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      artigo.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artigo.summary.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTag = filterTag
      ? artigo.tags.some(tag => tag.toLowerCase() === filterTag.toLowerCase())
      : true;
    
    return matchesSearch && matchesTag;
  });

  // Extrair todas as tags únicas dos artigos
  const allTags = [...new Set(data?.flatMap(artigo => artigo.tags) || [])];

  const resetFilters = () => {
    setSearchTerm("");
    setFilterTag("");
  };

  if (error) return <div className="text-red-500">Erro ao carregar artigos</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-end">
        <div className="flex-grow">
          <label className="text-sm font-medium mb-1 block">Buscar por título, autor ou resumo</label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar artigo..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block">Filtrar por tag</label>
          <div className="relative">
            <Tag className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <select
              value={filterTag}
              onChange={(e) => setFilterTag(e.target.value)}
              className="w-full pl-8 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">Todas as tags</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          onClick={resetFilters}
          className="mb-0"
        >
          Limpar filtros
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center my-8">
          <Loader2 className="h-8 w-8 animate-spin text-one-way-blue" />
        </div>
      ) : (
        <>
          {filteredArtigos?.length ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Autor</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredArtigos.map((artigo) => (
                  <TableRow key={artigo.id}>
                    <TableCell className="font-medium">{artigo.title}</TableCell>
                    <TableCell>{artigo.author}</TableCell>
                    <TableCell>
                      {format(parseISO(artigo.date), "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {artigo.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(artigo.id)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(artigo.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center p-8 border rounded-lg bg-gray-50">
              <p className="text-gray-500">Nenhum artigo encontrado</p>
              <Button 
                className="mt-4"
                onClick={() => resetFilters()}
              >
                Limpar filtros
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminArtigoManager;
