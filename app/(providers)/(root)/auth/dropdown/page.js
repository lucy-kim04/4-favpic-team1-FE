"use client";

import Dropdown from "@/components/atoms/Dropdown";

function Dropdownpage() {
  return (
    <div>
      <Dropdown
        width="w-[134px]"
        label="등급"
        options={["COMMON", "RARE", "SUPER RARE", "LEGENDARY"]}
        onSelect={(value) => console.log(value)}
      />
      <Dropdown
        width="w-[134px]"
        label="장르"
        options={["여행", "풍경", "인물", "사물"]}
        onSelect={(value) => console.log(value)}
      />
      <Dropdown
        width="w-[160px]"
        label="판매방법"
        options={["교환 제시 대기 중", "판매중"]}
        onSelect={(value) => console.log(value)}
      />
      <Dropdown
        width="w-[140px]"
        label="매진 여부"
        options={["판매 중", "판매 완료"]}
        onSelect={(value) => console.log(value)}
      />
      <Dropdown
        width="w-[180px]"
        label="낮은 가격순"
        options={["최신 순", "오래된 순", "높은 가격순", "낮은 가격순"]}
        onSelect={(value) => console.log(value)}
        isBox={true}
      />
    </div>
  );
}

export default Dropdownpage;
