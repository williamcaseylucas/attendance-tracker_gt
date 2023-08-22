import React from "react";
import Form from "../components/Form";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="flex items-center justify-center h-[calc(100%-3.5rem)]">
      <Form />
    </div>
  );
};

export default page;
