import lineBreakText from '@/libs/lineBreakText';

function ResultContent({ content }) {
  return (
    <div>
      <p className="grow-0 mb-5 text-sm lg:text-base text-[#a4a4a4] md:hidden sm:hidden">
        {content}
      </p>
      <p className="grow-0 mb-5 text-[#a4a4a4] text-center lg:hidden">
        {lineBreakText(content)}
      </p>
    </div>
  );
}

export default ResultContent;
