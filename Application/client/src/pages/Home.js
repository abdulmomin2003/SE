import { useEffect, useState } from "react";
import { getFacilities } from "../api/facilities";

const Home = () => {
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    getFacilities()
      .then(setFacilities)
      .catch((error) => alert(error.message));
  }, []);

  return (
    <div>
      <h1>Available Facilities</h1>
      {facilities.map((facility) => (
        <div key={facility._id}>
          <h2>{facility.name}</h2>
          <p>{facility.location}</p>
        </div>
      ))}
    </div>
  );
};
