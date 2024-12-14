import { getPagination } from '@/pages/api/home';
import { BookType } from '@/types/home';
import { useMutation, useQuery } from '@tanstack/react-query';
import { SetStateAction } from 'react';

interface useGetPaginationType {
  page: number;
  setAllBookInfo: React.Dispatch<SetStateAction<BookType[]>>;
}

const useGetPagination = ({ page, setAllBookInfo }: useGetPaginationType) => {
  return useMutation<BookType[]>({
    mutationKey: ['getPagination'],
    mutationFn: async () => {
      const limit = 10;

      const response = await getPagination(page, limit);

      console.log(response);

      return response.data.books;
    },
    onSuccess: (data) => {
      setAllBookInfo(data);
    },
  });
};

export default useGetPagination;
