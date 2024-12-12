import { useParams } from 'next/navigation';

const detailPage = () => {
  const { id } = useParams();

  return <div>디테일 페이지입니다.{id}</div>;
};

export default detailPage;
