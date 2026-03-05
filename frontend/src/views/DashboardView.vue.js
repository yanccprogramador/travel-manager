import { computed, inject, onMounted, ref } from 'vue';
import { fetchTravelRequests } from '../api';
import TravelRequestForm from '../components/TravelRequestForm.vue';
import TravelRequestTable from '../components/TravelRequestTable.vue';
const auth = inject('auth');
const filters = ref({
    status: '',
    destination: '',
    from_date: '',
    to_date: '',
});
const items = ref([]);
const loading = ref(false);
const feedback = ref({
    type: '',
    message: '',
});
const isAdmin = computed(() => auth?.user?.role === 'admin');
async function loadRequests() {
    loading.value = true;
    feedback.value = { type: '', message: '' };
    try {
        items.value = await fetchTravelRequests(filters.value);
    }
    catch (error) {
        feedback.value = {
            type: 'error',
            message: error.message || 'Não foi possível carregar os pedidos.',
        };
    }
    finally {
        loading.value = false;
    }
}
function handleFeedback(payload) {
    feedback.value = payload;
}
function clearFilters() {
    filters.value = {
        status: '',
        destination: '',
        from_date: '',
        to_date: '',
    };
    loadRequests();
}
onMounted(() => {
    loadRequests();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex flex-col gap-5" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "grid grid-cols-1 lg:grid-cols-[1.6fr_1.1fr] gap-5" },
});
/** @type {[typeof TravelRequestForm, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(TravelRequestForm, new TravelRequestForm({
    ...{ 'onCreated': {} },
}));
const __VLS_1 = __VLS_0({
    ...{ 'onCreated': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
let __VLS_3;
let __VLS_4;
let __VLS_5;
const __VLS_6 = {
    onCreated: (__VLS_ctx.loadRequests)
};
var __VLS_2;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "bg-white p-5 px-6 rounded-2xl shadow-[0_10px_25px_-10px_rgba(15,23,42,0.15)] border border-gray-200" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
    ...{ class: "m-0 mb-4 text-[1.1rem] font-semibold" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "grid grid-cols-1 sm:grid-cols-2 gap-3.5" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "flex flex-col gap-1 text-[0.85rem]" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "text-gray-600" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    value: (__VLS_ctx.filters.status),
    ...{ class: "px-3 py-2 border border-gray-300 rounded-lg text-[0.9rem] outline-none transition-all focus:border-blue-600 focus:ring-1 focus:ring-blue-600/20 bg-white" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "solicitado",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "aprovado",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "cancelado",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "flex flex-col gap-1 text-[0.85rem]" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "text-gray-600" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    value: (__VLS_ctx.filters.destination),
    type: "text",
    placeholder: "Pesquisar por destino",
    ...{ class: "px-3 py-2 border border-gray-300 rounded-lg text-[0.9rem] outline-none transition-all focus:border-blue-600 focus:ring-1 focus:ring-blue-600/20" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "flex flex-col gap-1 text-[0.85rem]" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "text-gray-600" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    type: "date",
    ...{ class: "px-3 py-2 border border-gray-300 rounded-lg text-[0.9rem] outline-none transition-all focus:border-blue-600 focus:ring-1 focus:ring-blue-600/20" },
});
(__VLS_ctx.filters.from_date);
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "flex flex-col gap-1 text-[0.85rem]" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "text-gray-600" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    type: "date",
    ...{ class: "px-3 py-2 border border-gray-300 rounded-lg text-[0.9rem] outline-none transition-all focus:border-blue-600 focus:ring-1 focus:ring-blue-600/20" },
});
(__VLS_ctx.filters.to_date);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mt-4 flex justify-end gap-2" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.clearFilters) },
    type: "button",
    ...{ class: "bg-white border text-gray-700 border-gray-300 hover:opacity-95 active:translate-y-px rounded-full px-4 py-[0.45rem] text-[0.85rem] font-medium transition-all" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.loadRequests) },
    type: "button",
    ...{ class: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-95 active:translate-y-px rounded-full px-4 py-[0.45rem] border-none text-[0.85rem] font-medium transition-all" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "flex flex-col gap-2" },
});
/** @type {[typeof TravelRequestTable, ]} */ ;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(TravelRequestTable, new TravelRequestTable({
    ...{ 'onRefresh': {} },
    ...{ 'onFeedback': {} },
    items: (__VLS_ctx.items),
    loading: (__VLS_ctx.loading),
    isAdmin: (__VLS_ctx.isAdmin),
}));
const __VLS_8 = __VLS_7({
    ...{ 'onRefresh': {} },
    ...{ 'onFeedback': {} },
    items: (__VLS_ctx.items),
    loading: (__VLS_ctx.loading),
    isAdmin: (__VLS_ctx.isAdmin),
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
let __VLS_10;
let __VLS_11;
let __VLS_12;
const __VLS_13 = {
    onRefresh: (__VLS_ctx.loadRequests)
};
const __VLS_14 = {
    onFeedback: (__VLS_ctx.handleFeedback)
};
var __VLS_9;
if (__VLS_ctx.feedback.message) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "text-[0.85rem]" },
        ...{ class: (__VLS_ctx.feedback.type === 'error' ? 'text-red-700' : 'text-green-700') },
    });
    (__VLS_ctx.feedback.message);
}
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-5']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:grid-cols-[1.6fr_1.1fr]']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-5']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['p-5']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-[0_10px_25px_-10px_rgba(15,23,42,0.15)]']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-200']} */ ;
/** @type {__VLS_StyleScopedClasses['m-0']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[1.1rem]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3.5']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[0.85rem]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[0.9rem]']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:border-blue-600']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-1']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-blue-600/20']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[0.85rem]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[0.9rem]']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:border-blue-600']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-1']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-blue-600/20']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[0.85rem]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[0.9rem]']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:border-blue-600']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-1']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-blue-600/20']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[0.85rem]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[0.9rem]']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:border-blue-600']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-1']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-blue-600/20']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:opacity-95']} */ ;
/** @type {__VLS_StyleScopedClasses['active:translate-y-px']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-[0.45rem]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[0.85rem]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-r']} */ ;
/** @type {__VLS_StyleScopedClasses['from-blue-600']} */ ;
/** @type {__VLS_StyleScopedClasses['to-indigo-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:opacity-95']} */ ;
/** @type {__VLS_StyleScopedClasses['active:translate-y-px']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-[0.45rem]']} */ ;
/** @type {__VLS_StyleScopedClasses['border-none']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[0.85rem]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[0.85rem]']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            TravelRequestForm: TravelRequestForm,
            TravelRequestTable: TravelRequestTable,
            filters: filters,
            items: items,
            loading: loading,
            feedback: feedback,
            isAdmin: isAdmin,
            loadRequests: loadRequests,
            handleFeedback: handleFeedback,
            clearFilters: clearFilters,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
