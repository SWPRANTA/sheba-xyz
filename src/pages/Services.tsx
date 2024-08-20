import Navbar from "../components/Navbar";
import ServiceCard from "../components/ServiceCArd";

export default function Services() {
  const categories = [
    {
      id: 1,
      name: "AC Repair Service",
    },
    {
      id: 2,
      name: "Appliance Service",
    },
    {
      id: 3,
      name: "Men's Care and Salon",
    },
    {
      id: 4,
      name: "Beauty and Wellness",
    },
    {
      id: 5,
      name: "Cleaning and Pest Control",
    },
  ];
  const services = [
    {
      _id: 1,
      name: "AC Installation",
      category: "AC Repair Service",
      details:
        "Professional AC installation service, including mounting and connection to the power supply.",
      image: "../../public/images/ac-repairing-1.jpg",
      attribute:
        "https://www.freepik.com/free-photo/trained-engineer-certified-technician-opening-up-old-faulty-hvac-system-replace-it-with-new-performant-outside-air-conditioner-after-draining-refrigerant-replacing-ductwork_77040197.htm#fromView=search&page=2&position=23&uuid=da4bd927-e307-4311-a6da-a6a91d0da655",
      attributeTitle: "Image by DC Studio on Freepik",
    },
    {
      _id: 2,
      name: "AC Gas Refill",
      category: "AC Repair Service",
      details:
        "Refilling of AC refrigerant gas to ensure efficient cooling and performance.",
      image: "../../public/images/ac-repairing-2.jpg",
      attribute:
        "https://www.freepik.com/free-photo/hvac-technician-working-capacitor-part-condensing-unit-male-worker-repairman-uniform-repairing-adjusting-conditioning-system-diagnosing-looking-technical-issues_10444775.htm#fromView=search&page=2&position=22&uuid=da4bd927-e307-4311-a6da-a6a91d0da655",
      attributeTitle: "Image by master1305 on Freepik",
    },
    {
      _id: 3,
      name: "AC Maintenance",
      category: "AC Repair Service",
      details:
        "Comprehensive AC maintenance including cleaning, filter replacement, and system checkup.",
      image: "../../public/images/ac-repairing-3.jpg",
      attribute:
        "https://www.vecteezy.com/free-photos/ac-repair",
      attributeTitle: "Ac Repair Stock photos by Vecteezy",
    },
    {
      _id: 4,
      name: "Washing Machine Repair",
      category: "Appliance Service",
      details:
        "Expert repair service for washing machines, including parts replacement and troubleshooting.",
      image: "../../public/images/washing-machine.jpg",
      attribute:
        "https://www.freepik.com/free-vector/realistic-kitchen-appliance_25724727.htm#fromView=search&page=1&position=0&uuid=98bf85e8-2e78-4b4e-a93d-c4ad0a9dd117",
      attributeTitle: "Image by pikisuperstar on Freepik",
    },
    {
      _id: 5,
      name: "Refrigerator Repair",
      category: "Appliance Service",
      details:
        "Quick and reliable repair service for refrigerators to keep your food fresh.",
      image: "../../public/images/fridge.jpg",
      attribute:
        "https://www.vecteezy.com/free-photos/refrigerator",
      attributeTitle: "Refrigerator Stock photos by Vecteezy",
    },
    {
      _id: 6,
      name: "Microwave Oven Repair",
      category: "Appliance Service",
      details:
        "Professional repair service for microwave ovens, including electrical and mechanical issues.",
      image: "../../public/images/microwave.jpg",
      attribute:
        "https://www.vecteezy.com/free-photos/oven",
      attributeTitle: "Oven Stock photos by Vecteezy",
    },
    {
      _id: 7,
      name: "Men's Haircut",
      category: "Men's Care and Salon",
      details:
        "Stylish and professional men's haircut services tailored to your preferences.",
      image: "../../public/images/men-hair-cut.jpg",
      attribute:
        "https://www.freepik.com/free-photo/young-man-barbershop-trimming-hair_12804095.htm#fromView=search&page=1&position=9&uuid=ea26bbb8-0830-4822-b6fe-dae05d1800e2",
      attributeTitle: "Image by senivpetro on Freepik",
    },
    {
      _id: 8,
      name: "Beard Grooming",
      category: "Men's Care and Salon",
      details:
        "Complete beard grooming services including trimming, shaping, and conditioning.",
      image: "../../public/images/beard-styling-cut-barber-shop.jpg",
      attribute:
        "https://www.freepik.com/free-photo/beard-styling-cut-barber-shop_5574617.htm#fromView=search&page=1&position=14&uuid=2967bb8b-c2ee-48cd-bdd2-c2183c306f00",
      attributeTitle: "Image by freepik",
    },
    {
      _id: 9,
      name: "Facial for Men",
      category: "Men's Care and Salon",
      details:
        "Rejuvenating facial treatments designed specifically for men's skin.",
      image: "../../public/images/men-spa.jpg",
      attribute:
        "https://www.freepik.com/free-ai-image/person-enjoying-scalp-massage-spa_181909308.htm#fromView=search&page=1&position=1&uuid=3474643c-95f3-4791-8fbc-94ccf98b2c33",
      attributeTitle: "Image by freepik",
    },
    {
      _id: 10,
      name: "Bridal Makeup",
      category: "Beauty and Wellness",
      details:
        "Exclusive bridal makeup services to make your special day even more memorable.",
      image: "../../public/images/bridal-makeup.jpg",
      attribute:
        "https://www.vecteezy.com/free-photos/bridal-makeup",
      attributeTitle: "Bridal Makeup Stock photos by Vecteezy",
    },
    {
      _id: 11,
      name: "Spa Treatment",
      category: "Beauty and Wellness",
      details: "Relaxing spa treatments including massages, facials, and more.",
      image: "../../public/images/beauty-1.jpg",
      attribute:
        "https://www.freepik.com/free-photo/makeup-artist-applying-makeup-by-brush_10896002.htm#fromView=search&page=1&position=14&uuid=9eab3c93-8809-47bc-8a67-e60ca4d40ebe",
      attributeTitle: "Image by gpointstudio on Freepik",
    },
    {
      _id: 12,
      name: "Manicure and Pedicure",
      category: "Beauty and Wellness",
      details:
        "Comprehensive manicure and pedicure services for well-groomed hands and feet.",
      image: "../../public/images/manicure-pedicure.jpg",
      attribute:
        "https://www.vecteezy.com/free-photos/manicure-pedicure",
      attributeTitle: "Manicure Pedicure Stock photos by Vecteezy",
    },
    {
      _id: 13,
      name: "Home Deep Cleaning",
      category: "Cleaning and Pest Control",
      details:
        "Thorough cleaning service for your entire home, ensuring a spotless living environment.",
      image: "../../public/images/disinfecting-home.jpg",
      attribute:
        "https://www.freepik.com/free-photo/disinfecting-home_8668283.htm#fromView=search&page=1&position=0&uuid=653084be-10eb-49f6-8fb5-40bacb9627aa",
      attributeTitle: "Image by master1305 on Freepik",
    },
    {
      _id: 14,
      name: "Pest Control Service",
      category: "Cleaning and Pest Control",
      details:
        "Effective pest control solutions to protect your home from insects and rodents.",
      image: "../../public/images/pest-control.jpg",
      attribute:
        "https://www.freepik.com/free-photo/unrecognizable-person-white-chemical-protection-suit-doing-disinfection-public-areas-stop-spreading-highly-contagious-corona-virus_11137291.htm#fromView=search&page=1&position=9&uuid=f9474323-8954-4dbe-952d-05ab9e5f9876",
      attributeTitle: "Image by aleksandarlittlewolf on Freepik",
    },
    {
      _id: 15,
      name: "Sofa Cleaning",
      category: "Cleaning and Pest Control",
      details:
        "Professional cleaning service for your sofa, removing dirt, stains, and allergens.",
      image: "../../public/images/sofa-cleaning.jpg",
      attribute: "",
      attributeTitle: "",
    },
  ];
  

  return (
    <div className="">
      <Navbar />
      <div className="container mx-auto p-2">
        <h1 className="text-3xl font-bold mt-5">All Services</h1>
        {categories.map((category) => (
          <div key={category.id} className="my-20">
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
