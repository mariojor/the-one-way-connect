
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Lock } from "lucide-react";
import { users } from "../mockBackend/mockData";

const formSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type FormData = z.infer<typeof formSchema>;

const AdminLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      // Usando diretamente os dados do mock em vez de fazer uma requisição fetch
      const user = users.find(u => u.email === data.email && u.password === data.password);
      
      if (!user) {
        throw new Error("Credenciais inválidas");
      }

      // Remover a senha antes de armazenar o usuário
      const { password, ...userWithoutPassword } = user;
      
      // Armazena o token e informações do usuário (simulando autenticação)
      const mockToken = `mock-token-${user.id}-${Date.now()}`;
      localStorage.setItem("adminToken", mockToken);
      localStorage.setItem("adminUser", JSON.stringify(userWithoutPassword));
      
      toast.success("Login realizado com sucesso");
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Erro de login:", error);
      toast.error("Credenciais inválidas");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="h-16 w-16 rounded-full bg-one-way-blue-light flex items-center justify-center mb-4">
            <Lock className="h-8 w-8 text-one-way-blue" />
          </div>
          <h1 className="text-2xl font-bold">Login Administrativo</h1>
          <p className="text-gray-500 text-sm mt-2">
            Acesse o painel para gerenciar o conteúdo do site
          </p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="admin@oneway.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="******"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full bg-one-way-blue hover:bg-one-way-blue/90"
              disabled={isLoading}
            >
              {isLoading ? "Autenticando..." : "Entrar"}
            </Button>
          </form>
        </Form>
        
        <div className="mt-6 border-t pt-4">
          <p className="text-xs text-center text-gray-500">
            Para fins de teste, use:<br />
            E-mail: admin@oneway.com<br />
            Senha: admin123
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
