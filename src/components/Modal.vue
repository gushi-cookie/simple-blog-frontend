<script setup lang="ts">
import { state, closeModal } from '../services/ModalService'
</script>

<template>
    <Teleport to="body">
        <div class="main-modal__backdrop" :class="{ 'main-modal__closed': !state.isOpen }" @click="closeModal">
            <div class="main-modal__container" @click.stop>
                <div class="main-modal__header">
                    <span class="main-modal__title">{{ state.title }}</span>
                    <div class="main-modal__btn-close" @click="closeModal()" v-shadow="2"></div>
                </div>
                <div class="main-modal__body">
                    <component :is="state.component" v-bind="state.props"/>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<style>
.main-modal__backdrop {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;

    background-color: rgba(0, 0, 0, 0.6);
}
.main-modal__closed {
    display: none;
}

.main-modal__container {
    max-width: 650px;
    height: auto;
    background-color: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
}

.main-modal__header {
    display: flex;
    align-items: center;
    color: rgba(0, 0, 0, 0.54);
    padding: 8px 16px;
    border-bottom: 1px solid #e0e0e0;
}
.main-modal__title {
    margin-right: auto;
}
.main-modal__btn-close {
    margin-left: auto;
    background-image: url('/icons/round-close.svg');
    background-size: contain;
    width: 20px;
    height: 20px;
    border-radius: 3px;
    cursor: pointer;
}
</style>