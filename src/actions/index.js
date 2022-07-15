import $api from '../http/';

export async function action(changeLoading, url, method, data = null){
    try {
        changeLoading()
        const response = await $api[method](url, data)
        return response.data;
    } catch (error) {
        return error;
    } finally {
        changeLoading()
    }
}