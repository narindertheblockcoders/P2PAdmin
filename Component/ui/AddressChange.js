import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";

function AddressChange() {
  const { address } = useAccount();

  useEffect(() => {
    setTimeout(() => {
      const getAddress = localStorage.getItem("address");
      if (address == getAddress) {
      } else {
        window.localStorage.removeItem("contentKey");
        window.location.href = "/";
        window.localStorage.clear();
      }
    }, 300);
  }, [address]);

  return <div></div>;
}

export default AddressChange;
