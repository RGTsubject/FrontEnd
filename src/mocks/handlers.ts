import { bookData } from '@/constants/bookData';
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/book', () => {
    return HttpResponse.json(bookData);
  }),

  http.get('/book/:id', ({ params }) => {
    const bookId = params.id as string;
    const book = bookData.find((b) => b.id === parseInt(bookId));

    if (book) {
      return HttpResponse.json(book);
    } else {
      return HttpResponse.json('Not Found Data', { status: 404 });
    }
  }),

  http.delete('/book/:id', ({ params }) => {
    const bookId = parseInt(params.id as string);

    const bookIndex = bookData.findIndex((b) => b.id === bookId);

    if (bookIndex > -1) {
      bookData.splice(bookIndex, 1);
      return HttpResponse.json(null, { status: 204 });
    } else {
      return HttpResponse.json({ error: 'No data exists' }, { status: 404 });
    }
  }),
];
