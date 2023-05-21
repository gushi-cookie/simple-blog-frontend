<script setup lang="ts">
import Auth from './components/Auth.vue';
import Modal from './components/Modal.vue';
</script>

<template>
  <header class="header" v-shadow="3">
    <div class="header__logo">
      <a class="header__logo-link" href="/">Simple Blog</a>
    </div>
    <auth/>
  </header>

  <main>

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