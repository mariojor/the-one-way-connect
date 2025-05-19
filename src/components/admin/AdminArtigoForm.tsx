
import { useState, useEffect } from "react";
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
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

// Definição do schema de validação
const formSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  author: z.string().min(3, "O nome do autor deve ter pelo menos 3 caracteres"),
  summary: z.string().min(10, "O resumo deve ter pelo menos 10 caracteres"),
  content: z.string().min(20, "O conteúdo deve ter pelo menos 20 caracteres"),
  date: z.date({
    required_error: "Uma data é necessária",
  }),
  imageUrl: z.string().default("/placeholder.svg"),
  tags: z.array(z.string()).default([]),
});

type FormData = z.infer<typeof formSchema>;

interface AdminArtigoFormProps {
  artigoId?: string;
  onSuccess?: () => void;
}

const AdminArtigoForm = ({ artigoId, onSuccess }: AdminArtigoFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [newTag, setNewTag] = useState("");
  const navigate = useNavigate();
  const isEditing = !!artigoId;

  // Inicializa o formulário
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      summary: "",
      content: "",
      imageUrl: "/placeholder.svg",
      tags: [],
    },
  });

  // Busca dados do artigo se estiver editando
  useEffect(() => {
    const fetchArtigo = async () => {
      if (!artigoId) return;
      
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:3001/api/artigos/${artigoId}`);
        const data = await response.json();
        
        if (response.ok) {
          form.reset({
            title: data.title,
            author: data.author,
            summary: data.summary,
            content: data.content,
            imageUrl: data.imageUrl,
            tags: data.tags,
            date: new Date(data.date),
          });
        } else {
          toast.error("Erro ao carregar artigo");
        }
      } catch (error) {
        console.error("Erro ao buscar artigo:", error);
        toast.error("Não foi possível carregar os dados do artigo");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtigo();
  }, [artigoId, form]);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    
    // Prepara os dados para envio
    const formattedData = {
      ...data,
      date: format(data.date, 'yyyy-MM-dd'),
    };
    
    try {
      const url = isEditing 
        ? `http://localhost:3001/api/artigos/${artigoId}` 
        : "http://localhost:3001/api/artigos";
      
      const method = isEditing ? "PUT" : "POST";
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });
      
      if (response.ok) {
        toast.success(isEditing ? "Artigo atualizado com sucesso!" : "Artigo criado com sucesso!");
        
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
      toast.error(isEditing ? "Erro ao atualizar artigo" : "Erro ao criar artigo");
    } finally {
      setIsLoading(false);
    }
  };

  const onCancel = () => {
    navigate("/admin/dashboard");
  };

  // Manipulação de tags
  const addTag = () => {
    if (!newTag.trim()) return;
    const currentTags = form.getValues("tags");
    if (!currentTags.includes(newTag.trim())) {
      form.setValue("tags", [...currentTags, newTag.trim()]);
    }
    setNewTag("");
  };

  const removeTag = (tagToRemove: string) => {
    const currentTags = form.getValues("tags");
    form.setValue("tags", currentTags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
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
                  <Input placeholder="Título do artigo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Autor</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do autor" {...field} />
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
          </div>

          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resumo</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Resumo do artigo" 
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
                    placeholder="Conteúdo do artigo" 
                    className="min-h-[200px]" 
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
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <div className="flex flex-col space-y-2">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {field.value.map((tag) => (
                      <Badge key={tag} variant="secondary" className="p-1.5 pl-3">
                        {tag}
                        <button 
                          type="button" 
                          onClick={() => removeTag(tag)} 
                          className="ml-2 text-gray-400 hover:text-gray-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Input 
                      placeholder="Adicionar tag"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                    <Button 
                      type="button" 
                      onClick={addTag}
                      variant="outline"
                      size="sm"
                    >
                      Adicionar
                    </Button>
                  </div>
                </div>
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

export default AdminArtigoForm;
