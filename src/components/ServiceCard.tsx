import React from "react";
import { Link } from "react-router-dom";

interface Service {
  _id: number;
  name: string;
  category: string;
  details: string;
  image: string;
  attribute: string;
  attributeTitle: string;
}

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <Link
      to={`/service-details/${service._id}`}
      className="hover:shadow-lg relative"
    >
      <div className="relative">
        <img
          src={service.image}
          alt={service.name}
          className="max-w-40 max-h-28 rounded-md mx-auto shadow-sm"
        />
        <a href={service.attribute} className="absolute bottom-1 right-2 text-white text-xs">{service.attributeTitle}</a>
      </div>
      <h3 className="text-center w-3/4 mx-auto mt-3">{service.name}</h3>
    </Link>
  );
};

export default ServiceCard;
