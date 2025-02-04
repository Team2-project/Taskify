import { MouseEventHandler } from "react";

type DeleteButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onDelete?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

export default function DeleteButton({
  onClick,
  onDelete,
  className = "",
}: DeleteButtonProps) {
  const baseClasses =
    "box-border h-[52px] w-[284px] rounded-[8px] border-[1px] border-gray-30 bg-gray-10 text-[16px] font-medium";

  const responseClasses = "tablet:h-[62px] tablet:w-[320px] tablet:text-[18px]";

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (onClick) {
      onClick(event);
    }
    if (onDelete) {
      onDelete(event);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`${baseClasses} ${responseClasses} ${className}`}
    >
      대시보드 삭제하기
    </button>
  );
}

