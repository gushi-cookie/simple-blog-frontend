import axios from 'axios';
import { ref } from 'vue';
import exitCodes from '@/utils/exit-codes';


interface PagesOverview {
    code: number;
    count: number;
    pagination: number;
};

export enum MediaType {
    Image = 'image',
    Video = 'video',
};

export interface PostItem {
    id: number,
    userId: number,
    nickname: string,
    date: Date,
    message?: string,
    file?: {
        url: string,
        name: string,
        mediaType: MediaType,
    },
};

export interface PostsListResponse {
    code: number;
    posts: PostItem[],
};


export const posts = ref<PostItem[]>([]);
export const pageNumber = ref<number>(0);
export const pagesCount = ref<number>(0);
export const pagination = ref<number>(0);

/**
 * @returns Object or exit code.
 */
export async function fetchPagesOverview(): Promise<PagesOverview | number> {
    let res;
    try {
        res = await axios.get('/api/posts-list/pages');
    } catch(error: any) {
        console.log(error);
        if(error.response?.data?.code) return error.response.data.code;
        return exitCodes.UNKNOWN_ERROR;
    }

    let data = res.data as PagesOverview;

    pagination.value = data.pagination;
    pagesCount.value = data.count;

    return data;
};

/**
 * @returns Object or exit code.
 */
export async function fetchPosts(pageNumber: number): Promise<PostsListResponse | number> {
    let res;
    try {
        res = await axios.get('/api/posts-list', { params: { page: pageNumber } });
    } catch(error: any) {
        console.log(error);
        if(error.response?.data?.code) return error.response.data.code;
        return exitCodes.UNKNOWN_ERROR;
    }

    let data = res.data as PostsListResponse;
    posts.value = data.posts;

    return data;
};


/**
 * @returns File or exit code.
 */
export async function fetchFile(url: string, fileName: string): Promise<File | number> {
    let res;
    try {
        res = await axios.get(url);
    } catch(error: any) {
        console.log(error);
        if(error.response?.data?.code) return error.response.data.code;
        return exitCodes.UNKNOWN_ERROR;
    }

    return new File(res.data, fileName);
};