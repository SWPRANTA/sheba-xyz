import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";
import StaffAbout from "../components/StaffAbout";
import StaffReview from "../components/StaffReview";

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
      "Men's Haircut",
      "Pest Control Service",
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
const StaffDetails = () => {
  const { id } = useParams();
  const staff = staffs.find((staff) => staff._id === Number(id));
  const [tab, setTab] = useState("About");
  const handleTabChange = (tabName: string) => {
    if (tab !== tabName) {
      setTab(tabName);
    }
  };
  console.log(tab);

  if (!staff) {
    return <div>Staff not found</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-2">
        <div className="md:flex items-center mt-5 h-44">
          <div>
            <img
              src={staff.image}
              alt={staff.name}
              className="rounded-full w-32 h-32 shadow-md"
            />
          </div>
          <div className="md:ml-0 md:pl-5 mt-10">
            <h2 className="text-xl font-bold">{staff.name}</h2>
            <h3 className="text-sm text-gray-600">{staff.bio}</h3>
            <h4 className="text-sm text-gray-800">
              ৳ {Number(staff.rate).toLocaleString()}
            </h4>
          </div>
        </div>

        <div className="mt-5 pt-5 md:pt-0">
          <button
            onClick={() => handleTabChange("About")}
            className={`text-lg font-bold tracking-wide border-b-2 p-2 
              ${
                tab === "About" ? "text-sky-600 border-sky-600" : "text-sky-950"
              }
              hover:border-sky-600`}
          >
            About
          </button>
          <button
            onClick={() => handleTabChange("Review")}
            className={`text-lg font-bold tracking-wide border-b-2 p-2 ms-5 
              ${
                tab === "Review"
                  ? "text-sky-600 border-sky-600"
                  : "text-sky-950"
              }
              hover:border-sky-600`}
          >
            ratings & Reviews
          </button>
        </div>
      </div>
      {tab === "About" && <StaffAbout staff={staff} />}
      {tab === "Review" && <StaffReview />}
    </div>
  );
};

export default StaffDetails;
