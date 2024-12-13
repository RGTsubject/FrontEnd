import { postBookData } from '@/pages/api/home';
import { BookType } from '@/types/home';
import { useMutation } from '@tanstack/react-query';

interface usePostDataType {
  selectedBookInfo: BookType;
}
const usePostData = ({ selectedBookInfo }: usePostDataType) => {
  return useMutation({
    mutationKey: ['postData'],
    mutationFn: async () => {
      const { bookTitle, author, salesQuantity, price, detail } =
        selectedBookInfo;

      const body = {
        bookTitle,
        author,
        salesQuantity,
        price,
        detail,
      };
      const response = await postBookData(body);

      console.log(response);

      return response.data;
    },
  });
};

export default usePostData;
