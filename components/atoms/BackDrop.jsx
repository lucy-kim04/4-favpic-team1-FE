'use client';

function BackDrop({ children }) {
  return (
    <div className="z-50 inset-0 fixed top-0 bottom-0 left-0 right-0 bg-black/80 flex items-center justify-center">
      {children}
    </div>
  );
}

export default BackDrop;
