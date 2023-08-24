import Link from "next/link";
import React from "react";
import { TbDrone } from "react-icons/tb";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div>
      <nav className="bg-slate-100 h-14">
        <div className="flex items-center justify-between">
          <div className="flex items-center p-3 ">
            <TbDrone size={25} className="mr-3" />
            <div id="title" className="text-2xl font-semibold">
              GT - VIP - Drones
            </div>
          </div>
          <div>
            <ul className="flex gap-2 p-2">
              {/* <li className="hover:bg-slate-200 hover:border-orange-200 hover:rounded-lg p-2 hover:border  cursor-pointer">
                Home
              </li>
              <li className="hover:bg-slate-200 hover:border-orange-200 hover:rounded-lg p-2 hover:border  cursor-pointer">
                Classrooms
              </li> */}
              <Link href={"/students"}>
                <li className="hover:bg-slate-200 hover:border-orange-200 hover:rounded-lg p-2 hover:border  cursor-pointer">
                  Students
                </li>
              </Link>

              <Link href={"/attendance"}>
                <li className="hover:bg-slate-200 hover:border-orange-200 hover:rounded-lg p-2 hover:border  cursor-pointer">
                  Attendence
                </li>
              </Link>
              {/* <li className="mr-3 hover:bg-slate-200 hover:border-orange-200 hover:rounded-lg p-2 hover:border  cursor-pointer">
                Sign out
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
