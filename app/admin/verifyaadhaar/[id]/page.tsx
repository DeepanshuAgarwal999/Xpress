"use client";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const VerifyAadhaar = () => {
  const  params  = useParams();
  const id = params?.id;
  const [user, setUser] = useState(null);
  const [aadhaarImgSrcFront, setAadhaarImgSrcFront] = useState(null);
  const [aadhaarImgSrcBack, setAadhaarImgSrcBack] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get(`/api/addaadhaar/${id}`);
        console.log("res", res);
        setUser(res.data);
        setAadhaarImgSrcFront(res.data.aadhaarImgSrcFront);
        setAadhaarImgSrcBack(res.data.aadhaarImgSrcBack);
      } catch (error) {
        alert(`Error! ${error}`);
      }
    }

    if (id) {
      fetchUser();
    }
  }, [id]);

  if (!id) {
    return <div>id not found</div>;
  }

  if (!user) {
    return <div>user not found</div>;
  }

  return (
    <div className="flex items-center gap-10 justify-center flex-wrap h-screen pt-20">
      <Image alt="'asd" src={`data:image/jpeg;base64,${aadhaarImgSrcFront}`} width={200} height={150} />
      <Image alt="'asd" src={`data:image/jpeg;base64,${aadhaarImgSrcBack}`} width={200} height={150} />
    </div>
  );
};

export default VerifyAadhaar;
