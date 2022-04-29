const CountryForm = (props) =>{

  

    return (
        <form className="weather-form" onSubmit={props.getHolidays}>
            <input type="text" name="country" placeholder="Country"/>

            <button>Find</button>

        </form>

    )

};

export default CountryForm;