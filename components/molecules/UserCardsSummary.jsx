import GradeMyCardCount from '../atoms/GradeMyCardCount';

function UserCardsSummary({ nickname, userSummary }) {
  const totalCount = Object.values(userSummary).reduce((a, b) => a + b);
  return (
    <div className="mt-10">
      <div className="flex items-center">
        <p className="text-2xl font-bold mr-[10px]">
          {nickname}님이 보유한 포토카드
        </p>
        <p className="text-xl text-[#a4a4a4]">({totalCount}장)</p>
      </div>
      <div className="flex gap-5 mt-5 mb-10">
        <GradeMyCardCount gradeCard={'COMMON'} count={userSummary['COMMON']} />
        <GradeMyCardCount gradeCard={'RARE'} count={userSummary['RARE']} />
        <GradeMyCardCount
          gradeCard={'SUPER RARE'}
          count={userSummary['SUPER RARE']}
        />
        <GradeMyCardCount
          gradeCard={'LEGENDARY'}
          count={userSummary['LEGENDARY']}
        />
      </div>
      <div className="h-[1px] bg-[#5a5a5a] "></div>
    </div>
  );
}

export default UserCardsSummary;
