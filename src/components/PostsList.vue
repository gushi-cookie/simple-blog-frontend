<script setup lang="ts">
import * as PostsListService from '@/services/PostsListService';
import { posts } from '@/services/PostsListService';
import PostItem from './PostItem.vue';
import { onMounted } from 'vue';

onMounted(() => {
    PostsListService.fetchPosts(0);
});
</script>

<template>
<div class="posts-list" v-shadow="3">
    <post-item
        v-for="post in posts"
        :key="post.id"
        v-bind="post"
    ></post-item>
</div>
</template>

<style>
.posts-list {
    width: 400px;
    margin: 0 auto;
    margin-top: 30px;
    padding: 60px 12%;
}

.post {
    margin-bottom: 24px;
}
</style>