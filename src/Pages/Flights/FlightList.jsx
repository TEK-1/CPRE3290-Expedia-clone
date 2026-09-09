import React, { useEffect, useState } from "react";
import axios from "axios";
import FlightCard from "./FlightCard";

const priceRanges = {
  "200": [0, 200],
  "400": [200, 400],
  "600": [400, 600],
  "1000": [0, 999999], // default/top bracket shows everything for now
};

const getData = async (origin, destination, priceValue) => {
  const res = await axios.get(`http://localhost:8080/flight`);
  let data = res.data;

  if (origin) {
    data = data.filter((f) => f.from?.toUpperCase() === origin.toUpperCase());
  }
  if (destination) {
    data = data.filter((f) => f.to?.toUpperCase() === destination.toUpperCase());
  }

  const [min, max] = priceRanges[priceValue] || [0, 999999];
  data = data.filter((f) => Number(f.price) >= min && Number(f.price) <= max);

  return data;
};

export default function FlightList({ origin, destination, date, priceValue }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData(origin, destination, priceValue)
      .then((res) => setData(res))
      .catch((err) => {
        console.log(err);
        setData([]);
      });
  }, [origin, destination, date, priceValue]);

  return (
    <div>
      {data.length > 0 &&
        data.map((item) => (
          <div key={item.id}>
            <FlightCard data={item} />
          </div>
        ))}
    </div>
  );
}

// import React, { useEffect } from "react";
// import axios from "axios";
// import FlightCard from "./FlightCard";

// const getData = async (page, priceValue) => {
//   let res = await axios.get(
//     `https://makemytrip-api-data.onrender.com/flight?_page=${page}&_limit=5?&price_gte=${
//       priceValue - 2000
//     }&price_lte=${priceValue}`
//   );
//   return res.data;
// };

// export default function FlightList({ page, priceValue }) {
//   const [data, setData] = React.useState([]);

//   useEffect(() => {
//     getData(page, priceValue).then((res) => {
//       setData(res);
//     });
//   }, [page, priceValue]);

//   return (
//     <div>
//       {data.length > 0 &&
//         data.map((item) => {
//           return (
//             <div key={item.id}>
//               <FlightCard data={item} />
//             </div>
//           );
//         })}
//     </div>
//   );
// }
