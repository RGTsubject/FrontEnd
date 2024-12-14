// types
import { BookType } from '@/types/home';

// libraries
import { MutateOptions, useMutation } from '@tanstack/react-query';
import { deleteData } from '@/pages/api/home';

interface useDeleteBookType {
  id: number;
  bookPagination: (
    variables: void,
    options?: MutateOptions<BookType[], Error, void, unknown> | undefined
  ) => void;
}

const useDeleteBook = ({ id, bookPagination }: useDeleteBookType) => {
  return useMutation({
    mutationKey: ['deleteBook'],
    mutationFn: async () => {
      const response = await deleteData(id);

      console.log(response);
    },

    onSuccess: () => {
      bookPagination;
    },
  });
};

export default useDeleteBook;
