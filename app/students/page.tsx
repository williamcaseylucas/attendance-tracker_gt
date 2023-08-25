"use client";
import React, { useEffect, useState } from "react";
import AddStudent from "../components/AddStudent";
import { FaRegEdit } from "react-icons/fa";
// import { CSVLink } from "react-csv";
import { AiOutlineDelete, AiOutlineMinus } from "react-icons/ai";
import { BsPlusLg } from "react-icons/bs";
import Link from "next/link";
import axios from "axios";
import { ExportToCsv } from "export-to-csv";

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

const Table = ({ data, setData }) => {
  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    idx: number
  ) => {
    e.preventDefault();
    // console.log(idx);
    // console.log(data[idx]);

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

  const handleDecrement = async (
    e: React.MouseEvent<HTMLButtonElement>,
    idx: number
  ) => {
    e.preventDefault();

    const { id } = data[idx];

    const updatedData = [...data]; // Create a copy of the data array

    if (e.target?.id === "attended") {
      // Update the attendance count in the copy of the array
      updatedData[idx] = {
        ...updatedData[idx],
        attended:
          updatedData[idx].attended - 1 >= 0
            ? updatedData[idx].attended - 1
            : 0,
      };
    } else {
      // Update the attendance count in the copy of the array
      updatedData[idx] = {
        ...updatedData[idx],
        missed:
          updatedData[idx].missed - 1 >= 0 ? updatedData[idx].missed - 1 : 0,
      };
    }

    const { data: dt } = await axios.put(
      `${process.env.NEXT_PUBLIC_SERVER_DEV}/${id}`,
      updatedData[idx]
    );

    console.log("output from server: ", dt);

    setData(updatedData);
  };

  const handleIncrement = async (
    e: React.MouseEvent<HTMLButtonElement>,
    idx: number
  ) => {
    e.preventDefault();

    const { id } = data[idx];

    const updatedData = [...data]; // Create a copy of the data array

    if (e.target?.id === "attended") {
      // Update the attendance count in the copy of the array
      updatedData[idx] = {
        ...updatedData[idx],
        attended: updatedData[idx].attended + 1,
      };
    } else {
      // Update the attendance count in the copy of the array
      updatedData[idx] = {
        ...updatedData[idx],
        missed: updatedData[idx].missed + 1,
      };
    }

    const { data: dt } = await axios.put(
      `${process.env.NEXT_PUBLIC_SERVER_DEV}/${id}`,
      updatedData[idx]
    );

    console.log("output from server: ", dt);

    setData(updatedData);
  };

  const handleDate = (date: Date) => {
    const dateObject = new Date(date);

    const year = dateObject.getFullYear(); // 2023
    const month = dateObject.getMonth(); // 7 (months are zero-based, so August is 7)
    const day = dateObject.getDate(); // 25
    const hours = dateObject.getHours(); // 12
    const minutes = dateObject.getMinutes(); // 34
    const seconds = dateObject.getSeconds(); // 56

    return `${month + 1}/${day}/${year} at ${hours}:${minutes}`;
  };
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
              Last Attended
            </th>
            <th scope="col" className="px-6 py-3">
              Attended
            </th>
            <th scope="col" className="py-3">
              Increment/Decrement Attendance
            </th>
            <th scope="col" className="px-6 py-3">
              Missed
            </th>
            <th scope="col" className="py-3">
              Increment/Decrement Missed
            </th>
            <th scope="col" className="py-3">
              Delete
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
              <td className="px-6 py-4">{handleDate(item?.date)}</td>
              <td className="px-6 py-4">{item.attended}</td>
              <td className="py-4 inline-block">
                <span className="font-medium text-white bg-green-600 rounded-full inline-flex items-center justify-center p-1 mr-4">
                  {/* <FaRegEdit size={15} className="cursor-pointer" /> */}
                  <BsPlusLg
                    size={17.5}
                    className="cursor-pointer"
                    id="attended"
                    onClick={(e: any) => handleIncrement(e, idx)}
                  />
                </span>
                <span className="font-medium text-white bg-orange-600 rounded-full inline-flex items-center justify-center p-1 gap-2">
                  {/* <FaRegEdit size={15} className="cursor-pointer" /> */}
                  <AiOutlineMinus
                    size={17.5}
                    className="cursor-pointer"
                    id="attended"
                    onClick={(e: any) => handleDecrement(e, idx)}
                  />
                </span>
              </td>
              <td className="px-6 py-4">{item.missed}</td>
              <td className="py-4 inline-block">
                <span className="font-medium text-white bg-green-600 rounded-full inline-flex items-center justify-center p-1 mr-4">
                  {/* <FaRegEdit size={15} className="cursor-pointer" /> */}
                  <BsPlusLg
                    size={17.5}
                    className="cursor-pointer"
                    id="missed"
                    onClick={(e: any) => handleIncrement(e, idx)}
                  />
                </span>
                <span className="font-medium text-white bg-orange-600 rounded-full inline-flex items-center justify-center p-1 gap-2">
                  {/* <FaRegEdit size={15} className="cursor-pointer" /> */}
                  <AiOutlineMinus
                    size={17.5}
                    className="cursor-pointer"
                    id="missed"
                    onClick={(e: any) => handleDecrement(e, idx)}
                  />
                </span>
              </td>
              <td className="py-4 pl-3">
                <div className="font-medium text-white bg-red-600 rounded-full inline-flex items-center justify-center p-1">
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
  const [imprt, setImprt] = useState(false);
  const [field, setField] = useState({ name: "", email: "" });
  // const [data, setData] = useState(dummy);
  const [file, setFile] = useState<File | undefined | null>();
  const [data, setData] = useState<any>([]);

  const fileReader = new FileReader();

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
    e.preventDefault();
    if (e.target.placeholder === "Name") {
      setField({ ...field, name: e.target.value });
    } else {
      setField({ ...field, email: e.target.value });
    }
  };

  const handleAdd = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { data: dt } = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_DEV}`,
      {
        ...field,
        attended: 0,
        missed: 0,
        present: false,
        date: new Date().toISOString(),
      }
    );
    data.push(dt);
    setField({ name: "", email: "" });
  };

  // const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   // setFile(e?.target?.files[0]);
  // };

  // const handleFileUpload = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   if (file) {
  //     fileReader.onload = (event) => {
  //       const csvOutput = event?.target?.result;
  //     };

  //     fileReader.readAsText(file);
  //   }
  //   setImprt(false);
  // };

  const downloadCSV = (e: any) => {
    const options = {
      fieldSeparator: ",",
      filename: "VIP_attendance",
      quoteStrings: '"',
      decimalSeparator: ".",
      showLabels: true,
      showTitle: true,
      title: "Student Attendence",
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };

    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(data);
    // csvExporter.generateCsv([
    //   {
    //     name: "Will",
    //     email: "wrunyon3",
    //   },
    //   {
    //     name: "Susan",
    //     email: "susan",
    //   },
    // ]);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-[calc(100%-12rem)]">
        <div id="addStudent">
          <div className="flex justify-end gap-2 mt-2 mb-2">
            {!closed ? (
              <div>
                {/* <button
                    onClick={() => setImprt(true)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Import from CSV
                  </button> */}
                <button
                  onClick={() => setClosed(!closed)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Add Student
                </button>
                <button
                  onClick={downloadCSV}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Download CSV
                </button>
                {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                  Email CSV
                </button> */}
                <Link href={"/attendance"}>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Create Session
                  </button>
                </Link>
              </div>
            ) : (
              // !imprt ? (
              // ) : (
              //   <div>
              //     <input
              //       onChange={handleOnChange}
              //       className="mr-2"
              //       type="file"
              //       accept=".csv"
              //     />
              //     <button
              //       onClick={handleFileUpload}
              //       className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              //     >
              //       Upload
              //     </button>
              //   </div>
              // )
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
          <Table data={data} setData={setData} />
        )}
      </div>
      {/* <AddStudent />*/}
      {/* <St /> */}
    </div>
  );
};

export default Students;
