"use client";

import { useState, useEffect } from "react";
import Select from "react-select";
import RestoCard from "./Cards/RestoCard";

const Banner = () => {
  const [cities, setCities] = useState([]);
  const [data, setData] = useState([]);
  const [location, setLocation] = useState("");
  const [restorent, setRestorent] = useState("");

  const Getdata = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/customer?loaction=${location}&name=${restorent}`,
        {
          cache: "no-store",
        }
      );
      const result = await response.json();
      setData(result.data);
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/customer/location`,
        {
          cache: "no-store",
        }
      );
      const result = await response.json();

      if (response.status === 200) {
        setCities(result.data);
        
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  useEffect(() => {
    Getdata();
  }, [location, restorent]);

  const handleCityChange = (selectedOption) => {
    setLocation(selectedOption.value);
  };

  const cityOptions = cities.map((city) => ({
    value: city,
    label: city,
  }));

  return (
    <div className="font-sans pt-2">
      <section className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <h1 className="text-center text-4xl font-bold leading-10 tracking-tight text-gray-900 sm:text-5xl sm:leading-12">
            Food Delivery App
          </h1>
          <figure className="mt-10">
            <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
              <div className="mb-4 flex flex-col sm:flex-row">
                <div className="px-4 mb-4 sm:mb-0">
                  <Select
                    className="min-w-60 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="location"
                    options={cityOptions}
                    placeholder="Select City"
                    onChange={handleCityChange}
                    value={cityOptions.find(
                      (option) => option.value === location
                    )}
                  />
                </div>
                <input
                  className="shadow appearance-none border rounded w-full sm:mx-5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="search"
                  type="text"
                  placeholder="Enter Restaurant and Food"
                  value={restorent}
                  onChange={(e) => setRestorent(e.target.value)}
                />
                <button
                  className="border-2 border-black p-4 rounded-xl hover:border-fuchsia-200 hover:text-3xl"
                  onClick={Getdata}
                >
                  Search
                </button>
              </div>
            </blockquote>
          </figure>
        </div>
      </section>
      <div className="m-10 ">
        <div className="flex flex-wrap justify-evenly ">
          {data.map((item) => (
            
            <RestoCard
              id={item._id}
              key={item._id}
              name={item.name}
              city={item.city}
              email={item.email}
              contact={item.contact}
              address={item.address}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;


