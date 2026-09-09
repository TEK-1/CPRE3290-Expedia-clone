import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Flights from './Flight';
import SideBar from './SideBar';

const FlightData = () => {
  const [searchParams] = useSearchParams();

  const origin = searchParams.get("from") || "";
  const destination = searchParams.get("to") || "";
  const date = searchParams.get("date") || "";

  return (
    <div>
      <Flights />
      <SideBar origin={origin} destination={destination} date={date} />
    </div>
  );
};

export default FlightData;