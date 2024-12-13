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

export const postBookData = (body: {
  bookTitle: string;
  author: string;
  salesQuantity: number;
  price: number;
  detail: string;
}) => {
  return apiClient.post('/books', body);
};

export const putBookData = (
  body: {
    bookTitle: string;
    author: string;
    salesQuantity: number;
    price: number;
    detail: string;
  },
  id: number
) => {
  return apiClient.put(`/books/${id}`, body);
};
