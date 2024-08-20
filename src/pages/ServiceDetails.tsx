import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import StaffMiniCard from "../components/StaffMiniCard";
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
    attribute: "https://www.vecteezy.com/free-photos/ac-repair",
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
    attribute: "https://www.vecteezy.com/free-photos/refrigerator",
    attributeTitle: "Refrigerator Stock photos by Vecteezy",
  },
  {
    _id: 6,
    name: "Microwave Oven Repair",
    category: "Appliance Service",
    details:
      "Professional repair service for microwave ovens, including electrical and mechanical issues.",
    image: "../../public/images/microwave.jpg",
    attribute: "https://www.vecteezy.com/free-photos/oven",
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
    attribute: "https://www.vecteezy.com/free-photos/bridal-makeup",
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
    attribute: "https://www.vecteezy.com/free-photos/manicure-pedicure",
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

const staffs = [
  {
    _id: 146,
    name: "Rafiq Ahmed",
    bio: "Expert in home appliance repair with 12 years of experience.",
    description:
      "I specialize in repairing various home appliances including refrigerators, washing machines, and microwaves. My goal is to provide quick and reliable service to keep your home running smoothly.",
    location: "Banani, Dhaka",
    rate: "1200",
    services: [
      "Refrigerator Repair",
      "Washing Machine Repair",
      "Microwave Oven Repair",
    ],
    image: "../../public/images/staffs/person-1.jpg",
  },
  {
    _id: 147,
    name: "Mariam Akhter",
    bio: "Professional beautician with a passion for skincare.",
    description:
      "I have been in the beauty industry for 8 years, specializing in skincare and wellness treatments. My services include facials, manicures, pedicures, and more to help you feel your best.",
    location: "Dhanmondi, Dhaka",
    rate: "1800",
    services: ["Facial for Men", "Manicure and Pedicure", "Spa Treatment"],
    image: "../../public/images/staffs/woman-1.jpg",
  },
  {
    _id: 148,
    name: "Kamrul Hasan",
    bio: "Certified pest control expert with over 7 years of experience.",
    description:
      "I provide effective pest control solutions for homes and offices. My services include comprehensive pest inspections, treatment, and prevention to ensure a pest-free environment.",
    location: "Uttara, Dhaka",
    rate: "1000",
    services: ["Home Deep Cleaning", "Pest Control Service", "Sofa Cleaning"],
    image: "../../public/images/staffs/person-2.jpg",
  },
  {
    _id: 149,
    name: "Shirin Akter",
    bio: "Experienced hair stylist and makeup artist.",
    description:
      "With 15 years of experience in the beauty and wellness industry, I offer a range of services including bridal makeup, hair styling, and more. My aim is to enhance your natural beauty and make you feel confident.",
    location: "Bashundhara, Dhaka",
    rate: "2500",
    services: ["Bridal Makeup", "Men's Haircut", "Beard Grooming"],
    image: "../../public/images/staffs/woman-2.jpg",
  },
  {
    _id: 150,
    name: "Salman Hossain",
    bio: "AC installation and maintenance specialist.",
    description:
      "I have over 10 years of experience in installing and maintaining AC units. My services include installation, gas refilling, and regular maintenance to ensure optimal performance of your AC.",
    location: "Mirpur, Dhaka",
    rate: "1500",
    services: ["AC Installation", "AC Gas Refill", "AC Maintenance"],
    image: "../../public/images/staffs/person-3.jpg",
  },
  {
    _id: 151,
    name: "Rashidul Islam",
    bio: "Home cleaning and pest control expert.",
    description:
      "I provide deep cleaning services for homes and specialize in pest control. My goal is to ensure your living space is clean and free from pests.",
    location: "Mohammadpur, Dhaka",
    rate: "900",
    services: ["Home Deep Cleaning", "Pest Control Service", "Sofa Cleaning"],
    image: "../../public/images/staffs/person-4.jpg",
  },
  {
    _id: 152,
    name: "Sadia Rahman",
    bio: "Experienced beautician and wellness expert.",
    description:
      "I have been working in the beauty industry for over 12 years, offering a wide range of services including bridal makeup, spa treatments, and more. I aim to provide a relaxing and rejuvenating experience for all my clients.",
    location: "Baridhara, Dhaka",
    rate: "2300",
    services: ["Bridal Makeup", "Facial for Men", "Spa Treatment"],
    image: "../../public/images/staffs/woman-3.jpg",
  },
  {
    _id: 153,
    name: "Nabil Ahmed",
    bio: "AC repair and maintenance technician.",
    description:
      "Specializing in AC repair and maintenance for over 8 years, I ensure that your AC units are always in top condition. I provide gas refilling, maintenance checks, and installation services.",
    location: "Banasree, Dhaka",
    rate: "1400",
    services: ["AC Installation", "AC Gas Refill", "AC Maintenance"],
    image: "../../public/images/staffs/person-5.jpg",
  },
  {
    _id: 154,
    name: "Farhana Islam",
    bio: "Skilled beautician specializing in hair and makeup.",
    description:
      "With a passion for beauty, I have been providing hair and makeup services for over 10 years. Whether it's a simple haircut or an elaborate bridal makeup, I ensure my clients look their best.",
    location: "Gulshan, Dhaka",
    rate: "2600",
    services: ["Men's Haircut", "Beard Grooming", "Bridal Makeup"],
    image: "../../public/images/staffs/woman-4.jpg",
  },
  {
    _id: 155,
    name: "Aminul Haque",
    bio: "Appliance repair technician with a focus on kitchen appliances.",
    description:
      "I have been repairing kitchen appliances like microwaves and refrigerators for over 6 years. My services are quick, reliable, and affordable, ensuring your appliances are up and running in no time.",
    location: "Tejgaon, Dhaka",
    rate: "1100",
    services: [
      "Microwave Oven Repair",
      "Refrigerator Repair",
      "Washing Machine Repair",
    ],
    image: "../../public/images/staffs/person-6.jpg",
  },
];

export default function ServiceDetails() {
  const { id } = useParams();
  const service = services.find((service) => service._id == Number(id));
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-2">
        <h1 className="text-lg lg:text-2xl font-bold my-3 lg:my-4">
          {service?.name}
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="w-full py-2">
            <img
              src={service?.image}
              alt={service?.name}
              className="rounded-lg shadow-lg mx-auto max-w-full max-h-64"
            />

            <h2 className="mt-5 py-2 font-bold">Description</h2>
            <h2 className="text-justify">{service?.details}</h2>
          </div>
          <div>
            <h2 className="py-2 font-bold">Service Providers</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-5">
              {staffs
                .filter(
                  (staff) =>
                    service?.name && staff.services.includes(service.name)
                )
                .map((staff) => (
                  <StaffMiniCard key={staff._id} staff={staff} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
