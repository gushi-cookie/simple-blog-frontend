<script setup lang="ts">
import { computed, onMounted, ref, shallowRef } from 'vue';
import { type PostItem } from '@/services/PostsListService';
import { fetchFile } from '@/services/PostsListService';
import { closeModal } from '@/services/ModalService';
import * as AuthService from '@/services/AuthService';
import axios from 'axios';


const postToEdit = defineProps<PostItem>();
const editMode = computed(() => postToEdit.id !== undefined);

const message = ref('');
const fileInput = ref<HTMLElement>();
const file = shallowRef<File>();


onMounted(async () => {
    if(!editMode) return;

    if(postToEdit.message) message.value = postToEdit.message;
    if(postToEdit.file) {
        console.log(await fetchFile(postToEdit.file.url, postToEdit.file.name));
    }
});

async function onSubmit() {
    if(!file.value && !message.value) return;

    let fd = new FormData();
    if(file.value) fd.append('file', file.value, file.value.name);
    if(message.value) fd.append('message', message.value);

    await axios.post('/api/blog-post', fd, {
        headers: {
            'Authorization': AuthService.data.token,
            'Content-Type': 'multipart/form-data',
        }
    });
};

function onFileUpload(event: any) {
    file.value = event.srcElement.files[0] as File;
};

function fileToObjectURL() {
    if(file.value) return URL.createObjectURL(file.value);
};
</script>

<template>
<form class="post-form" @submit.prevent="onSubmit">
    <div class="post-form__media-cont">
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

    <ui-textfield v-model="message" outlined input-type="textarea" rows="8">
        Post message
    </ui-textfield>

    <div class="post-form__media-controls">
        <input type="file" accept="image/*, video/*" ref="fileInput" @change="onFileUpload" hidden>
        <ui-button raised v-if="file" @click="file=undefined">remove media</ui-button>
        <ui-button raised v-if="!file" @click="fileInput?.click()">upload media</ui-button>
    </div>

    <div class="post-form__post-controls">
        <ui-button raised native-type="submit" v-if="!editMode">submit</ui-button>
        <ui-button raised v-if="editMode">apply</ui-button>
        <ui-button raised v-if="editMode">delete post</ui-button>
    </div>
</form>
</template>

<style>

</style>