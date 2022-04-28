import CountryForm from "./weatherform";
import { useState } from "react";
import Days from "./singleday";


const Holidays = () =>{

    const [holidays, setHolidays] = useState(null);


    const getHolidays = (e) =>{
        e.preventDefault();
        let country = e.target.elements.country.value;
        console.log("Line 13 front", country);
        // add to request body
        fetch(`/api/holidays?country=${country}`, {
            method: "get",
            headers: {"Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
            setHolidays(data.response.holidays);
            console.log("Line 23 front", data.response.holidays);
        })
        .catch((err) => console.error(`Error: ${err}`));
    }

    return(
        <div>
         <h2>Find your Holydays</h2>
        <CountryForm getHolidays={getHolidays} />
        {!holidays ? (<p>Please search for your holidays</p>) : (<Days days={holidays}/>)}
        </div>
    )

}

export default Holidays;