/* 
MyDashboard 내비게이션 컴포넌트: API 연결 추후 수정 예정
 */

import { FC, useEffect } from "react";
import { AxiosRequestConfig } from "axios";
import { useAPI } from "@/hooks/useAPI"; //
import NavbarTitle from "./NavbarTitle";
import ActionButton from "./ActionButton";
import BadgeCounter from "./BadgeCounter";
import ProfileDropdown from "./Dropdown/ProfileDropdown";
import { User } from "@/lib/api/types/users";
import { DashboardDetailResponse } from "@/lib/api/types/dashboards";

const MyDashboard: FC = () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDAyNywidGVhbUlkIjoiNi0yIiwiaWF0IjoxNzE5NDE0NDM0LCJpc3MiOiJzcC10YXNraWZ5In0.JRAWWvLmLkWJQRHJPX1ii6RrW7W8Q9tyRk5ENeFUz5A";

  // API 요청 설정
  const userConfig: AxiosRequestConfig = {
    url: "/users/me",
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const dashboardConfig: AxiosRequestConfig = {
    url: "/dashboards/9807",
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // useAPI 훅 사용하여 사용자 데이터 불러오기
  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useAPI<User>("userData", userConfig);

  // useAPI 훅 사용하여 대시보드 데이터 불러오기
  const {
    data: dashboardData,
    error: dashboardError,
    isLoading: dashboardLoading,
  } = useAPI<DashboardDetailResponse>("dashboardData", dashboardConfig);

  useEffect(() => {
    console.log("User Data:", userData);
    console.log("Dashboard Data:", dashboardData);
  }, [userData, dashboardData]);

  if (userLoading || dashboardLoading) {
    return <div>Loading...</div>;
  }

  if (userError || dashboardError || !userData || !dashboardData) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다</div>;
  }

  const profileInitial = userData?.nickname.charAt(0) ?? "";

  return (
    <>
      <div className='h-[60px] content-center border-b border-gray-30 p-4 tablet:h-[70px] desktop:h-[80px]'>
        <div className='flex items-center justify-between'>
          <NavbarTitle
            title={dashboardData.title}
            createdByMe={dashboardData.createdByMe}
          />

          {/*Nav 우측: 버튼(관리, 초대하기) + 계정 프로필 (뱃지, 이름)*/}
          <div className='ml-auto mr-2 flex items-center justify-end space-x-4 text-sm tablet:mr-10 tablet:space-x-8 tablet:text-base desktop:mr-20 desktop:space-x-10 desktop:text-base'>
            <div className='flex space-x-2 whitespace-nowrap font-medium text-gray-50 tablet:space-x-3 desktop:space-x-8'>
              <ActionButton label='관리' iconSrc='/icon/ic_setting.svg' />
              <ActionButton
                label='초대하기'
                iconSrc='/icon/ic_add_dashboard.svg'
              />
            </div>

            <div className='flex items-center space-x-3 tablet:space-x-6 desktop:space-x-8'>
              <BadgeCounter />

              <span className='font-bold'>|</span>

              <ProfileDropdown
                nickname={userData.nickname}
                profileInitial={profileInitial}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyDashboard;