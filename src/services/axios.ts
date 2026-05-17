"use client";

import axios, { AxiosError, AxiosInstance } from "axios";
import { clearLocalStorage } from "./local-storage-service";
import { handleToast } from "@/components/ui/toast-handler";

const axiosClient: AxiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
    timeout: 30000,
    withCredentials: true,
});

const handleError = (error: AxiosError): Promise<never> => {
    if (error.code === "ERR_CANCELED") return new Promise(() => { });
    if (error.response) {
        const { status, data } = error.response as {
            status: number;
            data: { message: string };
        };
        if (status === 401) clearLocalStorage();
        handleToast({
            variant: "error",
            message: data.message,
        });
    } else if (error.request) {
        handleToast({
            variant: "error",
            message: "Network Error: Please check your internet connection.",
        });
    } else {
        handleToast({
            variant: "error",
            message: `Error: ${error.message}`,
        });
    }

    return Promise.reject(error); // Ensure error is caught downstream
};

// Common error handler
axiosClient.interceptors.request.use((config) => {
    const token = typeof window !== "undefined" && localStorage.getItem("token");
    config.withCredentials = true;
    config.headers["X-Requested-With"] = "XMLHttpRequest";
    if (token) config.headers.Authorization = "Bearer " + token;
    return config;
});

// Add interceptors
axiosClient.interceptors.response.use(
    (response) => response, // Handle successful responses
    (error) => handleError(error), // Handle errors
);

export default axiosClient;