
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Music, Play, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const LouvorPage = () => {
  const musicas = [
    {
      id: "1",
      titulo: "Grande é o Senhor",
      artista: "Adhemar de Campos",
      album: "Adoração",
      ano: "2010",
      categoria: "Adoração"
    },
    {
      id: "2",
      titulo: "Lugar Secreto",
      artista: "Gabriela Rocha",
      album: "Lugar Secreto",
      ano: "2018",
      categoria: "Contemporânea"
    },
    {
      id: "3",
      titulo: "Nada Além do Sangue",
      artista: "Fernandinho",
      album: "Galileu",
      ano: "2015",
      categoria: "Adoração"
    },
    {
      id: "4",
      titulo: "Águas Purificadoras",
      artista: "Ministério Zoe",
      album: "Águas",
      ano: "2020",
      categoria: "Adoração"
    },
    {
      id: "5",
      titulo: "A Ele a Glória",
      artista: "Diante do Trono",
      album: "Preciso de Ti",
      ano: "2001",
      categoria: "Congregacional"
    },
    {
      id: "6",
      titulo: "Eu Navegarei",
      artista: "Onésimo de Menezes",
      album: "Clássicos da Harpa",
      ano: "1995",
      categoria: "Hinos"
    },
  ];

  const playlists = [
    { id: "1", nome: "Adoração Intimista", quantidadeMusicas: 15 },
    { id: "2", nome: "Louvor Congregacional", quantidadeMusicas: 22 },
    { id: "3", nome: "Hinos Clássicos", quantidadeMusicas: 18 },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container-custom">
          <div className="mb-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-one-way-blue-light flex items-center justify-center">
                <Music className="h-8 w-8 text-one-way-blue" />
              </div>
            </div>
            <h1 className="text-4xl font-bold font-serif mb-4">Louvor</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Descubra músicas cristãs que elevam o espírito, letras inspiradoras e playlists edificantes para seu momento de adoração.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Músicas em Destaque</h2>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-one-way-blue-light text-one-way-blue">
                    <tr>
                      <th className="px-4 py-3 text-left">#</th>
                      <th className="px-4 py-3 text-left">Título</th>
                      <th className="px-4 py-3 text-left">Artista</th>
                      <th className="px-4 py-3 text-left">Álbum</th>
                      <th className="px-4 py-3 text-left">Categoria</th>
                      <th className="px-4 py-3 text-left">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {musicas.map((musica, index) => (
                      <tr key={musica.id} className="border-t hover:bg-gray-50">
                        <td className="px-4 py-3">{index + 1}</td>
                        <td className="px-4 py-3 font-medium">{musica.titulo}</td>
                        <td className="px-4 py-3">{musica.artista}</td>
                        <td className="px-4 py-3">{musica.album} ({musica.ano})</td>
                        <td className="px-4 py-3">
                          <Badge variant="outline" className="bg-one-way-blue-light/30 text-one-way-blue border-one-way-blue/20">
                            {musica.categoria}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Play className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Bookmark className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-6">Playlists Recomendadas</h2>
              <div className="space-y-4">
                {playlists.map((playlist) => (
                  <div key={playlist.id} className="bg-white p-6 rounded-lg shadow-md flex items-center">
                    <div className="bg-one-way-blue h-12 w-12 rounded-md flex items-center justify-center mr-4">
                      <Music className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-bold">{playlist.nome}</h3>
                      <p className="text-sm text-gray-600">{playlist.quantidadeMusicas} músicas</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LouvorPage;
