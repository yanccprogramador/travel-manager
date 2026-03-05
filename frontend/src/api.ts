export interface LoginResponseUser {
  id: number
  name: string
  email: string
  role: string
}

export interface LoginResponse {
  access_token: string
  token_type: string
  user: LoginResponseUser
}

export interface TravelRequestPayload {
  destination: string
  departure_date: string
  return_date: string
}

export interface TravelRequestFilters {
  status?: string
  destination?: string
  from_date?: string
  to_date?: string
}

export interface TravelRequest {
  id: number
  requester_id: number
  requester_name: string
  destination: string
  departure_date: string
  return_date: string
  status: string
}

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api'

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('access_token')

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  })

  const contentType = response.headers.get('Content-Type') ?? ''
  const hasJson = contentType.includes('application/json')
  const data = (hasJson ? await response.json() : null) as T | null

  if (!response.ok) {
    const message = (data && (data as any).message) || 'Ocorreu um erro na requisição.'
    throw new Error(message)
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return data!
}

export function login(email: string, password: string): Promise<LoginResponse> {
  return request<LoginResponse>('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

export function fetchTravelRequests(params: TravelRequestFilters = {}): Promise<TravelRequest[]> {
  const search = new URLSearchParams()

  if (params.status) search.set('status', params.status)
  if (params.destination) search.set('destination', params.destination)
  if (params.from_date) search.set('from_date', params.from_date)
  if (params.to_date) search.set('to_date', params.to_date)

  const query = search.toString() ? `?${search.toString()}` : ''
  return request<TravelRequest[]>(`/travel-requests${query}`)
}

export function createTravelRequest(payload: TravelRequestPayload): Promise<TravelRequest> {
  return request<TravelRequest>('/travel-requests', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function updateTravelRequestStatus(id: number, status: string): Promise<TravelRequest> {
  return request<TravelRequest>(`/travel-requests/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  })
}

export interface NotificationItem {
  id: string
  type: string
  notifiable_type: string
  notifiable_id: number
  data: {
    travel_request_id: number
    destination: string
    status: string
    message: string
  }
  read_at: string | null
  created_at: string
  updated_at: string
}

export function fetchNotifications(): Promise<NotificationItem[]> {
  return request<NotificationItem[]>('/notifications')
}

export function markNotificationAsRead(id: string): Promise<{ message: string }> {
  return request<{ message: string }>(`/notifications/${id}/read`, {
    method: 'PATCH',
  })
}

