import { bookData } from '@/constants/bookData';
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/allData', () => {
    return HttpResponse.json(bookData);
  }),
];
