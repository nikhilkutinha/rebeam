import axios from "axios";
import { API_BASE_URL, API_KEY } from "../config";

const apiClient = axios.create({
  baseURL: API_BASE_URL
});

export const ImageService = {
  query(rover, params) {
    return apiClient.get(`/rovers/${rover}/photos`, {
      params: { ...params, api_key: API_KEY }
    });
  },

  latest(rover = "perseverance") {
    return apiClient.get(`/rovers/${rover}/latest_photos/`, {
      params: { api_key: API_KEY }
    });
  }
};

export const ManifestService = {
  get(rover) {
    return apiClient.get(`/manifests/${rover}/`, {
      params: { api_key: API_KEY }
    });
  }
};
