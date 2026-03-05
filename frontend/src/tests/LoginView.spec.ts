import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useRouter } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import * as api from '../api'

// Mock dependencies
vi.mock('vue-router', () => ({
    useRouter: vi.fn()
}))

vi.mock('../api', () => ({
    login: vi.fn()
}))

describe('LoginView.vue', () => {
    const mockRouterPush = vi.fn()
    const mockSetItem = vi.fn()

    beforeEach(() => {
        vi.clearAllMocks()
        vi.mocked(useRouter).mockReturnValue({ push: mockRouterPush } as any)
        Object.defineProperty(window, 'localStorage', {
            value: {
                setItem: mockSetItem,
                getItem: vi.fn(),
                clear: vi.fn()
            },
            writable: true
        })
    })

    it('renders correctly', () => {
        const wrapper = mount(LoginView, {
            global: {
                provide: {
                    auth: { token: null, user: null }
                }
            }
        })

        expect(wrapper.find('h1').text()).toBe('Login')
        expect(wrapper.find('input[type="email"]').exists()).toBe(true)
        expect(wrapper.find('input[type="password"]').exists()).toBe(true)
        expect(wrapper.find('button.btn-primary').text()).toBe('Entrar')
    })

    it('calls login API on form submit and redirects on success', async () => {
        const mockAuthContext = { token: null, user: null } as any
        vi.mocked(api.login).mockResolvedValue({
            access_token: 'fake-token',
            user: { id: 1, name: 'Admin', email: 'admin@test.com', role: 'admin' }
        } as any)

        const wrapper = mount(LoginView, {
            global: {
                provide: {
                    auth: mockAuthContext
                }
            }
        })

        await wrapper.find('input[type="email"]').setValue('admin@test.com')
        await wrapper.find('input[type="password"]').setValue('password')
        await wrapper.find('form').trigger('submit')

        await flushPromises()

        expect(api.login).toHaveBeenCalledWith('admin@test.com', 'password')
        expect(mockSetItem).toHaveBeenCalledWith('access_token', 'fake-token')
        expect(mockRouterPush).toHaveBeenCalledWith({ name: 'dashboard' })
    })

    it('shows error message when login API fails', async () => {
        vi.mocked(api.login).mockRejectedValue(new Error('Invalid credentials'))

        const wrapper = mount(LoginView, {
            global: {
                provide: {
                    auth: { token: null, user: null }
                }
            }
        })

        await wrapper.find('input[type="email"]').setValue('user@test.com')
        await wrapper.find('input[type="password"]').setValue('wrong-password')
        await wrapper.find('form').trigger('submit')

        await flushPromises()

        const errorMsg = wrapper.find('.feedback.error')
        expect(errorMsg.exists()).toBe(true)
        expect(errorMsg.text()).toBe('Invalid credentials')
        expect(mockRouterPush).not.toHaveBeenCalled()
    })
})
