import React, { FC } from "react";

interface UserBadgeProps {
  customValue?: string;
  nickname?: string;
  profileImageUrl?: string;
  bgColor?: string;
  textColor?: string;
  size?: string;
  borderColor?: string;
  fontSize?: string;
}

const UserBadge: FC<UserBadgeProps> = ({
  customValue,
  nickname,
  profileImageUrl,
  bgColor = "bg-green-10",
  textColor = "text-black",
  borderColor = "border-white",
  fontSize = "text-base",
}) => {
  const displayValue =
    customValue ?? (nickname ? nickname.charAt(0).toUpperCase() : "");

  return (
    <div
      className={`flex items-center justify-center rounded-full border-2 ${borderColor} ${bgColor} h-[34px] w-[34px] tablet:h-[38px] tablet:w-[38px] desktop:h-[38px] desktop:w-[38px]`}
    >
      {profileImageUrl ? (
        <img
          className='h-full w-full rounded-full'
          src={profileImageUrl}
          alt='Profile'
        />
      ) : (
        <span className={`${fontSize} font-bold ${textColor}`}>
          {displayValue}
        </span>
      )}
    </div>
  );
};

export default UserBadge;
