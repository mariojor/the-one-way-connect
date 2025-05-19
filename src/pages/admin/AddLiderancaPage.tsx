
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(2, "Título deve ter pelo menos 2 caracteres"),
  description: z.string().min(10, "Descrição deve ter pelo menos 10 caracteres"),
  content: z.string().min(20, "Conteúdo deve ter pelo menos 20 caracteres"),
  author: z.string().min(2, "Autor deve ter pelo menos 2 caracteres"),
  imageUrl: z.string().url("URL da imagem inválida").optional().or(z.literal("")),
  category: z.string().min(2, "Categoria é obrigatória"),
  type: z.enum(["artigo", "recurso", "treinamento", "devocional"]),
});

type FormData = z.infer<typeof formSchema>;

const AddLiderancaPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      author: "",
      imageUrl: "",
      category: "Liderança",
      type: "artigo",
    },
  });

  // Buscar dados se estiver editando
  useEffect(() => {
    if (isEditing) {
      fetch(`http://localhost:3001/api/lideranca/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Falha ao buscar dados");
          return res.json();
        })
        .then((data) => {
          // Preenche o formulário com os dados existentes
          form.reset(data);
        })
        .catch((error) => {
          console.error("Erro:", error);
          toast.error("Erro ao carregar dados");
          navigate("/admin/dashboard");
        });
    }
  }, [id, isEditing, navigate, form]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const url = isEditing
        ? `http://localhost:3001/api/lideranca/${id}`
        : "http://localhost:3001/api/lideranca";

      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          date: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Falha ao salvar");
      }

      toast.success(
        isEditing
          ? "Conteúdo para ministério atualizado com sucesso!"
          : "Conteúdo para ministério criado com sucesso!"
      );
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Erro:", error);
      toast.error("Erro ao salvar dados");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-custom py-8">
      <Button
        variant="outline"
        className="mb-6"
        onClick={() => navigate("/admin/dashboard")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar ao Dashboard
      </Button>

      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">
          {isEditing ? "Editar Conteúdo para Ministério" : "Novo Conteúdo para Ministério"}
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Título do conteúdo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Breve descrição do conteúdo"
                      className="h-20"
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
                      placeholder="Conteúdo completo"
                      className="h-40"
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
                    <Input
                      placeholder="https://exemplo.com/imagem.jpg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <FormControl>
                    <Input placeholder="Categoria do conteúdo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Conteúdo</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de conteúdo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="artigo">Artigo</SelectItem>
                      <SelectItem value="recurso">Recurso</SelectItem>
                      <SelectItem value="treinamento">Treinamento</SelectItem>
                      <SelectItem value="devocional">Devocional</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting
                ? "Salvando..."
                : isEditing
                ? "Atualizar Conteúdo"
                : "Criar Conteúdo"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddLiderancaPage;
