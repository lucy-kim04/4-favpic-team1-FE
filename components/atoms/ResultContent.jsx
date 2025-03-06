import lineBreakText from '@/utils/lineBreakText';

function ResultContent({ content }) {
  return (
    <div>
      <p className="grow-0 mb-5 text-base lg:text-xl text-[#a4a4a4] md:hidden sm:hidden">
        {content}
      </p>
      <p className="grow-0 mb-5 text-base lg:text-xl text-[#a4a4a4] text-center lg:hidden">
        {lineBreakText(content)}
      </p>
    </div>
  );
}

export default ResultContent;
