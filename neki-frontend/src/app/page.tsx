import { NextPage } from "next";
import { redirect } from "next/navigation";

const Root: NextPage = () => {
  return redirect("/login");
};

export default Root;
