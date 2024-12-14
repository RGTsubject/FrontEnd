// apis
import { getSpecificData } from '@/pages/api/home';

// types
import { BookType } from '@/types/home';

// libraries
import { useQuery } from '@tanstack/react-query';

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
