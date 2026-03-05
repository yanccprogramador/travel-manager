import { onMounted, onUnmounted, ref } from 'vue';
import { fetchNotifications, markNotificationAsRead } from '../api';
const notifications = ref([]);
const loading = ref(false);
const showDropdown = ref(false);
const unreadCount = ref(0);
let intervalId = null;
async function loadNotifications() {
    if (loading.value)
        return;
    loading.value = true;
    try {
        const data = await fetchNotifications();
        notifications.value = data;
        unreadCount.value = data.filter((n) => !n.read_at).length;
    }
    catch (error) {
        console.error('Failed to load notifications:', error);
    }
    finally {
        loading.value = false;
    }
}
function toggleDropdown() {
    showDropdown.value = !showDropdown.value;
    if (showDropdown.value) {
        loadNotifications();
    }
}
async function handleMarkAsRead(notif) {
    if (notif.read_at)
        return;
    try {
        await markNotificationAsRead(notif.id);
        notif.read_at = new Date().toISOString();
        unreadCount.value = Math.max(0, unreadCount.value - 1);
    }
    catch (error) {
        console.error('Failed to mark notification as read:', error);
    }
}
onMounted(() => {
    loadNotifications();
    intervalId = setInterval(loadNotifications, 30000);
});
onUnmounted(() => {
    if (intervalId)
        clearInterval(intervalId);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "relative inline-block" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.toggleDropdown) },
    ...{ class: "bg-transparent border-none cursor-pointer p-2 flex items-center justify-center rounded-full transition-colors duration-200 text-gray-600 hover:bg-gray-100 hover:text-gray-900 relative" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    'stroke-width': "1.5",
    stroke: "currentColor",
    ...{ class: "w-6 h-6" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.path)({
    'stroke-linecap': "round",
    'stroke-linejoin': "round",
    d: "M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0",
});
if (__VLS_ctx.unreadCount > 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "absolute top-0 right-0 bg-red-500 text-white text-[0.65rem] font-bold py-[0.15rem] px-[0.35rem] rounded-full transform translate-x-[15%] translate-y-[-15%] border-2 border-white" },
    });
    (__VLS_ctx.unreadCount);
}
if (__VLS_ctx.showDropdown) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "absolute top-full right-0 mt-2 w-[320px] bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden max-h-[400px] flex flex-col" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "p-3 px-4 border-b border-gray-200 bg-gray-50" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: "m-0 text-[0.95rem] font-semibold text-gray-900" },
    });
    if (__VLS_ctx.loading && __VLS_ctx.notifications.length === 0) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "p-4 text-[0.85rem] text-gray-500 text-center py-8" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "inline-block w-4 h-4 border-2 border-gray-100 border-l-blue-600 rounded-full animate-spin align-middle mr-2" },
        });
    }
    else if (__VLS_ctx.notifications.length === 0) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "p-4 text-[0.85rem] text-gray-500 text-center py-8" },
        });
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
            ...{ class: "list-none m-0 p-0 overflow-y-auto" },
        });
        for (const [notif] of __VLS_getVForSourceType((__VLS_ctx.notifications))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
                ...{ onClick: (...[$event]) => {
                        if (!(__VLS_ctx.showDropdown))
                            return;
                        if (!!(__VLS_ctx.loading && __VLS_ctx.notifications.length === 0))
                            return;
                        if (!!(__VLS_ctx.notifications.length === 0))
                            return;
                        __VLS_ctx.handleMarkAsRead(notif);
                    } },
                key: (notif.id),
                ...{ class: "p-3 px-4 border-b border-gray-50 cursor-pointer transition-colors duration-150 hover:bg-gray-50" },
                ...{ class: (notif.read_at ? '' : 'bg-blue-50 hover:bg-blue-100') },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
                ...{ class: "m-0 mb-1 text-[0.85rem] text-gray-700 leading-[1.3]" },
            });
            (notif.data.message);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.small, __VLS_intrinsicElements.small)({
                ...{ class: "text-[0.75rem] text-gray-400" },
            });
            (new Date(notif.created_at).toLocaleString('pt-BR'));
        }
    }
}
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-block']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-transparent']} */ ;
/** @type {__VLS_StyleScopedClasses['border-none']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gray-100']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-gray-900']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['w-6']} */ ;
/** @type {__VLS_StyleScopedClasses['h-6']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['top-0']} */ ;
/** @type {__VLS_StyleScopedClasses['right-0']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-red-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[0.65rem]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['py-[0.15rem]']} */ ;
/** @type {__VLS_StyleScopedClasses['px-[0.35rem]']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['transform']} */ ;
/** @type {__VLS_StyleScopedClasses['translate-x-[15%]']} */ ;
/** @type {__VLS_StyleScopedClasses['translate-y-[-15%]']} */ ;
/** @type {__VLS_StyleScopedClasses['border-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-white']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['top-full']} */ ;
/** @type {__VLS_StyleScopedClasses['right-0']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['w-[320px]']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-200']} */ ;
/** @type {__VLS_StyleScopedClasses['z-50']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['max-h-[400px]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-200']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-50']} */ ;
/** @type {__VLS_StyleScopedClasses['m-0']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[0.95rem]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-900']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[0.85rem]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['py-8']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-block']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['border-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-100']} */ ;
/** @type {__VLS_StyleScopedClasses['border-l-blue-600']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-spin']} */ ;
/** @type {__VLS_StyleScopedClasses['align-middle']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[0.85rem]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['py-8']} */ ;
/** @type {__VLS_StyleScopedClasses['list-none']} */ ;
/** @type {__VLS_StyleScopedClasses['m-0']} */ ;
/** @type {__VLS_StyleScopedClasses['p-0']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-50']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-150']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gray-50']} */ ;
/** @type {__VLS_StyleScopedClasses['m-0']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[0.85rem]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-[1.3]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[0.75rem]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-400']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            notifications: notifications,
            loading: loading,
            showDropdown: showDropdown,
            unreadCount: unreadCount,
            toggleDropdown: toggleDropdown,
            handleMarkAsRead: handleMarkAsRead,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
