<script setup lang="ts">
import { ref, reactive, shallowRef } from 'vue';
import { MediaType, type PostItem } from '@/services/PostsListService';
import { updatePage, fetchPagesOverview } from '@/services/PostsListService';
import { closeModal } from '@/services/ModalService';
import * as AuthService from '@/services/AuthService';
import axios from 'axios';


const basePost = defineProps<PostItem>();

const post = reactive<PostItem>({
    id: basePost.id,
    date: basePost.date,
    nickname: basePost.nickname,
    userId: basePost.userId,
    file: basePost.file,
    message: basePost.message,
});

const file = shallowRef<File>();
const fileInput = ref<HTMLElement>();


const snackbarOpen = ref(false);
const snackbarMessage = ref('');
function showSnackbar(message: string) {
    snackbarMessage.value = message;
    snackbarOpen.value = true;
};


function onFileUpload(event: any) {
    file.value = event.srcElement.files[0] as File;
    post.file = {
        url: URL.createObjectURL(file.value),
        name: file.value.name,
        mediaType: file.value.type.split('/')[0] as MediaType,
    };
};

function onRemoveMedia() {
    file.value = undefined;
    post.file = undefined;
};

async function onApply() {
    if(!post.file && !post.message) return showSnackbar('Cannot submit an empty form.');

    let messageChanged = 
    !basePost.message && post.message ||
    basePost.message !== post.message ||
    basePost.message && !post.message;

    let fileChanged = 
    !basePost.file && post.file ||
    basePost.file?.url !== post.file?.url ||
    basePost.file && !post.file;
    

    let formData = new FormData();

    if(messageChanged) formData.append('message', String(post.message));

    if(fileChanged) {
        if(!post.file) formData.append('actions', JSON.stringify(['delete-file']));
        if(post.file && file.value) formData.append('file', file.value, file.value.name);
    }


    let headers = {
        'Authorization': AuthService.data.token,
        'Content-Type': 'multipart/form-data',
    };
    try {
        await axios.patch(`/api/blog-post/${post.id}`, formData, { headers });
        closeModal();
        updatePage();
    } catch(error) {
        console.log(error);
        showSnackbar('Some error just happened! Try again.');
    }
};

async function onDelete() {
    if(!confirm('Are you sure?')) return;

    let headers = {
        'Authorization': AuthService.data.token,
    };
    try {
        await axios.delete(`/api/blog-post/${post.id}`, { headers });
        closeModal();
        updatePage();
        fetchPagesOverview();
    } catch(error) {
        console.log(error);
        showSnackbar('Some error just happened! Try again.');
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

<form class="post-form">
    <div class="post-form__media-cont" v-if="post.file">
        <img 
            class="post-form__img"
            v-if="post.file?.mediaType === 'image'"
            :src="post.file?.url"
        >
        <video
            class="post-form__video"
            v-if="post.file?.mediaType === 'video'"
            :src="post.file?.url"
            controls
        ></video>
    </div>

    <ui-textfield v-model="post.message" outlined input-type="textarea" rows="8" class="post-form__textarea">
        Post message
    </ui-textfield>

    <div class="post-form__controls">
        <input type="file" accept="image/*, video/*" ref="fileInput" @change="onFileUpload" hidden>
        <ui-button raised v-if="post.file" @click="onRemoveMedia">remove media</ui-button>
        <ui-button raised v-if="!post.file" @click="fileInput?.click()">upload media</ui-button>

        <ui-button raised @click="onApply">apply</ui-button>
        <ui-button raised @click="onDelete">delete post</ui-button>
    </div>
</form>
</template>

<style>
.post-form {
    width: 400px;
    padding-top: 16px;
}


.post-form__media-cont {
    padding-bottom: 16px;
}

.post-form__img,
.post-form__video {
    display: block;
    width: 45%;
    margin: 0 auto;
    box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
}


.post-form__textarea {
    width: 100%;
}

.post-form__controls {
    padding: 16px 8px;

    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
}
</style>