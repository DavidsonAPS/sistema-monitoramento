import axios from 'axios'

const API_BASE_URL = 'http://192.168.0.191:3000' // Muda depois pra IP real ou nuvem

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const sensoresAPI = {
  listar: () => apiClient.get('/sensores'),
  buscar: (id: number) => apiClient.get(`/sensores/${id}`),
  criar: (dados: any) => apiClient.post('/sensores', dados),
  atualizar: (id: number, dados: any) => apiClient.put(`/sensores/${id}`, dados),
  deletar: (id: number) => apiClient.delete(`/sensores/${id}`),
}
