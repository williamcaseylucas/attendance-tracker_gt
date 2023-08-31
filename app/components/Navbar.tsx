"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { TbDrone } from "react-icons/tb";

type Props = {};

const Navbar = (props: Props) => {
  const { data: session } = useSession();

  return (
    <div>
      <nav className="bg-slate-100 h-14 w-full flex items-center justify-between">
        <div className="ml-2 w-full sm:w-auto flex justify-center sm:justify-normal items-center">
          <TbDrone size={25} className="mr-3" />
          <div id="title" className="text-2xl font-semibold">
            GT - VIP - Drones
          </div>
        </div>
        <div>
          <ul className="hidden sm:flex gap-2">
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
            {session && (
              <li
                className="hover:bg-slate-200 hover:border-orange-200 hover:rounded-lg p-2 hover:border cursor-pointer mr-2"
                onClick={() => signOut()}
              >
                Sign out
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
