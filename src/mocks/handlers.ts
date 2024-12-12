import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/hello', () => {
    return HttpResponse.json('Hello World!');
  }),
];
