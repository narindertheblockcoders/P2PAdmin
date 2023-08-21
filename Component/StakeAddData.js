import React, { useRef } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import $ from "jquery";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { useAccount, useDisconnect, useContractWrite } from "wagmi";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Tooltip } from "@nextui-org/react";
import ContractInterface from "../old-staking-contract.json";
import { parseEther } from "viem";
import { Modal, Button, Table } from "@nextui-org/react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
// import { BigNumber } from "@ethersproject/bignumber";
export default function StakeAddData() {
  // let userAddress;
  const [userId, setUserId] = useState();
  const [contractAddress, setcontractAddressAddress] = useState();
  const [userAddress, setuserAddress] = useState();
  const [tokenStaked, setTokenStaked] = useState("");
  const [stakedTime, setstakedTime] = useState();
  const [claimTime, setClaimTime] = useState();
  const [open, setOpen] = useState(false);
  const [mobileError, setMobileError] = useState(false);
  const [emailError, setEmailError] = useState();
  const [getAddress, setGetAddress] = useState();
  const [stakeData, setStakeData] = useState();
  const [show4, setShow4] = useState(false);

  const router = useRouter();
  const { address } = useAccount();

  const { disconnect } = useDisconnect();
  const prefix = address?.substring(0, 4);
  const suffix = address?.substring(address.length - 4);
  const maskedStr = `${prefix}${"*****"}${suffix}`;
  // userAddress = maskedStr;

  // const userAddress = contractAddress
  const _amount = tokenStaked;
  const timeInvested = stakedTime;

  console.log(
    userId,
    userAddress,
    parseEther(`${_amount}`),
    new Date(timeInvested)?.getTime() / 1000,
    new Date(claimTime)?.getTime() / 1000,
    "first"
  );

  const contract = stakeData?.contractAddress;
  const { write: write } = useContractWrite({
    mode: "args",
    address: contract,
    abi: ContractInterface,
    functionName: "UpdateStake",
    overrides: {
      gasLimit: 8000000,
    },
    args: [
      userId,
      userAddress,
      parseEther(`${_amount}`),
      new Date(timeInvested)?.getTime() / 1000,
      new Date(claimTime)?.getTime() / 1000,
    ],
  
    onError(error) {
      console.log(error, "error stake");
      // setOpen(false);
    },
    async onSuccess(data) {
      setOpen(true);
      // setShow(false);
      console.log(data, "data");
      let tx = await data.wait();
      console.log(tx, "tx");
      setOpen(false);
      setShow4(true);
      // getData();
    },
  });

  async function jQueryFunction() {
    $(document).on("click", "ul li", function () {
      $(this).addClass("active").siblings().removeClass("active");
    });
  }

  async function stakingData() {
    try {
      // const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      console.log(userId, "userId here");

      let res = await axios.post("/api/addDataId", {
        userId: userId,
      });
      const response = res.data.data.data;
      setStakeData(response);
      console.log(response, "add data status");

      const prefix = response?.contractAddress.substring(0, 4);

      const suffix = response?.contractAddress.substring(
        response?.contractAddress.length - 4
      );

      const maskedStr = `${prefix}${"*****"}${suffix}`;
      setGetAddress(maskedStr);
    } catch (err) {
      console.log(err, "error ehre");
    }
  }

  useEffect(() => {
    jQueryFunction();
    // getPersonalProfile();
    stakingData();
  }, []);

  console.log(getAddress, "getAddress");

  async function formSubmitHandler() {
    // setEmailError(true);
    // setMobileError(true);

    const data = {
      contractAddress: contractAddress,
      tokenStaked: tokenStaked,
      stakedTime: stakedTime,
      claimTime: claimTime,
    };

    console.log(data, "form data here");
    // updatePersonalProfile(data);
    // setEmailError(false);
    // setMobileError(false);
  }

  const handleDisconnect = async () => {
    window.location.href = "/";
    window.localStorage.clear();
    disconnect();
  };

  async function modalReloadFn() {
    setShow4(false);
    window.location.reload();
  }

  return (
    <>   <Backdrop
    sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={open}
  >
    <CircularProgress color="inherit" />
  </Backdrop>
    <section class="dashboard">
      <ToastContainer position="top-center" theme="dark" />
      <div class="dashboard-left">
        <div class="dash-navhead">
          <a class="dashnav-a" href="index.html">
            {" "}
            <img src="/p2p.help_logo-01.svg" />
          </a>
        </div>
        <div class="dash-navmid">
          <ul>
            {/* <li>
                <a href="/dashboard">
                  {" "}
                  <svg
                    id="Dashboard"
                    xmlns="http://www.w3.org/2000/svg"
                    width="23.992"
                    height="24"
                    viewBox="0 0 23.992 24"
                  >
                    <g
                      id="Group_17237"
                      data-name="Group 17237"
                      transform="translate(0 0)"
                    >
                      <path
                        id="Path_10905"
                        data-name="Path 10905"
                        d="M5.449,2.1q1.093,0,2.184.014A2.063,2.063,0,0,1,9.7,4.179c.02,1.4.022,2.869,0,4.356a2.047,2.047,0,0,1-2.087,2.073q-1.067.011-2.135.011-1.091,0-2.179-.011a2.063,2.063,0,0,1-2.1-2.113c0-.319,0-.638,0-.958h.023v-1.2c0-.264,0-.528-.011-.792A14.443,14.443,0,0,1,1.235,3.99a2.01,2.01,0,0,1,2.04-1.878Q4.362,2.1,5.449,2.1m0-1.2q-1.1,0-2.191.014A3.21,3.21,0,0,0,.039,3.888C-.03,4.7.027,5.52.027,6.337H.006c0,.722-.006,1.446,0,2.169a3.269,3.269,0,0,0,3.283,3.3q1.1.011,2.191.011,1.073,0,2.148-.011A3.256,3.256,0,0,0,10.9,8.551q.031-2.194,0-4.391A3.251,3.251,0,0,0,7.649.912Q6.549.9,5.449.9"
                        transform="translate(0.001 -0.898)"
                        fill="#ccd0db"
                      />
                      <path
                        id="Path_10906"
                        data-name="Path 10906"
                        d="M16.431,2.1q1.037,0,2.072.01A2.045,2.045,0,0,1,20.6,4.178c.022,1.392.023,2.817,0,4.355a2.047,2.047,0,0,1-2.084,2.076q-1.06.011-2.119.011-1.1,0-2.195-.011A2.063,2.063,0,0,1,12.1,8.5c0-.319,0-.638,0-.958h.023v-1.2c0-.263-.006-.527-.012-.791a14.755,14.755,0,0,1,.019-1.555A2.027,2.027,0,0,1,14.21,2.11Q15.32,2.1,16.431,2.1m0-1.2Q15.317.9,14.2.91a3.218,3.218,0,0,0-3.269,2.981c-.07.81-.012,1.632-.012,2.448H10.9c0,.724-.006,1.447,0,2.169a3.269,3.269,0,0,0,3.285,3.3q1.1.011,2.207.011,1.066,0,2.132-.011A3.256,3.256,0,0,0,21.8,8.549q.031-2.194,0-4.391A3.254,3.254,0,0,0,18.515.912Q17.473.9,16.431.9"
                        transform="translate(2.179 -0.897)"
                        fill="#ccd0db"
                      />
                      <path
                        id="Path_10907"
                        data-name="Path 10907"
                        d="M5.455,13q1.08,0,2.16.011a2.061,2.061,0,0,1,2.091,2.1c0,.32.006.642.006.962H9.686v1.188c0,.266.006.533.012.8a15.2,15.2,0,0,1-.019,1.578A2.005,2.005,0,0,1,7.636,21.5q-1.1.014-2.2.016-1.078,0-2.156-.016a2.069,2.069,0,0,1-2.07-2.089c-.013-1.426-.013-2.877,0-4.317A2.049,2.049,0,0,1,3.3,13.007Q4.378,13,5.455,13m0-1.2q-1.084,0-2.167.011A3.259,3.259,0,0,0,.01,15.085q-.02,2.169,0,4.339A3.258,3.258,0,0,0,3.263,22.7q1.085.014,2.173.016,1.109,0,2.216-.016a3.211,3.211,0,0,0,3.223-2.973c.067-.82.011-1.649.011-2.474h.023c0-.722.008-1.446,0-2.169a3.266,3.266,0,0,0-3.279-3.278Q6.542,11.8,5.455,11.8"
                        transform="translate(0 1.281)"
                        fill="#ccd0db"
                      />
                      <path
                        id="Path_10908"
                        data-name="Path 10908"
                        d="M16.37,13q1.066,0,2.13.01a2.065,2.065,0,0,1,2.1,2.108c0,.323,0,.644,0,.967h-.024V17.27c0,.263.006.526.011.79a15.172,15.172,0,0,1-.018,1.559A2.009,2.009,0,0,1,18.54,21.5q-1.111.018-2.221.018-1.078,0-2.156-.018A2.047,2.047,0,0,1,12.1,19.4q-.016-2.147,0-4.295a2.058,2.058,0,0,1,2.1-2.1Q15.289,13,16.37,13m0-1.2q-1.087,0-2.173.008A3.264,3.264,0,0,0,10.9,15.1q-.018,2.156,0,4.314A3.257,3.257,0,0,0,14.142,22.7q1.089.018,2.177.018,1.12,0,2.239-.018a3.209,3.209,0,0,0,3.212-2.983c.068-.811.012-1.632.012-2.448h.02c0-.722.008-1.446,0-2.169a3.268,3.268,0,0,0-3.291-3.293q-1.069-.011-2.139-.01"
                        transform="translate(2.179 1.281)"
                        fill="#ccd0db"
                      />
                    </g>
                  </svg>
                  Dashboard
                </a>
              </li> */}

            <li>
              <div class="accordion accordion-flush" id="accordionFlushExample">
                <div class="accordion-item">
                  <h2 class="accordion-header stake-header">
                    <button
                      class="accordion-button  stake-dropdown"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseTwo"
                      aria-expanded="false"
                      aria-controls="flush-collapseTwo"
                    >
                      <svg
                        width="24"
                        height="24.001"
                        viewBox="0 0 101 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M93.328 70.6788C93.139 65.3018 91.463 58.8238 88.611 52.4388C85.759 46.0478 82.054 40.4738 78.178 36.7438C74.01 32.7318 70.023 31.2628 66.937 32.5928C66.912 32.6028 66.886 32.6068 66.861 32.6178L63.241 34.2348V25.7428C63.241 25.7308 63.243 25.7188 63.243 25.7068C63.243 18.9898 51.653 13.9248 36.283 13.9248C20.945 13.9248 9.373 18.9698 9.325 25.6658C9.325 25.6798 9.321 25.6928 9.321 25.7078V40.8878C9.321 40.9678 9.332 41.0458 9.345 41.1218C9.332 41.1988 9.321 41.2758 9.321 41.3558C9.321 41.4928 9.333 41.6268 9.343 41.7618C9.332 41.8338 9.321 41.9048 9.321 41.9798V57.1598C9.321 57.2408 9.332 57.3188 9.345 57.3958C9.332 57.4728 9.321 57.5508 9.321 57.6318C9.321 57.8028 9.334 57.9718 9.348 58.1398C9.331 58.2278 9.321 58.3188 9.321 58.4118V73.5918C9.321 73.6718 9.332 73.7498 9.345 73.8258C9.332 73.9028 9.321 73.9798 9.321 74.0598C9.321 80.7758 20.913 85.8398 36.285 85.8398C46.05 85.8398 54.949 83.6118 59.633 80.0898C63.825 85.5318 68.335 88.7398 72.112 88.7398C72.973 88.7398 73.798 88.5738 74.57 88.2288L88.805 81.8698C88.819 81.8638 88.834 81.8598 88.848 81.8538C91.943 80.4728 93.534 76.5038 93.328 70.6788ZM53.006 38.8068L52.574 38.9968C49.601 40.3258 48.099 43.9898 48.049 49.0088C44.459 49.7938 40.435 50.2268 36.286 50.2268C22.108 50.2268 12.228 45.5518 12.228 41.3548C12.228 41.2748 12.217 41.1968 12.204 41.1208C12.217 41.0438 12.228 40.9668 12.228 40.8868V31.1938C16.596 34.9968 25.508 37.4888 36.284 37.4888C47.057 37.4888 55.966 34.9988 60.336 31.1968V35.5328L53.006 38.8068ZM12.204 57.3958C12.217 57.3188 12.228 57.2408 12.228 57.1598V46.8418C16.598 50.6428 25.51 53.1338 36.286 53.1338C40.444 53.1338 44.515 52.7348 48.176 51.9768C48.511 55.6678 49.5 59.8868 51.147 64.3448C46.739 65.7718 41.752 66.5028 36.286 66.5028C22.108 66.5028 12.228 61.8278 12.228 57.6328C12.228 57.5508 12.217 57.4728 12.204 57.3958ZM36.284 16.8308C50.447 16.8308 60.319 21.4998 60.337 25.6958C60.337 25.6998 60.336 25.7028 60.336 25.7068V25.7338C60.294 29.9248 50.429 34.5828 36.284 34.5828C22.108 34.5828 12.23 29.9048 12.23 25.7068C12.23 21.5088 22.108 16.8308 36.284 16.8308ZM36.286 82.9348C22.108 82.9348 12.228 78.2578 12.228 74.0608C12.228 73.9808 12.217 73.9028 12.204 73.8268C12.217 73.7498 12.228 73.6728 12.228 73.5928V63.1178C16.598 66.9188 25.51 69.4088 36.286 69.4088C42.128 69.4088 47.474 68.6098 52.215 67.0508C52.406 67.5058 52.603 67.9628 52.808 68.4208C54.362 71.8988 56.109 75.0238 57.946 77.7368C53.85 80.8738 45.386 82.9348 36.286 82.9348ZM73.783 85.3938L73.372 85.5828C69.533 87.2868 61.242 80.1748 55.461 67.2348C49.686 54.2908 49.93 43.3618 53.754 41.6528L63.055 37.4998C62.529 39.2368 62.294 41.3498 62.381 43.7948C62.57 49.1708 64.246 55.6508 67.099 62.0418C69.951 68.4298 73.656 74.0008 77.532 77.7308C79.299 79.4298 81.029 80.6558 82.676 81.4238L73.783 85.3938ZM87.669 79.1978C87.667 79.1988 87.664 79.1988 87.662 79.1998L87.652 79.2038C85.738 80.0498 82.782 78.7508 79.547 75.6368C75.934 72.1598 72.455 66.9108 69.753 60.8568C67.049 54.7998 65.462 48.7048 65.285 43.6928C65.127 39.1948 66.135 36.1268 68.051 35.2728C68.438 35.1008 68.865 35.0158 69.329 35.0158C71.169 35.0158 73.575 36.3468 76.163 38.8368C79.776 42.3138 83.254 47.5648 85.957 53.6228C88.661 59.6748 90.247 65.7688 90.424 70.7808C90.583 75.2728 89.578 78.3398 87.669 79.1978Z"
                          fill="#C0C4CE"
                          stroke="#C0C4CE"
                          stroke-width="2.2"
                          id="id_101"
                        ></path>
                      </svg>{" "}
                      Stake
                    </button>
                  </h2>
                  <div
                    id="flush-collapseTwo"
                    class="accordion-collapse show"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div
                      class="accordion-body stake-body"
                      id="accordion-active"
                    >
                      <ul>
                        <li>
                          <Link href="/staking" class="stake-a active">
                            Staking
                          </Link>
                        </li>
                        {/* <li>
                          <Link href="/stakingMatching" class="stake-a">
                            stacking Match
                          </Link>
                        </li> */}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            <li className="active">
              <a href="/oldStaking">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="21.805"
                  viewBox="0 0 24 21.805"
                >
                  <g
                    id="Group_17240"
                    data-name="Group 17240"
                    transform="translate(-131.5 -291.1)"
                  >
                    <path
                      id="Path_10935"
                      data-name="Path 10935"
                      d="M26,16.92a3,3,0,0,0-2.4-2.94V12.12a3,3,0,0,0-3-3h-.952L14.32,3.792a3,3,0,0,0-4.242,0L4.724,9.149A2.993,2.993,0,0,0,2,12.12v9.6a3,3,0,0,0,3,3H20.6a3,3,0,0,0,3-3V19.86A3,3,0,0,0,26,16.92ZM10.928,4.642a1.8,1.8,0,0,1,2.545,0L17.952,9.12H6.448ZM20.6,23.52H5a1.8,1.8,0,0,1-1.8-1.8v-9.6A1.8,1.8,0,0,1,5,10.32H20.6a1.8,1.8,0,0,1,1.8,1.8v1.8H20.6a3,3,0,1,0,0,6h1.8v1.8a1.8,1.8,0,0,1-1.8,1.8Zm2.4-4.8H20.6a1.8,1.8,0,0,1,0-3.6H23a1.8,1.8,0,0,1,0,3.6Z"
                      transform="translate(129.5 288.185)"
                      fill="#ccd0db"
                    />
                    <path
                      id="Path_10939"
                      data-name="Path 10939"
                      d="M132.238,12.161a2.221,2.221,0,0,0-1.151-1.151,2.069,2.069,0,0,0-.844-.174h-4.409v5.17h-.644v.95h.644v.89h1.85v-.89h.7v-.95h-.7V12.6a.394.394,0,0,1,.106-.278.354.354,0,0,1,.271-.113h1.73a.8.8,0,1,1,0,1.595h-.511a.59.59,0,0,0-.294.053.8.8,0,0,0-.2.248l-.557,1.084h2.016a2.05,2.05,0,0,0,.844-.174,2.2,2.2,0,0,0,1.151-1.158A2.119,2.119,0,0,0,132.41,13a2.063,2.063,0,0,0-.173-.842"
                      transform="translate(11.09 290.766)"
                      fill="#ccd0db"
                    />
                  </g>
                </svg>
                Old Staking
              </a>
            </li>
          </ul>
        </div>
        <div class="dash-navmid2">
          <ul>
            {/* <li>
                <div
                  class="accordion accordion-flush"
                  id="accordionFlushExample"
                >
                  <div class="accordion-item">
                    <h2 class="accordion-header sett_header">
                      <Link href="/personalInfo">
                        <button
                          class="accordion-button collapsed sett-dropdown"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseThree"
                          aria-expanded="false"
                          aria-controls="flush-collapseThree"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="23.819"
                            height="25.2"
                            viewBox="0 0 23.819 25.2"
                          >
                            <path
                              id="Path_10931"
                              data-name="Path 10931"
                              d="M99.848,20.873a2.477,2.477,0,0,0-1.206.3,1.82,1.82,0,0,1-2.515-.552,11.906,11.906,0,0,1-1.553-2.692,1.817,1.817,0,0,1,.775-2.458,2.507,2.507,0,0,0,.392-3.986,3.28,3.28,0,0,0-.466-.343,1.816,1.816,0,0,1-.737-2.335,12.132,12.132,0,0,1,1.624-2.818,1.816,1.816,0,0,1,2.426-.536A2.5,2.5,0,0,0,101.67,5a2.455,2.455,0,0,0,.686-1.658A1.806,1.806,0,0,1,104,1.456a10.917,10.917,0,0,1,3.325,0,1.8,1.8,0,0,1,1.616,1.859,2.5,2.5,0,0,0,1.712,2.341,2.468,2.468,0,0,0,2.033-.191,1.828,1.828,0,0,1,2.389.444,11.9,11.9,0,0,1,1.7,2.94,1.807,1.807,0,0,1-.794,2.315,2.5,2.5,0,0,0-.66,3.749,3.027,3.027,0,0,0,.672.581,1.824,1.824,0,0,1,.752,2.389,12.081,12.081,0,0,1-1.558,2.718,1.822,1.822,0,0,1-2.53.572,2.5,2.5,0,0,0-3.582,1.421,2.694,2.694,0,0,0-.127.709,1.822,1.822,0,0,1-1.682,1.9,11,11,0,0,1-3.278,0,1.8,1.8,0,0,1-1.627-1.874A2.507,2.507,0,0,0,99.848,20.873Zm9.36-7.43a3.563,3.563,0,1,0-3.684,3.451A3.566,3.566,0,0,0,109.208,13.443Z"
                              transform="translate(-93.737 -0.729)"
                              fill="none"
                              stroke="#ccd0db"
                              stroke-width="1.2"
                            />
                          </svg>{" "}
                          Settings
                        </button>
                      </Link>
                    </h2>
                    <div
                      id="flush-collapseThree"
                      class="accordion-collapse collapse"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div class="accordion-body set-body">
                        <ul className="dots">
                          <li>
                            <Link href="/personalInfo" class="sett_a">
                              Personal Information
                            </Link>
                          </li>
                          <li>
                            <Link href="/twoFactor" class="sett_a">
                              Account Security
                            </Link>
                          </li>
                       
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </li> */}
            <li>
              <button
                style={{
                  border: "none",
                  color: "white",
                  backgroundColor: "transparent",
                }}
                class="disconnect-btn"
                onClick={handleDisconnect}
              >
                {" "}
                <img
                  src="/unlink1.png"
                  atl=""
                  style={{ marginRight: "12px" }}
                />{" "}
                Disconnect
              </button>
            </li>
          </ul>
        </div>
        <div class="dash-navbottom">
          <a href="">
            {" "}
            <p>
              <img src="/dash-btn.png" atl="" />
            </p>{" "}
            <span>{maskedStr}</span>
          </a>
        </div>
      </div>
      <div class="dashboard-right" id="stake-dashboard-right">
        <div class="reward-p2p" id="something-imp">
          <div class="something">
            <Link href="/mobileSettings">
              <img src="/backArrow.png" alt="" />
            </Link>
            <span>Personal Information</span>
          </div>
          {/* <div class="set-editicon">
            {editProfile ? (
              <img
                src="tick.png"
                onClick={() => {
                  formSubmitHandler();
                }}
              />
            ) : (
              <img src="/edit.png" alt="" onClick={autoFocus} />
            )}
          </div> */}
        </div>
        <div class="container-fluid">
          <div class="dashboard-head">
            <h2>Add Staking</h2>
          </div>
          <div class="settings-box">
            <div class="dashboard-row1 mb-4">
              <div class="dashrow1-left">
                <img src="/Hi_colored.gif" alt="" />
              </div>
              <div class="dashrow1-right">
                <h4>Staking Information</h4>
                <div class="dash-ul1">
                  <ul>
                    <li>
                      <span> Contract Address:</span>{" "}
                      <span>
                        {getAddress}
                        <CopyToClipboard
                          text={stakeData?.contractAddress}
                          // onCopy={() => toast.success("Copied Successfully")}
                        >
                          <Tooltip
                            content={"Copied"}
                            trigger="click"
                            color="primary"
                          >
                            <img
                              src="/copy.png"
                              style={{
                                marginLeft: "10px",
                                width: "15px",
                                height: "15px",
                              }}
                            />
                          </Tooltip>
                        </CopyToClipboard>
                      </span>
                    </li>
                    <li>
                      <span>Token Staked:</span>{" "}
                      <span>
                        {stakeData?.totalTokensStaked}
                        <CopyToClipboard
                          text={stakeData?.totalTokensStaked}
                          // onCopy={() => toast.success("Copied Successfully")}
                        >
                          <Tooltip
                            content={"Copied"}
                            trigger="click"
                            color="primary"
                          >
                            <img
                              src="/copy.png"
                              style={{
                                marginLeft: "10px",
                                width: "15px",
                                height: "15px",
                              }}
                            />
                          </Tooltip>
                        </CopyToClipboard>
                      </span>
                    </li>
                    <li>
                      <span> Staked Date:</span>{" "}
                      <span>{stakeData?.duration}</span>
                    </li>
                  </ul>
                  <ul>
                    {/* <li>
                      <span>Claim Time:</span> <span>Unrecognized</span>
                    </li> */}
                    {/* <li>
                      <span>Two Factor Authentication:</span>{" "}
                      <span>
                        {" "}
                        <p>
                          {stakeData?.fa == 1 && "On"}
                          {stakeData?.fa == 0 && "Off"}
                        </p>
                      </span>
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>
            {/* <div class="setting-row1">
              <div class="setrow1-left">
                <div class="s-image">
                  <img src={profilePic || "/dash-btn.png"} alt="" />
                  <label htmlFor="img-file">
                    <img src="/personal-camera.png" on alt="" id="pt-camera"/>
                  </label>
                </div>
                <div class="s-camera">
                  <label htmlFor="img-file">
                    <img src="/personal-camera.png" on alt="" />
                  </label>
                </div>
                <div>
                  <input
                    type="file"
                    placeholder="Upload Front Side"
                    style={{ marginTop: "10px", display: "none" }}
                    id="img-file"
                    onChange={(e) => uploadImage(e)}
                  />
                </div>
              </div>
              <div class="setrow1-right">
                <p>
                  You're part of this community since{" "}
                  <span>25 February 2021!</span>
                </p>
                <div class="set-edit">
                  {editProfile ? (
                    <img
                      src="tick.png"
                      onClick={() => {
                        formSubmitHandler();
                      }}
                    />
                  ) : (
                    <img src="/edit.png" alt="" onClick={autoFocus} />
                  )}
                </div>
              </div>
            </div> */}
            <div class="setting-row2 ">
              {/* <div class="setrow2-head">
                <h4>Personal Information</h4>
              </div> */}
              <form action="">
                {" "}
                mt-5
                <div class="set-form1">
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                      User Id
                    </label>
                    <input
                      type="number"
                      class="form-control"
                      id="contractAddress"
                      // placeholder="Rishi"
                      defaultValue={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      maxLength="50"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                      Token Staked
                    </label>
                    <input
                      type="number"
                      class="form-control"
                      id="exampleInputEmail1"
                      // placeholder="Sunak"
                      defaultValue={tokenStaked}
                      onChange={(e) => setTokenStaked(e.target.value)}
                      maxLength="50"
                    />
                  </div>
                </div>
                <div class="set-form1" id="staked-date">
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                      Token Staked Date
                    </label>
                    <input
                      type="datetime-local"
                      class="form-control"
                      id="exampleInputEmail1"
                      // placeholder="+91 79866237356"
                      defaultValue={stakedTime}
                      onChange={(e) => setstakedTime(e.target.value)}
                      maxLength="14"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                      Claim Time
                    </label>
                    <input
                      type="datetime-local"
                      class="form-control"
                      id="exampleInputEmail1"
                      // placeholder="iloveu.uk@gmail.com"
                      defaultValue={claimTime}
                      onChange={(e) => setClaimTime(e.target.value)}
                    />
                  </div>
                </div>
                <div class="set-form2">
                  <div class="wall-copy">
                    <label for="exampleInputEmail1" class="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      class="form-control set-walladd"
                      // placeholder="1234***PQRS"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      defaultValue={userAddress}
                      onChange={(e) => setuserAddress(e.target.value)}
                    />
                  </div>
                  <div class="wall-sign">
                    <span class="input-group-text" id="basic-addon2">
                      <CopyToClipboard
                        text={contractAddress}
                        // onCopy={() => toast.success("Copied Successfully")}
                      >
                        <Tooltip
                          content={"Copied"}
                          trigger="click"
                          color="primary"
                        >
                          <img
                            src="/clip.png"
                            style={{
                              width: "30px",
                              height: "30px",
                            }}
                          />
                        </Tooltip>
                      </CopyToClipboard>
                    </span>
                  </div>
                </div>
                <p
                  style={{
                    color: "white",
                    textAlign: "center",
                    marginTop: "10px",
                  }}
                >
                  {mobileError && "Phone No. should be not more than 10 digits"}
                </p>
                <p
                  style={{
                    color: "white",
                    textAlign: "center",
                    marginTop: "10px",
                  }}
                >
                  {emailError && "Please Provide Valid Email address"}
                </p>
                <div className="stake-btn-div">
                  <button
                    className="btn connect-wallet"
                    onClick={() => write()}
                    type="button"
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                      float: "left",
                      width: "20%",
                      marginTop: "30px",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Modal
        closeButton={false}
        blur
        aria-labelledby="modal-title"
        open={show4}
        className="staking-modal"
      >
        <Modal.Body>
          <h3 style={{ textAlign: "center", fontSize: "20px" }}>
            Record Successfully Submit{" "}
          </h3>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="connect-wallet"
            auto
            flat
            onPress={() => modalReloadFn()}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
    </>
  );
}
