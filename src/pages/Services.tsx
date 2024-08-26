import Navbar from "../components/Navbar";
import ServiceCard from "../components/ServiceCard";
import useAuth from "../hooks/useAuth";

export default function Services() {
  const {categories, services} = useAuth()
  
  return (
    <div className="">
      <Navbar />
      <div className="container mx-auto p-2">
        <h1 className="text-3xl font-bold mt-5">All Services</h1>
        {categories.map((category) => (
          <div key={category._id} className="my-20">
            <div className="w-full">
              <h2 className="my-5 font-semibold text-sky-700">
                {category.name}
              </h2>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {services
                  .filter((service) => service.category === category.name)
                  .map((service) => (
                    <ServiceCard key={service._id} service={service} />
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
