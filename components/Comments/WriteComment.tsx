/*
  댓글 작성해서 입력하는 WriterComment 컴포넌트 / 아직 전송 로직 입력 전입니다
*/

import { FC, useState } from "react";
import Button from "@/components/Button";
import fetcher from "@/lib/api/fetcher";

interface WriteCommentProps {
  cardId: number;
  columnId: number;
  dashboardId: number;
}

const WriteComment: FC<WriteCommentProps> = ({
  cardId,
  columnId,
  dashboardId,
}) => {
  const [comment, setComment] = useState("");

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetcher({
        url: `comments`,
        method: "POST",
        data: {
          content: comment,
          cardId,
          columnId,
          dashboardId,
        },
      });
      console.log("Comment submitted:", comment);
      setComment("");
    } catch (error) {
      console.error("Failed to submit comment", error);
    }
  };

  return (
    <div>
      <h3 className='mb-2 text-[14px] font-semibold tablet:text-[16px] desktop:text-[16px]'>
        댓글
      </h3>
      <div className='w-full rounded-[6px] border border-gray-30 p-2 focus-within:border-purple focus-within:outline-none'>
        <form
          onSubmit={handleCommentSubmit}
          className='flex flex-col items-end'
        >
          <textarea
            value={comment}
            onChange={handleCommentChange}
            placeholder='댓글 작성하기'
            className='w-full flex-grow resize-none border-none p-2 focus:outline-none'
            rows={2}
          ></textarea>
          <Button
            onClick={handleCommentSubmit}
            className='h-[28px] w-[84px] justify-end rounded-[4px] border border-gray-30 bg-white text-[12px] text-purple tablet:h-[32px] tablet:text-[14px] desktop:h-[32px] desktop:text-[14px]'
          >
            입력
          </Button>
        </form>
      </div>
    </div>
  );
};

export default WriteComment;
