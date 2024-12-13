import apiClient from './clients/basicClient';

export const getAllData = () => {
  return apiClient.get('/books');
};

export const getSpecificData = (id: string | string[] | undefined) => {
  return apiClient.get(`/books/${id}`);
};

export const postData = (formData: FormData) => {
  return apiClient.post('/books', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteData = (id: number) => {
  return apiClient.delete(`/books/${id}`);
};
