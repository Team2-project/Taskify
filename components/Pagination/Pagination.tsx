import { Dispatch, SetStateAction } from "react";
import Button from "@/components/Button";

interface PaginationProps {
  count: number;
  pageSize: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

export default function usePagination({
  count,
  pageSize,
  currentPage,
  setCurrentPage,
}: PaginationProps) {
  const lastPage = Math.ceil(count / pageSize);

  const handlePrevPage = () => {
    if (currentPage === 1) return;
    setCurrentPage((prev) => prev - 1);
    // api 요청 (currentPage, pageSize)
  };

  const handleNextPage = () => {
    if (currentPage === lastPage) return;
    setCurrentPage((prev) => prev + 1);
  };

  const renderPaginationButtons = () => (
    <div className='flex items-center justify-end gap-[16px]'>
      <span className='text-[14px] font-normal'>
        {lastPage} 페이지 중 {currentPage}
      </span>
      <div>
        <Button.Arrow onClick={handlePrevPage} direction='left' />
        <Button.Arrow onClick={handleNextPage} direction='right' />
      </div>
    </div>
  );

  return (
    <div className='flex items-center justify-end gap-[16px]'>
      <span className='text-[14px] font-normal'>
        {lastPage} 페이지 중 {currentPage}
      </span>
      <div>
        <Button.Arrow onClick={handlePrevPage} direction='left' />
        <Button.Arrow onClick={handleNextPage} direction='right' />
      </div>
    </div>
  );
}
