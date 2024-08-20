export default function HeroSection() {
  return (
    <div className="flex content-normal items-center bg-hero-img h-[450px] w-full bg-cover bg-no-repeat relative">
      <div className="w-full ">
        <div className="text-white text-center">
          <h1 className="text-6xl font-semibold">Your Personal Assistant</h1>
          <h2 className="text-2xl font-bold">
            One stop solution for your services. Order any service, anytime
          </h2>
        </div>

        <div className="my-2 w-full xl:w-1/3 lg:w-1/2 md:w-2/3 mx-auto px-2">
          <input
            type="search"
            className="p-3 rounded-md w-full focus:outline-none"
            placeholder="Search for services, e.g. plumber, electrician, etc."
          />
        </div>


      </div>
      <a
          href="https://www.freepik.com/free-photo/service-maintenance-worker-repairing_20288671.htm#fromView=search&page=1&position=0&uuid=2502923e-a7be-4aa8-8fff-384feda09be8"
          className="absolute bottom-1 right-2 text-white text-xs"
        >
          Image by freepik
        </a>
    </div>
  );
}
