"use client";

import cardsApi from "@/api/cards/cards.api";
import usersApi from "@/api/users/users.api";
import icDropdown from "@/assets/images/ic-dropdown.png";
import constants from "@/constant";
import { useAuth } from "@/contexts/AuthContext";
import { useModal } from "@/contexts/ModalContext";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Dropdown from "../atoms/Dropdown";
import ConfirmModal from "../molecules/ConfirmModal";
import InputSearch from "../molecules/InputSearch";
import Title from "../molecules/Title";
import UserCardsSummary from "../molecules/UserCardsSummary";
import CardList from "../organisms/CardList";
import FilterModal from "../atoms/Filter";

function MyGallery() {
  const [orderBy, setOrderBy] = useState("최신 순");
  const [grade, setGrade] = useState("등급");
  const [genre, setGenre] = useState("장르");
  const [keyword, setKeyword] = useState("");
  const router = useRouter();
  const modal = useModal();
  const { isLoggedIn } = useAuth();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { handleSubmit, control } = useForm({ defaultValues: { search: "" } });

  const { data: user } = useQuery({
    queryKey: ["me"],
    queryFn: usersApi.getMe,
  });

  const searchOptions = { orderBy, grade, genre, keyword };
  const { data, isPending } = useQuery({
    queryKey: ["cards", { ...searchOptions }],
    queryFn: () => cardsApi.getMyCardsOfGallery(searchOptions),
    staleTime: 0,
    placeholderData: (prevData) => prevData, // 깜박임을 없애기 위해 넣었는데..잘 안 됨(2025.02.19)
    retry: 0,
  });

  const handleClickModalButton = () => {
    router.push("/auth/log-in");
  };

  const handleClickCard = (card, intent) => {
    if (!isLoggedIn)
      return modal.open(
        <ConfirmModal
          title={"로그인이 필요합니다."}
          content={`로그인이 필요한 서비스입니다.
            로그인 하시겠습니까?`}
          buttonText="로그인하기"
          onClick={handleClickModalButton}
        />
      );

    const cardLink =
      intent === "shop"
        ? `/${card.id}`
        : intent === "gallery"
        ? `/my-cards/gallery/${card.id}`
        : `/my-cards/sales/${card.id}`;

    router.push(`${cardLink}`);
  };

  const handleSubmitSearch = (dto) => {
    setKeyword(dto.search);
  };

  const cards = data?.cards || [];

  if (isPending) return null;
  return (
    <div>
      <div className="mb-[60px] md:mb-10 sm:mb-5">
        <Title
          intent="xl"
          onClick={() => {
            router.push("/my-cards/gallery/create");
          }}
          className="sm:hidden"
        >
          마이갤러리
        </Title>
        <UserCardsSummary
          nickname={user?.nickname}
          userSummary={data?.userSummary}
          intent="inPossesion"
        />
        <div className="flex justify-between items-center mt-5  sm:hidden">
          <form onSubmit={handleSubmit(handleSubmitSearch)}>
            <InputSearch
              control={control}
              name={"search"}
              placeholder={"검색"}
              size="md"
            />
          </form>
          <div className="flex shrink-0 ml-[60px] md:ml-[30px] gap-[45px] md:gap-[25px]">
            <Dropdown
              width="w-[134px]"
              label="등급"
              options={constants.CARD_GRADES}
              onSelect={setGrade}
            />
            <Dropdown
              width="w-[134px]"
              label="장르"
              options={constants.CARD_GENRES}
              onSelect={setGenre}
            />
          </div>
          <div className="w-full grow-1"></div>
        </div>
        <div className="flex justify-between items-center mt-5 lg:hidden md:hidden">
          <Image
            src={icDropdown}
            alt="드롭다운"
            className="w-[45px] h-[45px] cursor-pointer"
            onClick={() => setIsFilterOpen(true)}
          />
          <form onSubmit={handleSubmit(handleSubmitSearch)}>
            <InputSearch
              control={control}
              name={"search"}
              placeholder={"검색"}
              size="md"
            />
          </form>
        </div>
      </div>
      {isFilterOpen && (
        <FilterModal
          onClose={() => setIsFilterOpen(false)}
          filters={{
            등급: constants.CARD_GRADES.map((grade) => ({
              label: grade,
              count: cards.filter((card) => card.grade === grade).length,
            })),
            장르: constants.CARD_GENRES.map((genre) => ({
              label: genre,
              count: cards.filter((card) => card.genre === genre).length,
            })),
            "매진 여부": constants.CARD_ON_SALE.map((sale) => ({
              label: sale,
              count: cards.filter((card) => card.onSale === sale).length,
            })),
          }}
          onSelect={(selected) => console.log("선택된 필터:", selected)}
        />
      )}
      <CardList cards={cards} intent="gallery" onCardClick={handleClickCard} />
    </div>
  );
}

export default MyGallery;
