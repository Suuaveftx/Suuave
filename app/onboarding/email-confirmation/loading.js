function Loading() {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center max-w-6xl px-4 py-12 mx-auto'>
      {/* Animated Spinner */}
      <div className='w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin'></div>
    </div>
  );
}

export default Loading;
