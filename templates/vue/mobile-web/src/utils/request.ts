import type { AxiosError, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import { showNotify } from 'vant'
import { localStorage } from '@/utils/local-storage'
import { STORAGE_TOKEN_KEY } from '@/stores/mutation-type'

export const REQUEST_TOKEN_KEY = 'Authorization'

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  timeout: 6000,
})

export type RequestError = AxiosError<{
  message?: string
  result?: any
  errorMessage?: string
}>

function errorHandler(error: RequestError): Promise<any> {
  if (error.response) {
    const { data = {}, status, statusText } = error.response
    if (status === 403) {
      showNotify({
        type: 'danger',
        message: (data && data.message) || statusText,
      })
    }
    if (status === 401 && data.result && data.result.isLogin) {
      showNotify({
        type: 'danger',
        message: 'Authorization verification failed',
      })
      // location.replace(loginRoutePath)
    }
  }
  return Promise.reject(error)
}

function requestHandler(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> {
  const savedToken = localStorage.get(STORAGE_TOKEN_KEY)
  if (savedToken)
    config.headers[REQUEST_TOKEN_KEY] = savedToken

  return config
}

request.interceptors.request.use(requestHandler, errorHandler)

function responseHandler(response: { data: any }) {
  return response.data
}

request.interceptors.response.use(responseHandler, errorHandler)

export default request
