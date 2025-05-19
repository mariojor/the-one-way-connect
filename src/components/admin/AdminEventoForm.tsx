
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Definição do schema de validação
const formSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  date: z.date({
    required_error: "Uma data é necessária",
  }),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Formato de hora inválido (HH:MM)"),
  location: z.string().min(3, "O local deve ter pelo menos 3 caracteres"),
  description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres"),
  imageUrl: z.string().default("/placeholder.svg"),
  registerLink: z.string().url("Link inválido. Deve ser uma URL completa (ex: https://exemplo.com)"),
});

type FormData = z.infer<typeof formSchema>;

interface AdminEventoFormProps {
  eventoId?: string;
  onSuccess?: () => void;
}

const AdminEventoForm = ({ eventoId, onSuccess }: AdminEventoFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const isEditing = !!eventoId;

  // Inicializa o formulário
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      time: "19:00",
      location: "",
      description: "",
      imageUrl: "/placeholder.svg",
      registerLink: "https://",
    },
  });

  // Busca dados do evento se estiver editando
  useState(() => {
    const fetchEvento = async () => {
      if (!eventoId) return;
      
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:3001/api/eventos/${eventoId}`);
        const data = await response.json();
        
        if (response.ok) {
          form.reset({
            title: data.title,
            time: data.time,
            location: data.location,
            description: data.description,
            imageUrl: data.imageUrl,
            registerLink: data.registerLink,
            date: new Date(data.date),
          });
        } else {
          toast.error("Erro ao carregar evento");
        }
      } catch (error) {
        console.error("Erro ao buscar evento:", error);
        toast.error("Não foi possível carregar os dados do evento");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvento();
  }, [eventoId, form]);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    
    // Prepara os dados para envio
    const formattedData = {
      ...data,
      date: format(data.date, 'yyyy-MM-dd'),
    };
    
    try {
      const url = isEditing 
        ? `http://localhost:3001/api/eventos/${eventoId}` 
        : "http://localhost:3001/api/eventos";
      
      const method = isEditing ? "PUT" : "POST";
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });
      
      if (response.ok) {
        toast.success(isEditing ? "Evento atualizado com sucesso!" : "Evento criado com sucesso!");
        
        if (onSuccess) {
          onSuccess();
        } else {
          navigate("/admin/dashboard");
        }
      } else {
        throw new Error("Falha na operação");
      }
    } catch (error) {
      console.error("Erro:", error);
      toast.error(isEditing ? "Erro ao atualizar evento" : "Erro ao criar evento");
    } finally {
      setIsLoading(false);
    }
  };

  const onCancel = () => {
    navigate("/admin/dashboard");
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input placeholder="Título do evento" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Data</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "dd/MM/yyyy")
                          ) : (
                            <span>Selecione uma data</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Horário</FormLabel>
                  <FormControl>
                    <Input placeholder="19:00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Local</FormLabel>
                  <FormControl>
                    <Input placeholder="Local do evento" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Descreva o evento" 
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL da Imagem</FormLabel>
                <FormControl>
                  <Input placeholder="URL da imagem" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="registerLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link de Inscrição</FormLabel>
                <FormControl>
                  <Input placeholder="https://exemplo.com/inscricao" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isEditing ? "Atualizando..." : "Salvando..."}
                </>
              ) : (
                isEditing ? "Atualizar" : "Salvar"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AdminEventoForm;
