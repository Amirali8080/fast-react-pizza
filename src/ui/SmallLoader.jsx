function SmallLoader() {
  return (
    <div className="flex items-center justify-center space-x-2 px-8 py-[5px] ">
      <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-black [animation-delay:-0.3s]"></div>
      <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-black [animation-delay:-0.15s]"></div>
      <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-black"></div>
    </div>
  );
}

export default SmallLoader;
