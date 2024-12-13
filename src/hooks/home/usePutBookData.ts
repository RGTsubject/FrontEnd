import { putBookData } from '@/pages/api/home';
import { BookType } from '@/types/home';
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from '@tanstack/react-query';

interface usePutBookDataType {
  modifyData: BookType;
  refetchData: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<BookType, Error>>;
}

const usePutBookData = ({ modifyData, refetchData }: usePutBookDataType) => {
  return useMutation({
    mutationKey: ['putBookData'],
    mutationFn: async () => {
      const { bookTitle, author, salesQuantity, price, detail } = modifyData;
      const body = {
        bookTitle,
        author,
        salesQuantity,
        price,
        detail,
      };
      const response = await putBookData(body, modifyData.id);

      console.log(response);
    },
    onSuccess: () => {
      refetchData();
    },
  });
};

export default usePutBookData;
