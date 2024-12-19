function LoadingScreen() {
  return (
    <div
    className={`fixed top-0 scale-[2] left-0 w-full h-full opacity-100 flex duration-1000 justify-center ease-out items-center transition-all`}
  >
    <div className={`fixed self-center  `}>
    </div>
      
    <div className="fixed animate-spin ease border-t-4 border-blue-500 rounded-full h-12 w-12"></div>
      
    
  </div>
  )
}
export default LoadingScreen