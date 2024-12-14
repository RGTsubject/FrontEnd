import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// styles
import { HomeContainer, SearchInput } from '@/styles/styles';

// icons
import { FiSearch } from 'react-icons/fi';
import { FaTrashAlt } from 'react-icons/fa';

// types
import { BookType } from '@/types/home';

// hooks
import useGetBookAllData from '@/hooks/home/useGetBookAllData';
import useDeleteBook from '@/hooks/home/useDeleteBook';

// imgs
import basicImg from '@/assets/img/BasicBookCover.jpg';

// libraries

// apis
import { sortingDatas } from '@/constants/imgSorting';
import Modal from '@/components/Modal';
import usePostData from '@/hooks/home/usePostData';
import useGetPagination from '@/hooks/home/useGetPagination';

const Home = () => {
  // 페이지
  const [page, setPage] = useState<number>(1);
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
    },
  ]);

  // 선택된 데이터
  const [selectedBookInfo, setSelectedBookInfo] = useState<BookType>({
    id: 0,
    bookTitle: '',
    author: '',
    salesQuantity: 0,
    price: 0,
    detail: '',
  });

  // 책 아이디
  const [bookId, setBookId] = useState<number>(0);

  // modal boolean
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data: allData } = useGetBookAllData(); // 모든 데이터 GET

  const { mutate: bookPagination } = useGetPagination({ page, setAllBookInfo }); // 페이지네이션

  const { mutate: deleteBookQuery, isSuccess: SucessDelete } = useDeleteBook({
    id: bookId,
    bookPagination,
  }); // 책 Delete

  const { isSuccess: SuccessPost, mutate: enrollBookData } = usePostData({
    selectedBookInfo,
  });

  useEffect(() => {
    bookPagination();
  }, [SucessDelete, SuccessPost]);

  // 책 검색
  const inputSearchData = useCallback(
    (word: string) => {
      setSearchData(word);
      if (word.length === 0) {
        bookPagination();
      }
    },
    [bookPagination]
  );

  // 검색 필터링
  const filteringBook = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.code === 'Enter') {
        const searchTerm = searchData.toLowerCase();

        const filteredBooks = allData?.filter(
          (book) =>
            book.bookTitle.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm)
        );

        if (filteredBooks && filteredBooks?.length !== allBookInfo.length) {
          setAllBookInfo(filteredBooks);
        }
      }
    },
    [allData, searchData, allBookInfo]
  );

  // 삭제
  function deleteBook(id: number) {
    setBookId(id);
    deleteBookQuery();
  }

  // 이미지 sort
  function sortingImg(bookTitle: string) {
    const filtering = sortingDatas.filter(
      (data) => data.bookTitle === bookTitle
    );

    const imgSrc = filtering.length > 0 ? filtering[0].img : basicImg; // 조건에 따른 src 선택

    const options = {
      className: 'bookCover',

      width: 150,
      height: 270,
    };

    return <Image src={imgSrc} {...options} alt="책 이미지" />;
  }

  // modal hanlder
  function handleModal() {
    setIsOpen(!isOpen);
  }

  // 데이터 입력
  function inputData(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setSelectedBookInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // post data
  function submitData() {
    enrollBookData();
    setIsOpen(false);
  }

  // 페이지 이동
  function handlePage(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const { id } = e.currentTarget;

    if (id === 'left') {
      if (page > 0) {
        setPage((prev) => prev - 1);
        bookPagination();
      }
    } else {
      if (allData && page < allData.length / 10) {
        setPage((prev) => prev + 1);
        bookPagination();
      }
    }
  }

  useEffect(() => {
    console.log(page);
  }, [selectedBookInfo, page]);

  return (
    <HomeContainer>
      <div id="modal-container"></div>
      {isOpen && <div className="background" onClick={handleModal}></div>}
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
        <div style={{ textAlign: 'end', width: '60%' }}>
          <button onClick={() => handleModal()}>등록</button>
          {isOpen && (
            <Modal openModal={handleModal} modal={isOpen}>
              <div className="inputContainer">
                <span>책 제목</span>
                <input
                  name="bookTitle"
                  className="input"
                  onChange={(e) => inputData(e)}
                />
                <span>저자</span>
                <input
                  name="author"
                  className="input"
                  onChange={(e) => inputData(e)}
                />
                <span>판매 수량</span>
                <input
                  name="salesQuantity"
                  className="input"
                  onChange={(e) => inputData(e)}
                />
                <span>가격</span>
                <input
                  name="price"
                  className="input"
                  onChange={(e) => inputData(e)}
                />
                <span>책 소개</span>
                <textarea name="detail" onChange={(e) => inputData(e)} />

                <div style={{ textAlign: 'end' }}>
                  <button onClick={() => submitData()}>완료</button>
                </div>
              </div>
            </Modal>
          )}
        </div>
        <main>
          {allBookInfo &&
            allBookInfo.map((info, i) => {
              return (
                <div className="bookShow" key={i} style={{ cursor: 'pointer' }}>
                  <Link href={`/${info.id}`} passHref>
                    <div className="bookCol">
                      <div className="bookCoverRow">
                        {sortingImg(info.bookTitle)}
                      </div>

                      <span className="bookTitle">{info.bookTitle}</span>
                      <span className="bookAuthor">저자: {info.author}</span>
                      <span className="bookPrice">{info.price}원</span>
                    </div>
                  </Link>
                  <div className="deleteRow">
                    <FaTrashAlt
                      onClick={(e) => {
                        e.stopPropagation(); // 이벤트 전파 방지
                        deleteBook(info.id); // 삭제 함수 호출
                      }}
                    />
                  </div>
                </div>
              );
            })}
        </main>
        <div>
          <button className="leftBtn" id="left" onClick={(e) => handlePage(e)}>
            &lt;
          </button>
          <button
            className="rightBtn"
            id="right"
            onClick={(e) => handlePage(e)}
          >
            &gt;
          </button>
        </div>
      </div>
    </HomeContainer>
  );
};

export default Home;
