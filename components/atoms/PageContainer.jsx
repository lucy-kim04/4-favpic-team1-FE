function PageContainer({ children }) {
  return (
    <div className="flex justify-center">
      <main className="w-full max-w-[1480px] mx-16 md:mx-10 sm:mx-5  mt-[60px] mb-[200px]">
        {children}
      </main>
    </div>
  );
}

export default PageContainer;
