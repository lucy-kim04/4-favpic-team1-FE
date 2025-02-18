function PageContainer({ children }) {
  return (
    <div className="flex justify-center">
      <main className="w-full max-w-[1480px] mx-16 md:mx-5 sm:mx-4  mt-[60px] md:mt-10 sm:mt-5 mb-[200px]">
        {children}
      </main>
    </div>
  );
}

export default PageContainer;
