import { getSpecificData } from '@/pages/api/home';
import { BookType } from '@/types/home';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface useGetBookSpecificDataType {
  id: string | string[] | undefined;
}

const useGetBookSpecificData = ({ id }: useGetBookSpecificDataType) => {
  return useQuery<BookType>({
    queryKey: ['getSpecificBook', id],
    queryFn: async () => {
      const response = await getSpecificData(id);
      console.log('특정 데이터 받아오기: ', response);

      return response.data;
    },
  });
};

export default useGetBookSpecificData;
