interface InputProps {
  subTitle: string;
  name: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  subTitle,
  name,
  value,
  placeholder,
  onChange,
}: InputProps) {
  return (
    <div className='mt-[18px] flex flex-col gap-[10px] tablet:mt-[26px]'>
      <div className='text-[16px] font-medium tablet:text-[18px]'>
        {subTitle} <span className='text-violet-20'>{"*"}</span>
      </div>
      <div className='relative flex h-[42px] w-full items-center rounded-[6px] border-[1px] border-gray-30 p-4 active:border-[1px] active:border-violet-20 tablet:h-[48px]'>
        <input
          name={name}
          placeholder={placeholder}
          className='w-full text-[14px] font-normal tablet:text-[16]'
          value={value}
          onChange={onChange}
        ></input>
      </div>
    </div>
  );
}
