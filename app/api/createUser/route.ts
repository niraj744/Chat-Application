import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import axios from "axios";
import { redirect } from "next/navigation";

export const GET = async () => {
  const { getUser } = getKindeServerSession();
  const data = await getUser();
  const res = await axios.post(
    "http://localhost:8080/api/auth/checkauth",
    data
  );
  if (res.status >= 200) return redirect("/");
};
