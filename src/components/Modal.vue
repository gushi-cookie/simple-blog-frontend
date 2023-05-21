<script setup lang="ts">
import { state, closeModal } from '../services/ModalService'
</script>

<template>
    <Teleport to="body">
        <div class="main-modal__backdrop" :class="{ 'main-modal__closed': !state.isOpen }">
            <div class="main-modal__container card">
                <div class="main-modal__header card-header">
                    <span class="main-modal__title">{{ state.title }}</span>
                    <button class="main-modal__btn-close btn-close" @click="closeModal()"></button>
                </div>
                <div class="main-modal__body card-body">
                    <component :is="state.component" />
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
}

.main-modal__header {
    display: flex;
    align-items: center;
}
.main-modal__title {
    margin-right: auto;
}
.main-modal__btn-close {
    margin-left: auto;
}


@media (max-width: 500px) {
.main-modal__container {
    max-width: none;
    width: 95%;
    height: 90% !important;
}
.main-modal__body {
    display: flex;
    flex-direction: column;
    overflow: hidden;
}
}
</style>