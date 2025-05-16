
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Seu email foi cadastrado com sucesso!");
      setEmail("");
    } else {
      toast.error("Por favor, insira um email válido.");
    }
  };
  
  return (
    <section className="bg-one-way-blue py-16">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold font-serif text-white mb-4">
            Receba Inspiração Diária
          </h2>
          <p className="text-white/80 mb-8">
            Cadastre-se para receber estudos bíblicos, devocionais e conteúdo exclusivo 
            diretamente em seu email.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Seu melhor email"
              className="bg-white/10 text-white border-white/20 placeholder:text-white/60 focus:border-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit" className="bg-white text-one-way-blue hover:bg-white/90">
              Inscrever-se
            </Button>
          </form>
          
          <p className="text-white/60 text-sm mt-4">
            Fique tranquilo, não enviamos spam. Você pode cancelar a qualquer momento.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
