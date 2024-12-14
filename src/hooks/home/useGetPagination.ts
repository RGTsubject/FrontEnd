import { SetStateAction } from 'react';
// apis
import { getPagination } from '@/pages/api/home';

// types
import { BookType } from '@/types/home';

// libraries
import { useMutation } from '@tanstack/react-query';

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
