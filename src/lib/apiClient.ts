import axios from "axios";
import axiosThrottle from "axios-request-throttle";

if (!process.env.REACT_APP_VAULT_API_URL) {
    throw new Error("REACT_APP_VAULT_API_URL is not defined");
}

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_VAULT_API_URL,
});
axiosThrottle.use(apiClient, {
    requestsPerSecond: 2,
});

export async function apiCall<R>(endpoint: string, query?: {}): Promise<R> {
    const response = await apiClient.get(endpoint, { params: query });
    return response.data.data as R;
}
