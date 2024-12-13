// types
import { BookType } from '@/types/home';

// libraries
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from '@tanstack/react-query';
import { deleteData } from '@/pages/api/home';

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
      const response = await deleteData(id);

      console.log(response);
    },

    onSuccess: () => {
      refetchBookAllInfo;
    },
  });
};

export default useDeleteBook;
