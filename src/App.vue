<script setup lang="ts">
import Auth from './components/Auth.vue';
import Modal from './components/Modal.vue';
import PostsList from './components/PostsList.vue';
import * as ModalService from './services/ModalService';
import { isSignedIn } from './services/AuthService';
</script>

<template>
  <header class="header" v-shadow="3">
    <div class="header__logo">
      <a class="header__logo-link" href="/">Simple Blog</a>
    </div>
    <ui-button 
      v-if="isSignedIn"
      @click="ModalService.openModal('Create post', 'PostForm')"
      raised
      class="header__post-btn"
    >create post</ui-button>
    <auth/>
  </header>

  <main>
    <posts-list/>
  </main>
  <modal/>
</template>

<style>
.header {
  display: flex;
  padding: 16px;
}

.header .auth {
  margin-left: auto;
}

.header__post-btn {
  margin: 0 auto;
}

.header__logo {
  margin-left: 17px;
}

.header__logo-link {
  font-size: 1.4em;
  font-weight: 600;
  vertical-align: -11px;

  color: #6200ee;
}
</style>