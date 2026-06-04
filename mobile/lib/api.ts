import axios from 'axios'

const API_BASE_URL =
  'https://sistema-monitoramento-4sts.onrender.com'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  (config) => {

    return config
  }
)

export const sensoresAPI = {

  listarPorUsuario: (
    usuarioId: number
  ) =>
    apiClient.get(
      `/sensores/${usuarioId}/lista`
    ),

  buscar: (id: number) =>
    apiClient.get(`/sensores/${id}`),

  criar: (dados: any) =>
    apiClient.post('/sensores', dados),

  atualizar: (
    id: number,
    dados: any
  ) =>
    apiClient.put(
      `/sensores/${id}`,
      dados
    ),

  deletar: (id: number) =>
    apiClient.delete(
      `/sensores/${id}`
    ),

}