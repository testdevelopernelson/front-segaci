import axios from 'axios';
import type { Product } from '../interfaces/Product';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const url = import.meta.env.VITE_API_URL;

const $toast = useToast({
    position : 'bottom-right',
    duration : 4000
});

export async function listProducts() { 
    try {
        const response = await axios.get(`${url}/api/products`);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            return error.response;
        } else if (error.request) {
            $toast.error('En este momento no hay conexión con el servidor.');
            throw error;
        } else {
            $toast.error('Ocurrió un error');
            throw error;
        }
    }
}

export async function createProduct(data: Product) {
    try {
        const response = await  axios.post(`${url}/api/products`, data);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            return error.response;
        } else if (error.request) {
            $toast.error('Falló la conexión');
            throw error;
        } else {
            $toast.error('Ocurrió un error al intentar lanzar la peticion');
            throw error;
        }
    }
}

export async function updateProduct(data: Product, id: Number) {
    try {
        const response = await  axios.put(`${url}/api/products/${id}`, data);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            return error.response;
        } else if (error.request) {
            $toast.error('Falló la conexión');
            throw error;
        } else {
            $toast.error('Ocurrió un error al intentar lanzar la peticion');
            throw error;
        }
    }
}

export async function showProduct(id: number) {
    try {
        const response = await  axios.get(`${url}/api/products/${id}`);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            return error.response;
        } else if (error.request) {
            $toast.error('Falló la conexión');
            throw error;
        } else {
            $toast.error('Ocurrió un error al intentar lanzar la peticion');
            throw error;
        }
    }
}

export async function deleteProduct(id: number) {
    try {
        const response = await  axios.delete(`${url}/api/products/${id}`);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            return error.response;
        } else if (error.request) {
            $toast.error('Falló la conexión');
            throw error;
        } else {
            $toast.error('Ocurrió un error al intentar lanzar la peticion');
            throw error;
        }
    }
}