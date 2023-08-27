"use client";
import { useState } from "react";

type Props = {};
type Field = {
  name: string;
  email: string;
};

const AddStudent = (props: Props) => {
  const [fields, setFields] = useState<Field[]>([{ name: "", email: "" }]);

  const handleAddField = () => {
    setFields([...fields, { name: "", email: "" }]);
  };

  const handleFieldChange = (
    index: number,
    field: keyof Field,
    value: string
  ) => {
    const updatedFields = [...fields];
    updatedFields[index][field] = value;
    setFields(updatedFields);
  };

  const handleSubmit = () => {
    // Handle the submission of the form data
    console.log(fields);
  };
  return (
    <div>
      <div>
        <div className="flex">
          <div className="mb-4 w-full max-w-lg">
            <div className="flex flex-wrap -mx-3 mb-6">
              {fields.map((field, index) => (
                <>
                  {index === fields.length - 1 ? (
                    <>
                      <div
                        key={index}
                        className="w-full md:w-1/3 px-1 mb-6 md:mb-0"
                      >
                        <input
                          type="text"
                          placeholder="Name"
                          value={field.name}
                          onChange={(e) =>
                            handleFieldChange(index, "name", e.target.value)
                          }
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        />
                      </div>
                      <div
                        key={index}
                        className="w-full md:w-1/3 px-1 mb-6 md:mb-0"
                      >
                        <input
                          type="email"
                          placeholder="Email"
                          value={field.email}
                          onChange={(e) =>
                            handleFieldChange(index, "email", e.target.value)
                          }
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        />
                      </div>
                      <div
                        key={index}
                        className="w-full md:w-1/3 px-1 mb-6 md:mb-0"
                      >
                        <button
                          onClick={handleAddField}
                          className="bg-blue-500 text-white w-full h-[46px] px-3 mb-6 ml-2"
                        >
                          Add Field
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        key={index}
                        className="w-full md:w-1/2 px-1 mb-6 md:mb-0"
                      >
                        <input
                          type="text"
                          placeholder="Name"
                          value={field.name}
                          onChange={(e) =>
                            handleFieldChange(index, "name", e.target.value)
                          }
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        />
                      </div>
                      <div
                        key={index}
                        className="w-full md:w-1/2 px-1 mb-6 md:mb-0"
                      >
                        <input
                          type="email"
                          placeholder="Email"
                          value={field.email}
                          onChange={(e) =>
                            handleFieldChange(index, "email", e.target.value)
                          }
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        />
                      </div>
                    </>
                  )}
                </>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full max-w-lg">
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded-lg w-full md:w-1/2 mb-6 md:mb-0"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
