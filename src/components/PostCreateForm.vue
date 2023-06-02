<script setup lang="ts">
import {  ref, shallowRef } from 'vue';
import { toFirstPage, fetchPagesOverview } from '@/services/PostsListService';
import { closeModal } from '@/services/ModalService';
import * as AuthService from '@/services/AuthService';
import axios from 'axios';


const message = ref('');
const file = shallowRef<File>();
const fileInput = ref<HTMLElement>();


const snackbarOpen = ref(false);
const snackbarMessage = ref('');
function showSnackbar(message: string) {
    snackbarMessage.value = message;
    snackbarOpen.value = true;
};


async function onSubmit() {
    if(!file.value && !message.value) return showSnackbar('Cannot submit empty post!');


    let formData = new FormData();
    if(file.value) formData.append('file', file.value, file.value.name);
    if(message.value) formData.append('message', message.value);


    let headers = {
        'Authorization': AuthService.data.token,
        'Content-Type': 'multipart/form-data',
    };
    try {
        await axios.post('/api/blog-post', formData, { headers });
        closeModal();
        toFirstPage();
        fetchPagesOverview();
    } catch(error) {
        console.log(error);
        return showSnackbar('Some error just happened! Try again.');
    }
};

function onFileUpload(event: any) {
    file.value = event.srcElement.files[0] as File;
};

function fileToObjectURL() {
    if(file.value) return URL.createObjectURL(file.value);
};
</script>

<template>
<ui-snackbar
    :message="snackbarMessage"
    v-model="snackbarOpen"
    action-button-text="close"
    position="top"
></ui-snackbar>

<form class="post-form" @submit.prevent="onSubmit">
    <div class="post-form__media-cont" v-if="file">
        <img 
            class="post-form__img"
            v-if="file && file.type.indexOf('image') >= 0"
            :src="fileToObjectURL()"
        >
        <video
            class="post-form__video"
            v-if="file && file.type.indexOf('video') >= 0"
            :src="fileToObjectURL()"
            controls
        ></video>
    </div>

    <ui-textfield v-model="message" outlined input-type="textarea" rows="8" class="post-form__textarea">
        Post message
    </ui-textfield>

    <div class="post-form__controls">
        <input type="file" accept="image/*, video/*" ref="fileInput" @change="onFileUpload" hidden>
        <ui-button raised v-if="file" @click="file=undefined">remove media</ui-button>
        <ui-button raised v-if="!file" @click="fileInput?.click()">upload media</ui-button>

        <ui-button raised native-type="submit">submit</ui-button>
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