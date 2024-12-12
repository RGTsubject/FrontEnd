import { bookData } from '@/constants/bookData';
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/book', () => {
    return HttpResponse.json(bookData);
  }),

  // 특정 ID의 책 데이터를 반환
  http.get('/book/:id', ({ params }) => {
    const bookId = params.id as string; // URL Params에서 ID 가져오기
    const book = bookData.find((b) => b.id === parseInt(bookId)); // ID를 갖는 책 찾기

    if (book) {
      return HttpResponse.json(book);
    } else {
      return HttpResponse.json(404); // 책이 없을 경우 404 응답
    }
  }),
];
