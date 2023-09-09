import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Loader from "../views/loader";
import { CreateProductionData } from "../services/productionServices";

function CreateDataForm(props) {
  const { closeModal, fetchData } = props;
  const [loading, setloading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const onSubmit = handleSubmit(async (data) => {
    setloading(true);
    try {
      const res = await CreateProductionData(data);
      setloading(false);
      closeModal();
      fetchData();
    } catch (error) {
      setloading(false);
    }
  });

  return (
    <>
      {loading && <Loader />}
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 min-w-[500px]">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Create Data
          </h1>
          <form
            className="space-y-4 md:space-y-6"
            noValidate
            autoComplete="off"
            onSubmit={onSubmit}
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="producation"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Producation
                </label>
                <input
                  type="number"
                  name="producation"
                  id="producation"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0"
                  {...register("producation", {
                    required: { value: true, message: "Field is Required" },
                  })}
                />
                {errors?.producation && (
                  <div className="Invalid">{errors?.producation?.message}</div>
                )}
              </div>
              <div>
                <label
                  htmlFor="sales"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Sales
                </label>
                <input
                  type="number"
                  name="sales"
                  id="sales"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0"
                  {...register("sales", {
                    required: { value: true, message: "Field is Required" },
                  })}
                />
                {errors?.sales && (
                  <div className="Invalid">{errors?.sales?.message}</div>
                )}
              </div>
              <div>
                <label
                  htmlFor="exports"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Exports
                </label>
                <input
                  type="number"
                  name="exports"
                  id="exports"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0"
                  {...register("exports", {
                    required: { value: true, message: "Field is Required" },
                  })}
                />
                {errors?.exports && (
                  <div className="Invalid">{errors?.exports?.message}</div>
                )}
              </div>
              <div>
                <label
                  htmlFor="country"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  id="country"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="country"
                  {...register("country", {
                    required: { value: true, message: "Field is Required" },
                  })}
                />
                {errors?.country && (
                  <div className="Invalid">{errors?.country?.message}</div>
                )}
              </div>
              <div>
                <label
                  htmlFor="type"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Type
                </label>
                <select
                  type="text"
                  name="type"
                  id="type"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Type"
                  {...register("type", {
                    required: { value: true, message: "Field is Required" },
                  })}
                >
                  <option value="wooden">Wooden</option>
                  <option value="plastic">Plastic</option>
                  <option value="small">Small</option>
                </select>

                {errors?.type && (
                  <div className="Invalid">{errors?.type?.message}</div>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-500 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateDataForm;
