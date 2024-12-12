import { BookType } from '@/types/home';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useGetBookAllData = () => {
  return useQuery<BookType[]>({
    queryKey: ['getAllBook'],
    queryFn: async () => {
      const response = await axios.get('/allData');
      console.log('모든 데이터 가져오기: ', response);

      return response.data;
    },
  });
};

export default useGetBookAllData;
