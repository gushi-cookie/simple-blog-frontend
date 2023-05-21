import { computed, ref, reactive } from 'vue';
import axios, { type AxiosError } from 'axios';


export interface AuthData {
    userId: number | null,
    nickname: string | null,
    token: string | null,
};

export interface AuthResponse {
    token: string,
    message: string,
    user: {
        id: number,
        nickname: string,
    },
};

export const data = reactive<AuthData>({
    userId: null,
    nickname: null,
    token: null,
});


export const isSignedIn = computed<boolean>(() => data.token !== null);

export function logoutUser() {
    data.userId = null;
    data.nickname = null;
    data.token = null;
};

/**
 * @throws { AxiosError }
 */
export async function loginUser(nickname: string, password: string): Promise<AuthResponse> {
    let res = await axios.post('/api/login', { nickname, password });

    if(!res.data || !res.data.token) throw new Error('Couldn\'t find auth data in the response with 200 status code.');
    let resData = (res.data as AuthResponse);

    data.userId = resData.user.id;
    data.nickname = resData.user.nickname;
    data.token = resData.token;

    return resData;
};

/**
 * @throws { AxiosError }
 */
export async function registerUser(nickname: string, password: string): Promise<AuthResponse> {
    let res = await axios.post('/api/register', { nickname, password });

    if(!res.data || !res.data.token) throw new Error('Couldn\'t find auth data in the response with 200 status code.');

    let resData = (res.data as AuthResponse);

    data.userId = resData.user.id;
    data.nickname = resData.user.nickname;
    data.token = resData.token;

    return resData;
};