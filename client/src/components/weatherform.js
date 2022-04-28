const CountryForm = (props) =>{

    return (
        <form className="weather-form" onSubmit={props.getHolydays}>
            <input type="text" name="country" placeholder="Country"/>

            <button>Find</button>

        </form>

    )

};

export default CountryForm;