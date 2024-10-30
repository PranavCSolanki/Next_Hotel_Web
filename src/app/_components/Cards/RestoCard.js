import PropTypes from 'prop-types';
import Link from "next/link";

const RestoCard = ({ name, city,id, email, contact, address }) => {

  return (
    <div className="max-w-96 m-10 mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <div className="relative h-28 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center pb-2 justify-center text-3xl font-bold text-purple-600 shadow-lg border-4 border-white transform transition-transform duration-300 ease-in-out hover:rotate-12">
              {name.charAt(0)} 
            </div>
            <h2 className="ml-4 text-2xl font-bold text-white drop-shadow-lg">{name}</h2>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-4 max-w-80 min-w-80">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center shadow-md">
            <svg
              className="w-6 h-6 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
          </div>
          <span className="text-gray-700">{city}</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shadow-md">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              ></path>
            </svg>
          </div>
          <span className="text-gray-700">{email}</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shadow-md">
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              ></path>
            </svg>
          </div>
          <span className="text-gray-700">{contact}</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center shadow-md">
            <svg
              className="w-6 h-6 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              ></path>
            </svg>
          </div>
          <span className="text-gray-700 flex-wrap">{address}</span>
        </div>
        <div className="flex justify-center mt-4">
          <Link href={`/explore/${id}?id=${name}`} className="relative p-2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-transform duration-300 ease-in-out">
            See More
          </Link>
        </div>
      </div>
    </div>
  );
};

RestoCard.propTypes = {
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    contact: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
};

export default RestoCard;
