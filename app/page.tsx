import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Chat from "./Components/Chat";
import Header from "./Components/Header";
import Sidenav from "./Components/Sidenav";
import { redirect } from "next/navigation";

export default async function Home() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirect("/api/auth/login");
  }
  return (
    <>
      <Header />
      <div className="flex">
        <Sidenav />
        <Chat />
      </div>
    </>
  );
}
