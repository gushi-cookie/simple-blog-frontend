<script setup lang="ts">
import * as PostsListService from '@/services/PostsListService';
import { posts } from '@/services/PostsListService';
import PostItem from './PostItem.vue';
import { onMounted } from 'vue';

onMounted(async () => {
    await PostsListService.fetchPagesOverview();
    await PostsListService.fetchPosts(PostsListService.pageNumber.value);
});
</script>

<template>
<ui-pagination
    v-model="PostsListService.pageNumber.value"
    :total="PostsListService.pagination.value * PostsListService.pagesCount.value"
    :page-size="PostsListService.pagination.value"
    show-total
    position="center"
    class="posts-list__top-pagination"
></ui-pagination>

<div class="posts-list" v-shadow="3">
    <post-item
        v-for="post in posts"
        :key="post.id"
        v-bind="post"
    ></post-item>
</div>

<ui-pagination
    v-model="PostsListService.pageNumber.value"
    :total="PostsListService.pagination.value * PostsListService.pagesCount.value"
    :page-size="PostsListService.pagination.value"
    show-total
    position="center"
    class="posts-list__bottom-pagination"
></ui-pagination>
</template>

<style>
.posts-list {
    width: 400px;
    margin: 10px auto;
    padding: 60px 12%;
}

.posts-list__top-pagination {
    margin-top: 30px;
    border: 0 !important;
}

.posts-list__bottom-pagination {
    margin-bottom: 30px;
    border: 0 !important;
}

.post {
    margin-bottom: 24px;
}
</style>