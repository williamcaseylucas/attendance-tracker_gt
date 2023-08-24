"use client";
import React, { useEffect, useState } from "react";
import AddStudent from "../components/AddStudent";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import Link from "next/link";
import axios from "axios";

type Props = {};

const dummy = [
  {
    name: "William Runyon",
    email: "wrunyon3@gatech.edu",
    attended: 5,
    missed: 2,
    dates: ["jan 1", "feb 1"],
  },
  {
    name: "Amy Susan",
    email: "asusan@gatech.edu",
    attended: 3,
    missed: 4,
    dates: ["jan 1", "feb 1"],
  },
  {
    name: "Jason Sanders",
    email: "jsanders@gatech.edu",
    attended: 4,
    missed: 6,
    dates: ["jan 1", "feb 1"],
  },
];

const Table = ({ data, handleDelete }) => {
  return (
    <div className="w-full relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Attended
            </th>
            <th scope="col" className="px-6 py-3">
              Missed
            </th>
            <th scope="col" className="py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {/* V1:  bg-white dark:bg-gray-900 dark:border-gray-700 */}
          {/* V2:  bg-gray-50 dark:bg-gray-800 dark:border-gray-700*/}
          {data.map((item, idx) => (
            <tr
              key={idx}
              className={`border-b ${
                idx % 2 == 0
                  ? "bg-white dark:bg-gray-900 dark:border-gray-700"
                  : "bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
              }`}
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item.name}
              </th>
              <td className="px-6 py-4">{item.email}</td>
              <td className="px-6 py-4">{item.attended}</td>
              <td className="px-6 py-4">{item.missed}</td>
              <td className="py-4 pl-4">
                <div className="font-medium text-white flex items-center">
                  {/* <FaRegEdit size={15} className="cursor-pointer" /> */}
                  <AiOutlineDelete
                    size={17.5}
                    className="cursor-pointer"
                    onClick={(e: any) => handleDelete(e, idx)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Students = (props: Props) => {
  const [closed, setClosed] = useState(false);
  const [field, setField] = useState({ name: "", email: "" });
  // const [data, setData] = useState(dummy);
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: dt } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_DEV}`
      );
      setData(dt);
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.placeholder === "Name") {
      setField({ ...field, name: e.target.value });
    } else {
      setField({ ...field, email: e.target.value });
    }
  };

  const handleAdd = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const { data: dt } = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_DEV}`,
      {
        ...field,
        attended: 0,
        missed: 0,
        present: false,
      }
    );
    data.push(dt);
    setField({ name: "", email: "" });
  };

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    idx: number
  ) => {
    console.log(idx);
    console.log(data[idx]);

    const { id } = data[idx];

    const { data: dt } = await axios.delete(
      `${process.env.NEXT_PUBLIC_SERVER_DEV}/${id}`
    );
    console.log("response: ", dt);
    setData(
      data.filter((item: any, index: number) => {
        if (index !== idx) return item;
      })
    );
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-[calc(100%-12rem)]">
        <div id="addStudent">
          <div className="flex justify-end gap-2 mt-2 mb-2">
            {!closed ? (
              <div>
                <button
                  onClick={() => setClosed(!closed)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Add Student
                </button>
                <Link href={"/attendance"}>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Create Session
                  </button>
                </Link>
              </div>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Name"
                  onChange={handleChange}
                  value={field.name}
                  className="appearance-none block bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                />

                <input
                  type="email"
                  placeholder="Email"
                  onChange={handleChange}
                  value={field.email}
                  className="appearance-none block bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                />

                <button
                  onClick={handleAdd}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add
                </button>
                <button
                  onClick={() => setClosed(!closed)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
        {data.length === 0 ? (
          "Add students!"
        ) : (
          <Table data={data} handleDelete={handleDelete} />
        )}
      </div>
      {/* <AddStudent />*/}
      {/* <St /> */}
    </div>
  );
};

export default Students;
