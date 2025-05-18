
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
  MapPin,
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// Tipo para Evento
interface Evento {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageUrl: string;
  registerLink: string;
}

const AdminEventoManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  
  const fetchEventos = async () => {
    const response = await fetch('http://localhost:3001/api/eventos');
    if (!response.ok) throw new Error('Erro ao buscar eventos');
    return response.json() as Promise<Evento[]>;
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['eventos'],
    queryFn: fetchEventos,
  });

  const handleEdit = (id: string) => {
    // Implementação futura para edição de evento
    toast.info(`Editando evento ID: ${id}`);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este evento?")) return;
    
    try {
      const response = await fetch(`http://localhost:3001/api/eventos/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error("Falha ao excluir evento");
      
      toast.success("Evento excluído com sucesso");
      refetch();
    } catch (error) {
      console.error("Erro ao excluir:", error);
      toast.error("Erro ao excluir evento");
    }
  };

  const filteredEventos = data?.filter(evento => {
    const matchesSearch = 
      evento.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      evento.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = filterLocation
      ? evento.location.toLowerCase().includes(filterLocation.toLowerCase())
      : true;
    
    return matchesSearch && matchesLocation;
  });

  // Extrair todos os locais únicos dos eventos
  const allLocations = [...new Set(data?.map(evento => evento.location) || [])];

  const resetFilters = () => {
    setSearchTerm("");
    setFilterLocation("");
  };

  if (error) return <div className="text-red-500">Erro ao carregar eventos</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-end">
        <div className="flex-grow">
          <label className="text-sm font-medium mb-1 block">Buscar por título ou descrição</label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar evento..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block">Filtrar por local</label>
          <div className="relative">
            <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <select
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
              className="w-full pl-8 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">Todos os locais</option>
              {allLocations.map(location => (
                <option key={location} value={location}>{location}</option>
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
          {filteredEventos?.length ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Horário</TableHead>
                  <TableHead>Local</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEventos.map((evento) => (
                  <TableRow key={evento.id}>
                    <TableCell className="font-medium">{evento.title}</TableCell>
                    <TableCell>
                      {format(parseISO(evento.date), "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell>{evento.time}</TableCell>
                    <TableCell>{evento.location}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(evento.id)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(evento.id)}
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
              <p className="text-gray-500">Nenhum evento encontrado</p>
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

export default AdminEventoManager;
