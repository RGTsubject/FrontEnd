import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// styles
import { HomeContainer, SearchInput } from '@/styles/styles';

// icons
import { FiSearch } from 'react-icons/fi';

// types
import { BookType } from '@/types/home';

// hooks
import useGetBookAllData from '@/hooks/home/useGetBookAllData';

const Home = () => {
  // 검색 단어
  const [searchData, setSearchData] = useState<string>('');

  // 전체 데이터
  const [allBookInfo, setAllBookInfo] = useState<BookType[]>([
    {
      id: 0,
      bookTitle: '',
      author: '',
      salesQuantity: 0,
      price: 0,
      detail: '',
      img: '',
    },
  ]);

  const { refetch: refetchBookAllInfo } = useGetBookAllData({
    setAllBookInfo,
  }); // 모든 데이터 GET

  useEffect(() => {
    refetchBookAllInfo();
  }, []);

  const inputSearchData = useCallback(
    (word: string) => {
      setSearchData(word);
      if (word.length === 0) {
        refetchBookAllInfo();
      }
    },
    [refetchBookAllInfo]
  );

  const filteringBook = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.code === 'Enter') {
        const searchTerm = searchData.toLowerCase();

        const filteredBooks = allBookInfo.filter(
          (book) =>
            book.bookTitle.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm)
        );

        if (filteredBooks.length !== allBookInfo.length) {
          setAllBookInfo(filteredBooks);
        }
      }
    },
    [searchData, allBookInfo]
  );

  return (
    <HomeContainer>
      <div className="container">
        <span className="title">RGT 면접 전 과제</span>
        <nav>
          <SearchInput
            value={searchData}
            onChange={(e) => inputSearchData(e.target.value)}
            onKeyDown={(e) => filteringBook(e)}
          />{' '}
          <FiSearch size={25} color="#c1c2c2" />
        </nav>
        <main>
          {allBookInfo?.map((info, i) => {
            return (
              <Link key={i} href={`/${info.id}`}>
                <div className="bookShow" style={{ cursor: 'pointer' }}>
                  {' '}
                  {info.img && (
                    <div className="bookCoverRow">
                      <Image
                        className="bookCover"
                        src={info.img}
                        alt="책 이미지"
                        width={150}
                        height={270}
                      />
                    </div>
                  )}
                  <span className="bookTitle">{info.bookTitle}</span>
                  <span className="bookAuthor">저자: {info.author}</span>
                  <span className="bookPrice">{info.price}원</span>
                </div>
              </Link>
            );
          })}
        </main>
      </div>
    </HomeContainer>
  );
};

export default Home;
