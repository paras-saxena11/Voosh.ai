import React, { useEffect, useState } from "react";
import { useGetorderMutation } from "../slices/userSlice";

const GetOrders = () => {
  const [data, setData] = useState([]);
  const [getOrder] = useGetorderMutation();
  useEffect(() => {
    async function fetchData() {
      const res = await getOrder().unwrap();
      setData(res);
    }
    fetchData();
  }, [setData, getOrder]);
  return (
    <>
      <div>
        <h1>Orders details of User Logged in: </h1>
        {data.map((item) => (
          <>
            <div>Phone Number : {item.phonenumber}</div>
            <div>Sub Total : {item.subtotal}</div>
          </>
        ))}
      </div>
    </>
  );
};

export default GetOrders;
