import { defineAsyncComponent, shallowReactive, type Component } from 'vue'


export interface ModalState {
    component: Component | null,
    title: string,
    isOpen: boolean,
    props: object,
}

export const state = shallowReactive<ModalState>({
    component: null, 
    title: '',
    isOpen: false,
    props: {},
});

/**
 * Open modal with a specific component inside.
 * @param title Modal title.
 * @param componentName Name of a component file.
 */
export function openModal(title: string, componentName: string, props?: object) {
    state.component = defineAsyncComponent(() => import(`@/components/${componentName}.vue`));
    state.title = title;
    state.isOpen = true;
    if(props) state.props = props;
};

/**
 * Clear modal state.
 */
export function closeModal() {
    state.isOpen = false;
    state.component = null;
    state.title = '';
    state.props = {};
}