
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
  author: z.string().min(2, "Autor deve ter pelo menos 2 caracteres"),
  type: z.enum(["video", "podcast", "outro"]),
  url: z.string().url("URL inválida"),
  imageUrl: z.string().url("URL da imagem inválida").optional().or(z.literal("")),
  duration: z.string().min(1, "Duração é obrigatória"),
});

type FormData = z.infer<typeof formSchema>;

const AddMidiaPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      author: "",
      type: "video",
      url: "",
      imageUrl: "",
      duration: "",
    },
  });

  // Buscar dados se estiver editando
  useEffect(() => {
    if (isEditing) {
      fetch(`http://localhost:3001/api/midia/${id}`)
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
          toast.error("Erro ao carregar dados da mídia");
          navigate("/admin/dashboard");
        });
    }
  }, [id, isEditing, navigate, form]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const url = isEditing
        ? `http://localhost:3001/api/midia/${id}`
        : "http://localhost:3001/api/midia";

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
          ? "Mídia atualizada com sucesso!"
          : "Mídia criada com sucesso!"
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
          {isEditing ? "Editar Mídia" : "Nova Mídia"}
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
                    <Input placeholder="Título da mídia" {...field} />
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
                  <FormLabel>Autor/Criador</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do autor ou criador" {...field} />
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
                      placeholder="Breve descrição da mídia"
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
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de mídia" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="video">Vídeo</SelectItem>
                      <SelectItem value="podcast">Podcast</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL do Conteúdo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://exemplo.com/video.mp4"
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
                  <FormLabel>URL da Thumbnail</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://exemplo.com/thumbnail.jpg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duração</FormLabel>
                  <FormControl>
                    <Input placeholder="5:30" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting
                ? "Salvando..."
                : isEditing
                ? "Atualizar Mídia"
                : "Criar Mídia"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddMidiaPage;
