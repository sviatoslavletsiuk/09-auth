import { cookies } from "next/headers";
import { ReactNode } from "react";
import { proxy } from "@/proxy";

export default async function PrivateLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  await proxy({ cookiesString: cookies().toString(), privateRoute: true });

  return (
    <>
      {children}
      {modal}
    </>
  );
}
