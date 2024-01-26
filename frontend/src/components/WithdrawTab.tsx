/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/authSlice";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../axios/api";


function WithdrawTab() {
  const user = useSelector(selectUser).user;
  const [amount, setAmount] = useState(0);
  const withdrawAmount = async () => {
    try {
      if (isNaN(amount) || amount < 150) {
        return toast("Enter valid amount");
      }
      if (Number(user?.wallet.balance) < amount) {
        return toast("Unsufficient balance in wallet");
      }
      await api.post("/payment/request", { amount });
      setAmount(0);
      toast("Requested for Withdrawal, Admin needs to proceed");
    } catch (error: any) {
      toast(error?.response?.data?.message);
    }
  };
  return (
    <div className="h-full flex items-center justify-center text-start lg:px-60">
      <div className="border md:rounded-lg px-4 py-2 w-full">
        <div className="flex justify-center">
          <p className="text-xl md:text-2xl lg:text-3xl font-semibold">
            Wallet Withdrawal
          </p>
        </div>
        <div className="flex justify-end">
          <div className="flex bg-gray-300 text-black rounded-lg md:py-2 px-4 lg:pr-12 my-2 items-end w-max gap-6 hover:shadow-md cursor-pointer  hover:shadow-pink-400 transition duration-300 lg:hover:pr-14">
            <p className=" md:text-lg lg:text-xl font-medium">Balance: </p>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-violet-600">
              $ {Math.floor(user?.wallet.balance as number)}/-{" "}
            </p>
          </div>
        </div>
        <div className="">
          <div className="border flex items-center   justify-between">
            <div className="flex items-center w-full px-0.5">
              <p className="text-xl px-2 bg-white text-black rounded">
                $
              </p>
              <input
                type="text"
                value={amount}
                placeholder="Enter the amount you need to withdraw to your account from wallet.."
                className="bg-transparent px-4 outline-none w-full"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAmount(Number(e.target.value))
                }
              />
            </div>
            <button
              className="bg-purple-900 py-1 px-6 hover:bg-purple-600"
              onClick={withdrawAmount}
            >
              Withdraw
            </button>
          </div>
          <p className="text-xs text-violet-300">
            Minimum withdrawal amount is $150/-
          </p>
        </div>
        <div>
          <div className="flex justify-center mt-6">
            <p className="text-xl font-semibold">Transactions History</p>
          </div>
          <div className="h-[50vh] overflow-y-auto mt-2 ">
            {user?.wallet.transactions.map((transac) => (
              <div className="bg-purple-950/60 px-2 md:px-6 py-2 flex mb-2 justify-between rounded-md">
                <p className="font-medium truncate text-sm md:text-md">
                  <span className="text-pink-600 text-xs md:text-md">
                    {new Date(transac.date).toLocaleDateString()}
                  </span>
                  &nbsp;
                  {transac.remark}
                </p>
                <div className="flex items-center gap-1 md:gap-5 text-sm md:text-md">
                  <p className="text-pink-600 font-bold text-xs md:text-md">
                    {transac.type.toUpperCase()}
                  </p>
                  <p className="">
                    $ {Math.floor(transac.amount as number)}/-
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WithdrawTab;
