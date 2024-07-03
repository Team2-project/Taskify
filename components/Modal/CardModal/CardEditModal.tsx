import { FC, useEffect, useState } from "react";
import DropDown from "@/components/Input/DropDown";
import Input from "@/components/Input/Input";
import Textarea from "@/components/Input/Textarea";
import Calendar from "@/components/Input/Calendar";
import TagInput from "@/components/Input/TagInput";
import ImgInput from "@/components/Input/ImgInput";
import Button from "@/components/Button";
import useModal from "@/hooks/useModal";
import {
  FetchCardDetailsResponse,
  UpdateCardData,
} from "@/lib/api/types/cards";
import fetcher from "@/lib/api/fetcher";

interface ModalProps {
  isOpen: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  buttonAction: () => void;
  onClose: () => void;
  createButtonText: string;
  cancelButtonText: string;
  cardId: number;
}

export default function CardEditModal({
  isOpen,
  onSubmit,
  onClose,
  buttonAction,
  createButtonText,
  cancelButtonText,
  cardId,
}: ModalProps) {
  const {
    isOpen: modalIsOpen,
    cardDetails,
    openModal,
    closeModal,
  } = useModal(isOpen, cardId);

  const [formData, setFormData] = useState<UpdateCardData>({
    columnId: 0,
    assigneeUserId: 0,
    title: "",
    description: "",
    dueDate: "",
    tags: [],
    imageUrl: "",
  });

  useEffect(() => {
    if (isOpen) {
      openModal();
    } else {
      closeModal();
    }
  }, [isOpen, openModal, closeModal]);

  useEffect(() => {
    if (cardDetails) {
      console.log("Card details set in formData:", cardDetails);
      setFormData({
        columnId: cardDetails.columnId,
        assigneeUserId: cardDetails.assignee.id,
        title: cardDetails.title,
        description: cardDetails.description,
        dueDate: cardDetails.dueDate,
        tags: cardDetails.tags,
        imageUrl: cardDetails.imageUrl || "",
      });
    }
  }, [cardDetails]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      tags: value.split(",").map((tag) => tag.trim()),
    }));
  };

  const handleAssigneeChange = (assigneeUserId: number) => {
    setFormData((prev) => ({ ...prev, assigneeUserId }));
  };

  const handleColumnChange = (columnId: number) => {
    setFormData((prev) => ({ ...prev, columnId }));
  };

  const handleImageChange = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, imageUrl: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetcher({
      url: `cards/${cardId}`,
      method: "PUT",
      data: formData,
    });
    buttonAction();
    onClose();
  };

  if (!modalIsOpen) return null;

  return (
    <div className='fixed inset-0 box-border h-full w-full border bg-black bg-opacity-50'>
      <div className='fixed inset-0 m-auto h-[869px] w-[327px] rounded-[8px] bg-white px-[20px] pb-[20px] pt-[28px] tablet:h-[907px] tablet:w-[506px] tablet:px-[28px] tablet:pb-[28px] tablet:pt-[32px]'>
        <div className='text-[20px] font-bold tablet:text-[24px]'>
          할 일 수정
        </div>
        <div className='tablet:flex tablet:items-center tablet:justify-center tablet:gap-[16px]'>
          <DropDown
            subTitle='상태'
            placeholder={formData.columnId.toString()}
          />
          <DropDown
            subTitle='담당자'
            placeholder={formData.assigneeUserId.toString()}
          />
        </div>
        <Input
          subTitle='제목'
          name='title'
          value={formData.title}
          onChange={handleChange}
        />
        <Textarea
          subTitle='설명'
          name='description'
          value={formData.description}
          onChange={handleChange}
        />
        <Calendar
          subTitle='마감일'
          value={formData.dueDate}
          onChange={handleChange}
        />
        <TagInput
          subTitle='태그'
          value={formData.tags.join(",")}
          onChange={handleTagChange}
        />
        <ImgInput subTitle='이미지' onChange={handleImageChange} />

        <div className='mt-[18px] flex w-full items-center justify-center gap-[11px] tablet:mt-[26px] tablet:justify-end'>
          <Button
            type='submit'
            className='h-[50px] w-full rounded-[8px] text-white'
          >
            {createButtonText}
          </Button>
          <Button
            onClick={onClose}
            className='h-[50px] w-full rounded-[8px] border-[1px] border-gray-30 bg-white text-gray-50'
          >
            {cancelButtonText}
          </Button>
        </div>
      </div>
    </div>
  );
}
