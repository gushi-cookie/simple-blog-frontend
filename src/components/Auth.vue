<script setup lang="ts">
import { isSignedIn, data, logoutUser } from '@/services/AuthService';
import * as ModalService from '@/services/ModalService';

</script>

<template>
<div class="auth">
    <div class="auth__cont" v-if="isSignedIn">
        <div class="auth__nickname">{{ data.nickname }}</div>
        <ui-button raised @click="logoutUser">Log out</ui-button>
    </div> 

    <div class="auth__cont" v-if="!isSignedIn">
        <ui-button raised @click="ModalService.openModal('Login', 'LoginForm')">Login</ui-button>
        <ui-button raised @click="ModalService.openModal('Register a new user', 'RegisterForm')">Register</ui-button>
    </div>
</div>
</template>

<style>
.auth {

}

.auth__cont {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
}

.auth__nickname {
    font-size: 1.2em;
}

.auth__cont > :first-child {
    margin-right: 24px;
}
</style>