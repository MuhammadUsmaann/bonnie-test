import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import DailyRevenueChart from "./Charts/DailyRevenueChart";
import CustomerFlowChart from "./Charts/CustomerFlowChart";
import { PieCharts } from "./Charts/PieCharts";
import Modal from "../components/Modal";
import CreateDataForm from "../components/CreateDataForm";
import TableData from "../components/TableData";
import { getProductionData } from "../services/productionServices";
import Loader from "./loader";

function Dashboard() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const nav = useNavigate();

  const [loading, setloading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [type, setType] = useState("");

  const OpenModal = () => {
    setIsOpen(true);
  };
  const CloseModal = () => {
    setIsOpen(false);
  };

  const Logout = () => {
    localStorage.clear();
    nav("/login");
  };

  const [result, setResult] = useState();

  const fetchData = async () => {
    setloading(true);
    try {
      const res = await getProductionData({
        country,
        type,
      });
      setResult(res.data.result.rows);
      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {loading && <Loader />}
      <div className="flex">
        <div className="w-[250px] bg-gray-50 border-r-[1px] h-screen fixed p-4">
          <div>
            <label
              htmlFor="producation"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Country
            </label>
            <input
              type="text"
              name="country"
              id="country"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Country"
              onChange={(e) => {
                console.log(e.target.value);
                setCountry(e.target.value);
              }}
            />
          </div>
          <div className="mt-4">
            <select
              type="text"
              name="type"
              id="type"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Type"
              onChange={(e) => {
                console.log(e.target.value);
                setType(e.target.value);
              }}
            >
              <option value="">None</option>
              <option value="wooden">Wooden</option>
              <option value="plastic">Plastic</option>
              <option value="small">Small</option>
            </select>
          </div>
          <div className="text-right mt-5">
            <button
              className="bg-blue-500 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4  focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              onClick={() => {
                fetchData();
              }}
            >
              Apply
            </button>
          </div>
        </div>
        <div className="w-full bg-white flex flex-col overflow-y-auto ml-[250px]">
          <div className="h-[70px] border-b-[1px] flex justify-end">
            <div className="flex items-center pr-[10px]">
              <p className="font-semibold p-[10px] pl-0 pb-[5px]">
                Welcome , {userData.name}
              </p>
              <button
                onClick={() => Logout()}
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              >
                LogOut
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 p-3 gap-4">
            <div className="p-3 border rounded">
              <h2 className="text-[20px] font-semibold">Title A</h2>
              <PieCharts result={result} />
            </div>
            <div className="p-3 border rounded">
              <h2 className="text-[20px] font-semibold">Title B</h2>
              <CustomerFlowChart result={result} />
            </div>
            <div className="p-3 border rounded">
              <h2 className="text-[20px] font-semibold">Title C</h2>
              <DailyRevenueChart result={result} />
            </div>
          </div>
          <div className="text-right p-4">
            <button
              onClick={() => OpenModal()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4  rounded shadow"
            >
              Create Data
            </button>
            <Modal closeModal={CloseModal} modalIsOpen={isOpen}>
              <CreateDataForm closeModal={CloseModal} fetchData={fetchData} />
            </Modal>
          </div>
          <TableData result={result} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
