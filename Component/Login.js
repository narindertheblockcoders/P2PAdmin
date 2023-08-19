import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { CustomizeConnectButton } from "../Component/ui/ConnectButton";
import { useAccount, useNetwork, useSwitchNetwork, useDisconnect } from "wagmi";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useRouter } from "next/router";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import dynamic from "next/dynamic";

import { ToastContainer }from "react-bootstrap";
import { Modal as Modal2 } from "@nextui-org/react";
import { ethers } from "ethers";

let signer; // Declare signer variable

function Login() {
  console.log("double");
  // const dataFetchedRef = useRef(false);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [show01, setShow01] = useState(false);
  const [show04, setShow04] = useState(false);
  const [message, setMessage] = useState();
  const [p2ptotrx, setP2pToTrx] = useState();
  const [p2ptoUsdt, setP2ptoUsdt] = useState();
  const [step, setStep] = useState();
  const [referral, setReferral] = useState();
  const [key, setKey] = useState();
  const [open, setOpen] = useState(false);
  const [tx, setTx] = useState(false);
  const [oneTimeMessage, setOnwTimeMessage] = useState();

  const [code1, setCode1] = useState();
  const [code2, setCode2] = useState();
  const [code3, setCode3] = useState();
  const [code4, setCode4] = useState();
  const [code5, setCode5] = useState();
  const [code6, setCode6] = useState();
  const num1 = useRef();
  const num2 = useRef();
  const num3 = useRef();
  const num4 = useRef();
  const num5 = useRef();
  const num6 = useRef();
  const num7 = useRef();
  const [codeError, setCodeError] = useState(false);
  const [lengthError, setLengthError] = useState(false);
  const [faStatus, setFaStatus] = useState(0);
  const [show02, setShow02] = useState(false);
  const dataFetchedRef = useRef(false);

  const { disconnect } = useDisconnect({
    onSuccess(data) {},
  });

  const { address } = useAccount();

  const { chain } = useNetwork();

  const router = useRouter();

  const signMessage = async (message) => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner(); // Assign value to the signer variable
    } else {
      console.error("Ethereum provider not found");
    }
    const hash = ethers.utils.hashMessage(ethers.utils.toUtf8Bytes(message));
    const signature = await signer.signMessage(hash); // Use the signer variable to sign the message
    console.log(signature, "signature1");
    if (signature) {
      formSubmitHandler();
    } else {
      setShow04(true);
      console.log("first111");
    }
  };

  const handleSignMessage = async () => {
    try {
      console.log("signation sign Message");
      const message = "Hello, World!";
      setOnwTimeMessage(message);
      await signMessage(message); // Call the signMessage function
      // await formSubmitHandler();
      return;
    } catch (error) {
      console.error("Error signing message:", error);
      setShow04(true);
    }
  };

  const contractAddress = "TJ9TxoG9xwtLfDgoRPQnt11EwSUGQvWeff";

  async function verifyQrCode(data) {
    setOpen(true);
    try {
      const token = localStorage.getItem("token");
      let res = await axios.post("/api/loginVerifyFa", data);
      const response = res.data.data.data.token;
      localStorage.setItem("token", response);

      console.log(response, "data from api");
      router.push("/dashboard");
    } catch (err) {
      setCodeError(true);
      setOpen(false);
      console.log(err,"data from api")
    }
  }

  async function verifySubmitHandler(fullCode) {
    setOpen(true);
    console.log(address, "to send to api");
    console.log(fullCode, "fullCode");
    const data = {
      otp: fullCode,
      address: address,
    };
    console.log(data, "to send to api ");
    verifyQrCode(data);
  }

  function handleChangeFn1(e) {
    setCode1(e.target.value);
    num2.current.focus();
    const fullCode = `${e.target.value}${code2}${code3}${code4}${code5}${code6}`;
    if (e.target.value != NaN) {
      setCodeError(false);
    }
    if (fullCode.length === 6) {
      setLengthError(false);
      verifySubmitHandler(fullCode);
    } else {
      setLengthError(true);
    }
  }

  function handleChangeFn2(e) {
    setCode2(e.target.value);
    num3.current.focus();
    const fullCode = `${code1}${e.target.value}${code3}${code4}${code5}${code6}`;
    if (e.target.value != NaN) {
      setCodeError(false);
    }
    if (fullCode.length === 6) {
      setLengthError(false);
      verifySubmitHandler(fullCode);
    } else {
      setLengthError(true);
    }
  }

  function handleChangeFn3(e) {
    setCode3(e.target.value);
    num4.current.focus();
    const fullCode = `${code1}${code2}${e.target.value}${code4}${code5}${code6}`;
    if (e.target.value != NaN) {
      setCodeError(false);
    }
    if (fullCode.length === 6) {
      setLengthError(false);
      verifySubmitHandler(fullCode);
    } else {
      setLengthError(true);
    }
  }

  function handleChangeFn4(e) {
    setCode4(e.target.value);
    num5.current.focus();
    const fullCode = `${code1}${code2}${code3}${e.target.value}${code5}${code6}`;
    if (e.target.value != NaN) {
      setCodeError(false);
    }
    if (fullCode.length === 6) {
      setLengthError(false);
      verifySubmitHandler(fullCode);
    } else {
      setLengthError(true);
    }
  }

  function handleChangeFn5(e) {
    setCode5(e.target.value);
    num6.current.focus();

    const fullCode = `${code1}${code2}${code3}${code4}${e.target.value}${code6}`;
    if (e.target.value != NaN) {
      setCodeError(false);
    }
    if (fullCode.length === 6) {
      setLengthError(false);
      verifySubmitHandler(fullCode);
    } else {
      setLengthError(true);
    }
  }

  function handleChangeFn6(e) {
    setCode6(e.target.value);
    num6.current.blur();
    const fullCode = `${code1}${code2}${code3}${code4}${code5}${e.target.value}`;
    if (e.target.value != NaN) {
      setCodeError(false);
    }
    if (fullCode.length === 6) {
      setLengthError(false);
      verifySubmitHandler(fullCode);
    } else {
      setLengthError(true);
    }
  }

  async function read() {
    if (
      typeof window !== "undefined" &&
      window.tronWeb &&
      window.tronWeb.ready
    ) {
      const tronWeb = window?.tronWeb;
      if (tronWeb.defaultAddress && tronWeb.defaultAddress.base58) {
        const address = tronWeb?.defaultAddress?.base58;
        console.log(address, "address");
        const tronContract = await tronWeb?.contract()?.at(contractAddress);
        const tx = await tronContract?.requested(address).call();
        if (tx == true) {
          setTx(true);
        } else {
          setTx(false);
        }
      }
    }
  }

  useEffect(() => {
    read();
  }, []);

  useEffect(() => {
    console.log(address, faStatus, "addres is here");
    // if (dataFetchedRef.current) return;
    // dataFetchedRef.current = true;

    setTimeout(() => {
      try {
        if (address) {
          console.log(address, "signation addreesss");
          localStorage.setItem("address", address);
          handleSignMessage();
          return;
        }
      } catch (err) {}
    }, 100);
  }, [address]);

  async function createAccount() {
    if (chain?.id == 137) {
      50 % router.push("/getStarted");
    } else {
      await switchNetwork?.(137);
    }
  }

  async function walletCheck(data) {
    // if (dataFetchedRef.current) return;
    // dataFetchedRef.current = true;

    console.log(data, "data send for walletCheck");
    setOpen(true);
    try {
      let res = await axios.post("/api/login/walletCheck", data);
      const response = res.data;
      console.log(
        response.data.data.fa,
        "to get response from api to get fa status"
      );
      setFaStatus(response.data.data.fa);
      // if(response.data.data.fa == 1){
      //   setShow02(true);
      // }
      onBoardingSumbitHandler();
      localStorage.setItem("step", response.data.data.action);
      localStorage.setItem("key", response.data.data.key);
      localStorage.setItem("referral", response.data.data.referral);
      setStep(response.data.data.action);

      const tokenData = response.data.data.token;
      localStorage.setItem("token", tokenData);

      const message = response.data.message;
      setMessage(response.data.message);

      if (
        response.data.data.id &&
        response.data.data.key &&
        response.data.data.proof
      ) {
        setOpen(true);
        router.push("/swapping1");
        return;
      }
console.log(message,"message here")
      // if (message == "1") {
      //   setShow3(false);
      //   setShow2(false);
      //   setShow(true);
      //   setShow4(false);
      //   setShow02(false);
      // }
      // if (message == "2") {
      //   setShow2(false);
      //   setShow(false);
      //   setShow3(true);
      //   setShow4(false);
      //   setShow02(false);
      // }
      // if (message == "5") {
      //   router.push("/stakeAddData")
      //   setShow(false);
      //   setShow2(false);
      //   setShow3(false);
      //   setShow4(false);
      //   setShow02(true);
      // }
      if (message == "3" || message == "2" || message == "4" ) {
        setShow(false);
        setShow2(true);
        setShow3(false);
        setShow4(false);
        setShow02(false);
      }

      // if (message == "4") {
      //   setShow3(false);
      //   setShow2(false);
      //   setShow(false);
      //   setShow4(true);
      //   setShow02(false);
      // }
      setOpen(false);
    } catch (err) {
      setOpen(false);
    }
  }

  async function formSubmitHandler() {
    if (!address) {
      return;
    }
    const data = {
      address: address,
    };

    console.log(data, "data check for use");

    walletCheck(data);
  }

  async function onBoarding(data) {
    try {
      let res = await axios.post("/api/addOnBoarding", data);
      console.log(res);
      const response = res.data;
      console.log(response.data, "addOnBoarding");
    } catch (err) {
      console.log(err, "errorr");
    }
  }

  async function onBoardingSumbitHandler() {
    console.log("first testing");
    const data = {
      address: localStorage.getItem("address"),
    };
    console.log(data, "first");

    onBoarding(data);
  }

  async function backFn() {
    setShow(false);
    setShow2(false);
    setShow3(false);
    setShow4(false);
    window.location.href = "/";
    window.localStorage.clear();
    disconnect();
  }

  async function stepFn(event) {
    event.preventDefault();

    if (step == 1) {
      router.push("/tabs");
    }
    if (step == 2) {
      router.push("/tabsLink");
    }
    if (step == 3) {
      router.push("/tabsLink");
    }
  }

  async function modalClose(e) {
    e.preventDefault();
    setShow(false);
    setShow2(false);
    setShow3(false);
    setShow4(false);
    disconnect();
  }

  // async function getFaceStatus(data) {
  //   try {
  //     let res = await axios.post("/api/getFaceStatus", data);
  //     const response = res.data;

  //     if (response.data.data.status == "true") {
  //       router.push("/OpenCameraForUpdate");
  //     } else {
  //       router.push("/dashboard");
  //     }
  //   } catch (err) {}
  // }

  // async function getFaceStatusHandler() {
  //   const data = {
  //     address: address,
  //   };
  //   getFaceStatus(data);
  // }

  async function gotoMigratePage() {
    setOpen(true);
    console.log("first");
    if (
      typeof window !== "undefined" &&
      window.tronWeb &&
      window.tronWeb.ready
    ) {
      const tronWeb = window?.tronWeb;
      const address = tronWeb?.defaultAddress?.base58;
      router.push("/swapping");
    } else {
      setShow01(true);
      setOpen(false);
      return;
    }
  }

  async function okSubmitHandler() {
    setShow01(false);
  }

  console.log(faStatus, message, "fa&message");

  async function closeHandler() {
    setOpen(true);
    window.localStorage.clear();
    window.location.reload(false);
    setShow02(false);
    return;
  }

  return (
    <div>
      {/* <Backdrop
        sx={{ color: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop> */}
         <section className="abcsdsd">
        <ToastContainer />
        <section class="p2p-hero">
          <div class="container">
            <div class="p2p-herobox">
              <nav class="navbar navbar-dark fixed-top" id="p2p-nav">
                <div class="container-fluid">
                  <a class="navbar-brand" href="#">
                    {" "}
                    <img src="/p2p.help_logo-01.svg" alt="" />
                  </a>
                </div>
              </nav>

              <div class="p2p-home">
                <div class="denet">
                  <h2>Welcome to DeNet</h2>
                  <p>A NEW AGE OF NETWORK MARKETING</p>
                  <CustomizeConnectButton />
                  {/* {!tx ? (
                    <button
                      className="connect-wallet"
                      onClick={() => gotoMigratePage()}
                    >
                      Migrate Data
                    </button>
                  ) : null} */}

                       {/* Go to Dashboard */}
                       <Modal
                    show={show2}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                  >
                    <div className="modal-content" id="connect-content">
                      <div className="close-div">
                        <img
                          onClick={(e) => modalClose(e)}
                          className="modal-close"
                          src="/close.png"
                          alt=""
                        />
                      </div>
                      <div className="modal-body" id="connect-body">
                        <div className="connect-icon">
                          <img src="/tronNew.png" alt="" />
                        </div>
                        <p className="p2p-email" style={{ color: "white" }}>
                          {address}
                        </p>
                        <h6 style={{ textAlign: "center" }}>Hi There !</h6>
                        <div className="create-some">
                          <p className="some-text">
                            This wallet is linked with an account.
                            <br />
                            Click below to access the account.
                          </p>
                        </div>
                      </div>
                      <div className="modal-footer" id="connect-footer">
                        <Link href="/staking">
                          <button
                            type="button"
                            // onClick={() => getFaceStatusHandler()}
                            className="connect-wallet"
                          >
                            Go to Dashboard
                          </button>
                        </Link>
                      </div>
                    </div>
                  </Modal>

               
          
                  {/* Footer */}
                  <div class="p2p-mouse">
                    <a class="mouse-scroll" href="#">
                      <span class="mouse">
                        <span class="mouse-movement"></span>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      
        <footer class="p2p-footer">
          <div class="container">
            <div class="p2pfoot-box">
              <a class="foot-a">
                {" "}
                <img src="/p2p.help_logo-01.svg" alt="" />
              </a>
              <div className="footer-elements">
                <p>
                  Copyright © P2P Help 2019 <span>All rights reserved.</span>
                </p>
                <div className="foot-link">
                  <a class="foot-link1" href="/terms">
                    Terms of Use{" "}
                  </a>{" "}
                  |{" "}
                  <a href="/privacy" class="foot-link1">
                    Privacy Policy
                  </a>{" "}
                  |
                  <a class="foot-link1" href="/cookies">
                    {" "}
                    Use of Cookies
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </section>

    </div>
      );
}
export default dynamic(() => Promise.resolve(Login), { ssr: false });
