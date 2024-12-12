// types
import { BookType } from '@/types/home';

// libraries
import axios from 'axios';
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from '@tanstack/react-query';

interface useDeleteBookType {
  id: number;
  refetchBookAllInfo: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<BookType[], Error>>;
}

const useDeleteBook = ({ id, refetchBookAllInfo }: useDeleteBookType) => {
  return useMutation({
    mutationKey: ['deleteBook'],
    mutationFn: async () => {
      const response = await axios.delete(`/book/${id}`);

      console.log(response);
    },

    onSuccess: () => {
      refetchBookAllInfo;
    },
  });
};

export default useDeleteBook;
