const Days = ({days}) => {

    return (
        <div>
            {days.map((day, index) => 
                <p key={index}>{day.name}</p>
            )}
        </div>
    );
    
  };
  
  export default Days;