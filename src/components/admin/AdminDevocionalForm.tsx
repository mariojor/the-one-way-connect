
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
import { ptBR } from "date-fns/locale";
import { CalendarIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Definição do schema de validação
const formSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  verse: z.string().min(3, "O versículo deve ter pelo menos 3 caracteres"),
  verseText: z.string().min(3, "O texto do versículo deve ter pelo menos 3 caracteres"),
  content: z.string().min(10, "O conteúdo deve ter pelo menos 10 caracteres"),
  prayer: z.string().min(10, "A oração deve ter pelo menos 10 caracteres"),
  application: z.string().min(10, "A aplicação deve ter pelo menos 10 caracteres"),
  date: z.date({
    required_error: "Uma data é necessária",
  }),
});

type FormData = z.infer<typeof formSchema>;

interface AdminDevocionalFormProps {
  devocionalId?: string;
  onSuccess?: () => void;
}

const AdminDevocionalForm = ({ devocionalId, onSuccess }: AdminDevocionalFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const isEditing = !!devocionalId;

  // Inicializa o formulário
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      verse: "",
      verseText: "",
      content: "",
      prayer: "",
      application: "",
    },
  });

  // Busca dados do devocional se estiver editando
  useState(() => {
    const fetchDevocional = async () => {
      if (!devocionalId) return;
      
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:3001/api/devocionais/${devocionalId}`);
        const data = await response.json();
        
        if (response.ok) {
          form.reset({
            title: data.title,
            verse: data.verse,
            verseText: data.verseText,
            content: data.content,
            prayer: data.prayer,
            application: data.application,
            date: new Date(data.date),
          });
        } else {
          toast.error("Erro ao carregar devocional");
        }
      } catch (error) {
        console.error("Erro ao buscar devocional:", error);
        toast.error("Não foi possível carregar os dados do devocional");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDevocional();
  }, [devocionalId, form]);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    
    // Prepara os dados para envio
    const formattedData = {
      ...data,
      date: format(data.date, 'yyyy-MM-dd'),
      authorId: JSON.parse(localStorage.getItem("adminUser") || '{"id":"1"}').id,
    };
    
    try {
      const url = isEditing 
        ? `http://localhost:3001/api/devocionais/${devocionalId}` 
        : "http://localhost:3001/api/devocionais";
      
      const method = isEditing ? "PUT" : "POST";
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });
      
      if (response.ok) {
        toast.success(isEditing ? "Devocional atualizado com sucesso!" : "Devocional criado com sucesso!");
        
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
      toast.error(isEditing ? "Erro ao atualizar devocional" : "Erro ao criar devocional");
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
                  <Input placeholder="Título do devocional" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="verse"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Referência do Versículo</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: João 3:16" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
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
                            format(field.value, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
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
          </div>

          <FormField
            control={form.control}
            name="verseText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Texto do Versículo</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Digite o texto do versículo" 
                    className="min-h-[80px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Conteúdo</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Digite o conteúdo do devocional" 
                    className="min-h-[150px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="prayer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Oração</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Digite a oração" 
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
            name="application"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Aplicação</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Digite a aplicação prática" 
                    className="min-h-[100px]" 
                    {...field} 
                  />
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

export default AdminDevocionalForm;
