import { computed, reactive } from 'vue';
import exitCodes from '@/utils/exit-codes';
import axios from 'axios';

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
 * @returns AuthResponse or exit code.
 */
export async function loginUser(nickname: string, password: string): Promise<AuthResponse | number> {
    let res;
    try {
        res = await axios.post('/api/login', { nickname, password });
    } catch(error: any) {
        console.log(error);
        if(error.response && error.response.data && error.response.data.code) {
            return error.response.data.code;
        } else {
            return exitCodes.UNKNOWN_ERROR;
        }
    }

    if(!res.data || !res.data.token) {
        console.error('Couldn\'t find auth data in the response with 200 status code.');
        console.log(res);
        return exitCodes.UNKNOWN_ERROR;
    }

    let resData = (res.data as AuthResponse);
    data.userId = resData.user.id;
    data.nickname = resData.user.nickname;
    data.token = resData.token;

    return resData;
};

/**
 * @throws { AxiosError }
 * @returns AuthResponse or exit code.
 */
export async function registerUser(nickname: string, password: string): Promise<AuthResponse | number> {
    let res;
    try {
        res = await axios.post('/api/register', { nickname, password });
    } catch(error: any) {
        console.log(error);
        if(error.response && error.response.data && error.response.data.code) {
            return error.response.data.code;
        } else {
            return exitCodes.UNKNOWN_ERROR;
        }
    }

    if(!res.data || !res.data.token) {
        console.error('Couldn\'t find auth data in the response with 200 status code.');
        console.log(res);
        return exitCodes.UNKNOWN_ERROR;
    }

    let resData = (res.data as AuthResponse);
    data.userId = resData.user.id;
    data.nickname = resData.user.nickname;
    data.token = resData.token;

    return resData;
};