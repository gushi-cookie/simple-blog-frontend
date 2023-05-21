<script setup lang="ts">
import * as AuthService from '@/services/AuthService';
import * as ModalService from '@/services/ModalService';
import { ref } from 'vue';

const nickname = ref<string>('');
const password = ref<string>('');

const snackbarOpen = ref(false);
const snackbarMessage = ref('');

function showSnackbar(message: string) {
    snackbarMessage.value = message;
    snackbarOpen.value = true;
}

async function onSubmit() {
    try {
        await AuthService.registerUser(nickname.value, password.value);
        ModalService.closeModal();
    } catch(error) {
        showSnackbar('Error occurred. Please try again.');
        console.log(error);
    }
};
</script>

<template>
<ui-snackbar
    :message="snackbarMessage"
    v-model="snackbarOpen"
    action-button-text="close"
    position="top"
></ui-snackbar>

<form class="register-form" @submit.prevent="onSubmit">
    <ui-textfield class="register-form__input" max-length="20" v-model="nickname" required>
        Username
    </ui-textfield>
    
    <ui-textfield class="register-form__input" max-length="20" v-model="password" input-type="password" required>
        Password
    </ui-textfield>

    <ui-button class="register-form__button" outlined native-type="submit">Register</ui-button>
</form>
</template>

<style>
.register-form {
    display: flex;
    flex-flow: row wrap;

    background-color: #fff;
    padding: 24px 24px;
    width: 500px;
}

.register-form > * {
    flex: 0 0 auto;
}

.register-form__input {
    width: 100%;
    margin-bottom: 24px;
}

.register-form__button {
    margin-left: auto;
}
</style>