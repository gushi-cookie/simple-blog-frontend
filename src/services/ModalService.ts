import { defineAsyncComponent, shallowReactive, type Component } from 'vue'


export interface ModalState {
    component: Component | null,
    title: string,
    isOpen: boolean,
}

export const state = shallowReactive<ModalState>({
    component: null, 
    title: '',
    isOpen: false,
});

/**
 * Open modal with a specific component inside.
 * @param title Modal title.
 * @param componentName Name of a component file.
 */
export function openModal(title: string, componentName: string) {
    state.component = defineAsyncComponent(() => import(`@/components/${componentName}.vue`));
    state.title = title;
    state.isOpen = true;
};

/**
 * Clear modal state.
 */
export function closeModal() {
    state.isOpen = false;
    state.component = null;
    state.title = '';
}