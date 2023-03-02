import React from "react";
import { useParams } from "react-router-dom";

const UserPage = ({ s }) => {
   const  {userId} = useParams()
   console.log(s)
  const dat = s.data.find(x => x.id.toString() === userId);
    return (
      <>
        <p>
          <strong>User Phone: </strong>
          {dat?.phone}
        </p>
        {/* <p>
          <strong>User Email: </strong>
          {dat?.email}

        </p> */}
        <p>
          <strong>User City: </strong>
          {dat?.address?.city}
        </p>
        <p>
          <strong>User Street: </strong>
          {dat?.address?.street}
        </p>
      </>
    );
  };
  export default UserPage;