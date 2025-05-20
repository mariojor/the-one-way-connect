
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Heart } from "lucide-react";
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
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(2, "Título deve ter pelo menos 2 caracteres"),
  author: z.string().min(2, "Autor deve ter pelo menos 2 caracteres"),
  description: z.string().min(10, "Descrição deve ter pelo menos 10 caracteres"),
  content: z.string().min(20, "Conteúdo deve ter pelo menos 20 caracteres"),
  imageUrl: z.string().url("URL da imagem inválida").optional().or(z.literal("")),
  category: z.string().min(2, "Categoria é obrigatória"),
});

type FormData = z.infer<typeof formSchema>;

const AddOracaoPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      description: "",
      content: "",
      imageUrl: "",
      category: "Oração",
    },
  });

  // Buscar dados se estiver editando
  useEffect(() => {
    if (isEditing) {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:3001/api/oracao/${id}`);
          if (!response.ok) throw new Error("Falha ao buscar dados");
          
          const data = await response.json();
          console.log("Dados carregados:", data);
          // Preenche o formulário com os dados existentes
          form.reset(data);
        } catch (error) {
          console.error("Erro:", error);
          toast.error("Erro ao carregar dados da oração");
        }
      };
      
      fetchData();
    }
  }, [id, isEditing, form]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const url = isEditing
        ? `http://localhost:3001/api/oracao/${id}`
        : "http://localhost:3001/api/oracao";

      const method = isEditing ? "PUT" : "POST";

      console.log("Enviando dados para:", url, "com método:", method);
      console.log("Dados enviados:", {...data, date: new Date().toISOString()});

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
        const errorData = await response.text();
        console.error("Resposta da API:", errorData);
        throw new Error("Falha ao salvar");
      }

      toast.success(
        isEditing
          ? "Oração atualizada com sucesso!"
          : "Oração criada com sucesso!"
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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container-custom py-4">
          <div className="flex items-center gap-4">
            <Heart className="h-8 w-8 text-one-way-blue" />
            <div>
              <h1 className="text-2xl font-bold">
                {isEditing ? "Editar Oração" : "Nova Oração"}
              </h1>
              <p className="text-gray-500 text-sm">
                {isEditing ? "Atualize os campos abaixo" : "Preencha os campos abaixo para adicionar uma nova oração"}
              </p>
            </div>
          </div>
        </div>
      </header>

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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input placeholder="Título da oração" {...field} />
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
                        placeholder="Breve descrição da oração"
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
                    <FormLabel>Conteúdo Completo</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Conteúdo completo da oração"
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
                        value={field.value || ""}
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
                      <Input placeholder="Categoria" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting
                  ? "Salvando..."
                  : isEditing
                  ? "Atualizar Oração"
                  : "Criar Oração"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddOracaoPage;
