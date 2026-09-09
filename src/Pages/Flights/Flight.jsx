import { useState } from "react";
import React from "react";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "./homePage.css";
import styles from "../Stay/Stay.module.css";

const initialState = {
  from: "",
  to: "",
  passenger: 1,
  departureDate: "",
  returnDate: "",
};

export default function Flights() {
  const [PassengerData, setPassengerData] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPassengerData({ ...PassengerData, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    const params = new URLSearchParams({
      from: PassengerData.from,
      to: PassengerData.to,
      date: PassengerData.departureDate,
      passenger: PassengerData.passenger,
    });
    navigate(`/flight?${params.toString()}`);
  };

  const swapValuehandler = () => {
    setPassengerData({
      ...PassengerData,
      from: PassengerData.to,
      to: PassengerData.from,
    });
  };

  return (
    <div>
      <div className="homeTop" style={{ marginBottom: "100px" }}>
        <div className="homeTopCard">
          <div className="secondHeader"></div>
          <div className="homeInputBx">
            <div>
              <div className="homeInputs">
                <input name="type" type="radio" id="inputs" />
                <label htmlFor="inputs">ONE WAY</label>
              </div>
              <div className="homeInputs">
                <input name="type" type="radio" id="inputs2" />
                <label htmlFor="inputs2">ROUND TRIP</label>
              </div>
              <div className="homeInputs">
                <input name="type" type="radio" id="inputs3" />
                <label htmlFor="inputs3">MULTI CITY</label>
              </div>
            </div>
          </div>

          <div className="homeMainSearchInput">
            <div className="MainSearchinputBx">
              <span>FROM</span>
              <select
                name="from"
                id="from"
                style={{ width: "200px" }}
                value={PassengerData.from}
                onChange={handleChange}
              >
                <option value="From">From</option>
                <option value="DES MOINES">DES MOINES</option>
                <option value="CHICAGO">CHICAGO</option>
                <option value="SAN FRANCISCO">SAN FRANCISCO</option>
                <option value="BOSTON">BOSTON</option>
                <option value="MINNEAPOLIS">MINNEAPOLIS</option>
              </select>
              <button onClick={swapValuehandler}>
                <i className="fa fa-exchange"></i>
              </button>
            </div>

            <div className="MainSearchinputBx">
              <span>TO</span>
              <select
                name="to"
                id="fromto"
                style={{ width: "200px" }}
                value={PassengerData.to}
                onChange={handleChange}
              >
                <option value="To">To</option>
                <option value="DES MOINES">DES MOINES</option>
                <option value="CHICAGO">CHICAGO</option>
                <option value="SAN FRANCISCO">SAN FRANCISCO</option>
                <option value="BOSTON">BOSTON</option>
                <option value="MINNEAPOLIS">MINNEAPOLIS</option>
              </select>
            </div>

            <div className="MainSearchinputBx">
              <span>DEPARTURE</span>
              <input
                type="date"
                name="departureDate"
                value={PassengerData.departureDate}
                onChange={handleChange}
              />
            </div>

            <div className="MainSearchinputBx">
              <span>RETURN</span>
              <input
                type="date"
                name="returnDate"
                value={PassengerData.returnDate}
                onChange={handleChange}
              />
            </div>

            <div className="MainSearchinputBx">
              <span>TRAVELLERS & CLASS</span>
              <input
                type="number"
                value={PassengerData.passenger}
                onChange={handleChange}
                name="passenger"
              />
            </div>
          </div>

          <div className="homeSearchButtonBx">
            <Button
              colorScheme="blue"
              size="lg"
              className={styles["SearchBtn1"]}
              style={{ margin: "auto" }}
              onClick={handleClick}
            >
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}