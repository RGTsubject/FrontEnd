import { getAllData } from '@/pages/api/home';
import { BookType } from '@/types/home';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { SetStateAction } from 'react';

interface useGetBookAllDataType {
  setAllBookInfo: React.Dispatch<SetStateAction<BookType[]>>;
}

const useGetBookAllData = ({ setAllBookInfo }: useGetBookAllDataType) => {
  return useQuery<BookType[]>({
    queryKey: ['getAllBook'],
    queryFn: async () => {
      const response = await getAllData();
      console.log('모든 데이터 가져오기: ', response);

      if (response.status === 200) {
        setAllBookInfo(response.data);
      }

      return response.data;
    },
  });
};

export default useGetBookAllData;
