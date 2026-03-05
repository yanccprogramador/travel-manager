import router from './router';
const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';
async function request(path, options = {}) {
    const token = localStorage.getItem('access_token');
    const headers = {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
    };
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    const response = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers,
    });
    const contentType = response.headers.get('Content-Type') ?? '';
    const hasJson = contentType.includes('application/json');
    const data = (hasJson ? await response.json() : null);
    if (!response.ok) {
        if (response.status === 401) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('user');
            if (router.currentRoute.value.name !== 'login') {
                router.push('/login');
            }
        }
        const message = (data && data.message) || 'Ocorreu um erro na requisição.';
        throw new Error(message);
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return data;
}
export function login(email, password) {
    return request('/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });
}
export function fetchTravelRequests(params = {}) {
    const search = new URLSearchParams();
    if (params.status)
        search.set('status', params.status);
    if (params.destination)
        search.set('destination', params.destination);
    if (params.from_date)
        search.set('from_date', params.from_date);
    if (params.to_date)
        search.set('to_date', params.to_date);
    const query = search.toString() ? `?${search.toString()}` : '';
    return request(`/travel-requests${query}`);
}
export function createTravelRequest(payload) {
    return request('/travel-requests', {
        method: 'POST',
        body: JSON.stringify(payload),
    });
}
export function updateTravelRequestStatus(id, status) {
    return request(`/travel-requests/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
    });
}
export function fetchNotifications() {
    return request('/notifications');
}
export function markNotificationAsRead(id) {
    return request(`/notifications/${id}/read`, {
        method: 'PATCH',
    });
}
