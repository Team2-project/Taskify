import React, { useState } from "react";
import UserCard from "./components/UserCard";
import Button from "@/components/Button";
import fetcher from "@/lib/api/fetcher";
import { useRouter } from "next/router";
import { MembersResponse, Member } from "@/lib/api/types/members";
import {
  useQuery,
  UseQueryResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import UserBadge from "@/components/UserBadge";

const MemberList: React.FC = () => {
  const [page, setPage] = useState(1);
  const size = 4;

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const router = useRouter();
  const { dashboardId } = router.query;
  const queryClient = useQueryClient();

  const membersConfig: AxiosRequestConfig = {
    url: `/members?page=${page}&size=${size}&dashboardId=${dashboardId}`,
    method: "GET",
  };

  const {
    data: membersData,
    error: membersError,
    isLoading: membersLoading,
  }: UseQueryResult<MembersResponse, Error> = useQuery({
    queryKey: ["membersData", dashboardId, page],
    queryFn: () => fetcher<MembersResponse>(membersConfig),
    enabled: !!dashboardId,
  });

  const deleteMutation = useMutation<void, Error, number>({
    mutationFn: async (memberId: number) => {
      await fetcher({
        url: `/members/${memberId}`,
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["membersData", dashboardId, page],
      });
    },
    onError: (error) => {
      console.error("구성원 삭제 중 오류가 발생했습니다", error);
    },
  });

  const handleButtonClick = (memberId: number) => {
    deleteMutation.mutate(memberId);
  };

  if (!dashboardId || Array.isArray(dashboardId)) {
    return <div>유효하지 않은 대시보드 ID</div>;
  }

  if (membersLoading) {
    return <div>로딩 중...</div>;
  }

  if (membersError) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다</div>;
  }

  if (!membersData || !membersData.members) {
    return <div>데이터가 없습니다</div>;
  }

  const totalCount = membersData.totalCount;

  return (
    <div className='h-337 max-w-[620px] bg-white tablet:h-404'>
      <div className='mt-[20px] flex w-full items-center justify-between px-[20px] tablet:px-[28px]'>
        <h2 className='text-xl font-bold tablet:text-2xl'>구성원</h2>
        <div className='flex items-center'>
          <p className='mr-3'>
            {page}페이지 중 {Math.ceil(totalCount / size)}
          </p>
          <Button.Arrow
            direction='left'
            onClick={handlePrevPage}
            disabled={page === 1}
          />
          <Button.Arrow
            direction='right'
            onClick={handleNextPage}
            disabled={page * size >= totalCount}
          />
        </div>
      </div>

      <p className='mb-[20px] ml-[20px] mt-[18px] text-sm font-normal text-gray-40 tablet:mb-[24px] tablet:ml-[28px] tablet:mt-[27px] tablet:text-base'>
        이름
      </p>
      <div className='flex flex-col gap-[24px]'>
        {membersData.members.map((member) => (
          <UserCard
            key={member.id}
            title={member.nickname}
            buttonLabel='삭제'
            onButtonClick={() => handleButtonClick(member.id)}
          >
            <UserBadge
              nickname={member.nickname}
              profileImageUrl={member.profileImageUrl}
              className='h-34 w-34'
            />
          </UserCard>
        ))}
      </div>
    </div>
  );
};

export default MemberList;
