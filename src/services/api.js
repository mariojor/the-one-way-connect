
/**
 * Cliente API para acessar o backend simulado
 * Este arquivo serve como uma camada de abstração para acessar a API REST
 * Pode ser facilmente adaptado para usar o Supabase no futuro
 */

const API_URL = 'http://localhost:3001/api';

// Cliente de API genérico
const apiClient = {
  // Método GET
  async get(endpoint) {
    try {
      const response = await fetch(`${API_URL}/${endpoint}`);
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao fazer requisição GET:', error);
      throw error;
    }
  },

  // Método POST
  async post(endpoint, data) {
    try {
      const response = await fetch(`${API_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro ao fazer requisição POST:', error);
      throw error;
    }
  },

  // Método PUT
  async put(endpoint, data) {
    try {
      const response = await fetch(`${API_URL}/${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro ao fazer requisição PUT:', error);
      throw error;
    }
  },

  // Método DELETE
  async delete(endpoint) {
    try {
      const response = await fetch(`${API_URL}/${endpoint}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro ao fazer requisição DELETE:', error);
      throw error;
    }
  },
};

// Serviços específicos baseados no cliente genérico
export const authService = {
  login: (email, password) => apiClient.post('users/login', { email, password }),
  getCurrentUser: () => {
    // Em um app real usaria o token armazenado
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  },
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
};

export const devocionalService = {
  getAll: () => apiClient.get('devocionais'),
  getById: (id) => apiClient.get(`devocionais/${id}`),
  getByDate: (date) => apiClient.get(`devocionais/data/${date}`),
  create: (devocional) => apiClient.post('devocionais', devocional),
  update: (id, devocional) => apiClient.put(`devocionais/${id}`, devocional),
  delete: (id) => apiClient.delete(`devocionais/${id}`)
};

export const artigoService = {
  getAll: () => apiClient.get('artigos'),
  getById: (id) => apiClient.get(`artigos/${id}`),
  getByTag: (tag) => apiClient.get(`artigos/tag/${tag}`),
  create: (artigo) => apiClient.post('artigos', artigo),
  update: (id, artigo) => apiClient.put(`artigos/${id}`, artigo),
  delete: (id) => apiClient.delete(`artigos/${id}`)
};

export const eventoService = {
  getAll: () => apiClient.get('eventos'),
  getById: (id) => apiClient.get(`eventos/${id}`),
  getFuturos: () => apiClient.get('eventos/futuros'),
  create: (evento) => apiClient.post('eventos', evento),
  update: (id, evento) => apiClient.put(`eventos/${id}`, evento),
  delete: (id) => apiClient.delete(`eventos/${id}`)
};

// Exporta todos os serviços para uso na aplicação
export default {
  auth: authService,
  devocional: devocionalService,
  artigo: artigoService,
  evento: eventoService,
  // Adicionar outros serviços conforme necessário
};

/**
 * COMENTÁRIO: Para migrar para o Supabase no futuro:
 * 
 * 1. Importe o cliente Supabase:
 *    import { createClient } from '@supabase/supabase-js';
 * 
 * 2. Inicialize o cliente:
 *    const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
 *    const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
 *    const supabase = createClient(supabaseUrl, supabaseKey);
 * 
 * 3. Substitua as implementações dos serviços para usar o cliente Supabase
 *    Ex: devocionalService.getAll = () => supabase.from('devocionais').select();
 */
