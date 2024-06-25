/* MyDashboard 내비게이션 컴포넌트: API 연결해야 함

- MyDashboard 페이지에서 사용하는 내비게이션
- 관리버튼
- 초대하기 모달창
- 프로필 클릭시 드롭다운
 */
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import NavbarTitle from "./navbarTitle/NavbarTitle";
import ActionButton from "./actionButton/ActionButton";
import BadgeCounter from "./badgeCounter/BadgeCounter";
import UserBadge from "./userBadge/UserBadge";
import DropdownMenu from "./dropdown/DropdownMenu";
import { useRouter } from "next/router";
import {
  UserData,
  mockUserData,
  DashboardDetail,
  mockDashboardDetail,
} from "./MockData";

const fetchUserData = async (): Promise<UserData> => {
  // 현재 코드는 실제 API 호출을 대신하여 mock 데이터를 반환 - 추후 Data fetch 예정
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUserData);
    }, 1000);
  });
};

const MyDashboard: FC = () => {
  const { data, error, isLoading } = useQuery<UserData>({
    queryKey: ["userData"],
    queryFn: fetchUserData,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  const profileInitial = data?.nickname.charAt(0) ?? "";

  return (
    <>
      <div className='h-16 content-center border-b border-gray-30 p-4 tablet:h-20 desktop:h-20'>
        <div className='flex items-center justify-between'>
          <NavbarTitle
            title={mockDashboardDetail.title}
            createdByMe={mockDashboardDetail.createdByMe}
          />

          {/*Nav 우측: 관리 + 초대하기 + 프로필 + 이름*/}
          <div className='ml-auto mr-2 flex items-center justify-end space-x-8 text-sm tablet:mr-10 tablet:text-base desktop:mr-20 desktop:text-base'>
            {/*관리 + 초대하기 */}
            <div className='flex space-x-8 whitespace-nowrap font-medium text-gray-50'>
              <ActionButton label='관리' iconSrc='/icon/ic_setting.svg' />
              <ActionButton label='초대하기' iconSrc='/icon/ic_add.svg' />
            </div>

            <BadgeCounter />

            <span className='font-bold'>|</span>

            {/*프로필 + 이름 - 드롭다운 연결: 로그아웃, 내정보, 내 대시보드*/}
            <DropdownMenu
              buttonLabel={
                <div className='flex items-center space-x-3'>
                  <div className='relative inline-block'>
                    <UserBadge
                      nickname={profileInitial}
                      bgColor='bg-green-10'
                      textColor='text-white'
                    />
                  </div>
                  <div className='hidden font-medium tablet:inline desktop:inline'>
                    {data?.nickname}
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyDashboard;
