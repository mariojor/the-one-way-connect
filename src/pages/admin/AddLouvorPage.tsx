
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
import { toast } from "sonner";

const formSchema = z.object({
  titulo: z.string().min(2, "Título deve ter pelo menos 2 caracteres"),
  artista: z.string().min(2, "Artista deve ter pelo menos 2 caracteres"),
  album: z.string().min(2, "Álbum deve ter pelo menos 2 caracteres"),
  ano: z.string().min(4, "Ano deve ter 4 dígitos"),
  categoria: z.string().min(2, "Categoria é obrigatória"),
  letra: z.string().optional(),
  audio: z.string().optional(),
  videoUrl: z.string().url("URL do vídeo inválida").optional().or(z.literal("")),
  imageUrl: z.string().url("URL da imagem inválida").optional().or(z.literal("")),
});

type FormData = z.infer<typeof formSchema>;

const AddLouvorPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titulo: "",
      artista: "",
      album: "",
      ano: "",
      categoria: "Adoração",
      letra: "",
      audio: "",
      videoUrl: "",
      imageUrl: "",
    },
  });

  // Buscar dados se estiver editando
  useEffect(() => {
    if (isEditing) {
      fetch(`http://localhost:3001/api/louvor/${id}`)
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
          toast.error("Erro ao carregar dados do louvor");
          navigate("/admin/dashboard");
        });
    }
  }, [id, isEditing, navigate, form]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const url = isEditing
        ? `http://localhost:3001/api/louvor/${id}`
        : "http://localhost:3001/api/louvor";

      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Falha ao salvar");
      }

      toast.success(
        isEditing
          ? "Louvor atualizado com sucesso!"
          : "Louvor criado com sucesso!"
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
          {isEditing ? "Editar Louvor" : "Novo Louvor"}
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="titulo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Título da música" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="artista"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Artista/Ministério</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do artista ou ministério" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="album"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Álbum</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do álbum" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ano"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ano</FormLabel>
                  <FormControl>
                    <Input placeholder="Ano de lançamento" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoria"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <FormControl>
                    <Input placeholder="Adoração, Louvor, Hinos, etc" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="letra"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Letra (Opcional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Letra completa da música"
                      className="h-40"
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
              name="audio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL do Áudio (Opcional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://exemplo.com/audio.mp3"
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
              name="videoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL do Vídeo (YouTube, etc)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://youtube.com/watch?v=..."
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

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting
                ? "Salvando..."
                : isEditing
                ? "Atualizar Louvor"
                : "Criar Louvor"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddLouvorPage;
