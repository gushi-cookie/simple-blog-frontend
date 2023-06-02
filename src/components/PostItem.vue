<script setup lang="ts">
import { type PostItem, MediaType } from '@/services/PostsListService';
import dateFormat from 'dateformat';
import { computed } from 'vue';
import * as ModalService from '@/services/ModalService';
import * as AuthService from '@/services/AuthService';

const props = defineProps<PostItem>();
const date = computed(() => dateFormat(props.date, 'dd/mm/yyyy H:MM'));


function editPost() {
    ModalService.openModal('Edit post', 'PostEditForm', props);
};
</script>

<template>
<ui-card outlined class="post">
    <div class="post__media-cont" v-if="props.file">
        <img 
            v-if="props.file.mediaType === MediaType.Image"
            :src="props.file.url"
            class="post__img" 
        >
        <video 
            v-if="props.file.mediaType === MediaType.Video"
            :src="props.file.url"
            class="post__video"
            preload="metadata"
            controls
        ></video>
    </div>

    <ui-list-divider v-if="props.message"></ui-list-divider>
    <div v-ripple class="post__message-cont" v-if="props.message">
        <div class="post__message">{{ props.message }}</div>
    </div>
    
    <ui-list-divider></ui-list-divider>
    <div class="post__footer">
        <div class="post__author">Posted by <span>{{ props.nickname }}</span></div>
        <div class="post__date">{{ date }}</div>
        <ui-button outlined @click="editPost" :disabled="AuthService.data.userId !== props.userId">Edit</ui-button>
    </div>
</ui-card>
</template>

<style>
.post {

}


.post__media-cont {

}

.post__img,
.post__video {
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: 15px;
}

.post__img {

}

.post__video {

}


.post__message-cont {

}

.post__message {
    padding: 16px;
}


.post__footer {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;

    padding: 16px;
}

.post__author {

}
.post__author span {
    font-weight: 700;
    font-style: italic;
}

.post__date {

}
</style>