// apis
import { getAllData } from '@/pages/api/home';

// types
import { BookType } from '@/types/home';

// libraries
import { useQuery } from '@tanstack/react-query';

const useGetBookAllData = () => {
  return useQuery<BookType[]>({
    queryKey: ['getAllBook'],
    queryFn: async () => {
      const response = await getAllData();
      console.log('모든 데이터 가져오기: ', response);

      return response.data;
    },
  });
};

export default useGetBookAllData;
