
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Link } from "react-router-dom";
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
  Calendar as CalendarIcon,
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Tipo para Devocional
interface Devocional {
  id: string;
  date?: string;
  data?: string; // Adicionando campo alternativo
  title?: string;
  titulo?: string; // Adicionando campo alternativo
  verse?: string;
  versiculo?: string; // Adicionando campo alternativo
  verseText?: string;
  content?: string;
  prayer?: string;
  application?: string;
  authorId?: string;
  autor?: string; // Adicionando campo alternativo
}

const AdminDevocionalManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  
  const fetchDevocionais = async () => {
    const response = await fetch('http://localhost:3001/api/devocionais');
    if (!response.ok) throw new Error('Erro ao buscar devocionais');
    return response.json() as Promise<Devocional[]>;
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['devocionais'],
    queryFn: fetchDevocionais,
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este devocional?")) return;
    
    try {
      const response = await fetch(`http://localhost:3001/api/devocionais/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error("Falha ao excluir devocional");
      
      toast.success("Devocional excluído com sucesso");
      refetch(); // Atualiza a lista
    } catch (error) {
      console.error("Erro ao excluir:", error);
      toast.error("Erro ao excluir devocional");
    }
  };

  const normalizeDevocional = (devocional: Devocional) => {
    // Funções helper para tratar casos com valores indefinidos
    const getTitle = (dev: Devocional) => dev.title || dev.titulo || "";
    const getVerse = (dev: Devocional) => dev.verse || dev.versiculo || "";
    const getDate = (dev: Devocional) => dev.date || dev.data || "";

    return {
      ...devocional,
      safeTitle: getTitle(devocional),
      safeVerse: getVerse(devocional),
      safeDate: getDate(devocional)
    };
  };

  const filteredDevocionais = data?.map(normalizeDevocional).filter(devocional => {
    // Verifica se a string existe antes de chamar toLowerCase()
    const titleMatch = devocional.safeTitle && 
      devocional.safeTitle.toLowerCase().includes(searchTerm.toLowerCase());
    
    const verseMatch = devocional.safeVerse && 
      devocional.safeVerse.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSearch = titleMatch || verseMatch;
    
    const matchesDate = selectedDate 
      ? devocional.safeDate === format(selectedDate, 'yyyy-MM-dd')
      : true;
    
    return matchesSearch && matchesDate;
  });

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedDate(undefined);
  };

  if (error) return <div className="text-red-500">Erro ao carregar devocionais</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-end">
        <div className="flex-grow">
          <label className="text-sm font-medium mb-1 block">Buscar por título ou versículo</label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar devocional..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block">Filtrar por data</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? (
                  format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
                ) : (
                  <span>Selecione uma data</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
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
          {filteredDevocionais?.length ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead>Versículo</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDevocionais.map((devocional) => (
                  <TableRow key={devocional.id}>
                    <TableCell>
                      {devocional.safeDate ? format(parseISO(devocional.safeDate), "dd/MM/yyyy") : "N/A"}
                    </TableCell>
                    <TableCell className="font-medium">{devocional.safeTitle}</TableCell>
                    <TableCell>{devocional.safeVerse}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Link to={`/admin/devocionais/editar/${devocional.id}`}>
                          <Edit2 className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(devocional.id)}
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
              <p className="text-gray-500">Nenhum devocional encontrado</p>
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

export default AdminDevocionalManager;
