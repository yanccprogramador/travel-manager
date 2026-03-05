import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import DashboardView from '../views/DashboardView.vue';
import * as api from '../api';
vi.mock('../api', () => ({
    fetchTravelRequests: vi.fn()
}));
// Stub out child components to isolate DashboardView testing
const TravelRequestFormStub = { template: '<div class="travel-request-form-stub"></div>' };
const TravelRequestTableStub = {
    template: '<div class="travel-request-table-stub"></div>',
    props: ['items', 'loading', 'isAdmin']
};
describe('DashboardView.vue', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(api.fetchTravelRequests).mockResolvedValue([]);
    });
    it('renders filters correctly', () => {
        const wrapper = mount(DashboardView, {
            global: {
                provide: {
                    auth: { token: 'token', user: { role: 'user' } }
                },
                stubs: {
                    TravelRequestForm: TravelRequestFormStub,
                    TravelRequestTable: TravelRequestTableStub
                }
            }
        });
        expect(wrapper.find('.filters').exists()).toBe(true);
        expect(wrapper.find('h2').text()).toBe('Filtros');
        expect(wrapper.find('select').exists()).toBe(true);
    });
    it('loads travel requests on mount', async () => {
        const mockData = [
            { id: 1, destination: 'Paris', status: 'solicitado' }
        ];
        vi.mocked(api.fetchTravelRequests).mockResolvedValue(mockData);
        const wrapper = mount(DashboardView, {
            global: {
                provide: {
                    auth: { token: 'token', user: { role: 'admin' } }
                },
                stubs: {
                    TravelRequestForm: TravelRequestFormStub,
                    TravelRequestTable: TravelRequestTableStub
                }
            }
        });
        await flushPromises();
        expect(api.fetchTravelRequests).toHaveBeenCalled();
        // Should pass the data to the child table component
        const table = wrapper.findComponent(TravelRequestTableStub);
        expect(table.exists()).toBe(true);
        expect(table.props('items')).toEqual(mockData);
    });
    it('calls fetchTravelRequests when clearFilters is triggered', async () => {
        const wrapper = mount(DashboardView, {
            global: {
                provide: {
                    auth: { token: 'token', user: { role: 'user' } }
                },
                stubs: {
                    TravelRequestForm: TravelRequestFormStub,
                    TravelRequestTable: TravelRequestTableStub
                }
            }
        });
        vi.clearAllMocks();
        const clearBtn = wrapper.findAll('.btn-secondary').find(b => b.text() === 'Limpar');
        await clearBtn?.trigger('click');
        await flushPromises();
        expect(api.fetchTravelRequests).toHaveBeenCalledWith({
            status: '',
            destination: '',
            from_date: '',
            to_date: '',
        });
    });
});
