import Image from "next/image";

import { Theme } from "@/components/theme";
import { NavigateButton } from "./navigate-button";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps): JSX.Element => {
  return (
    <main className="flex flex-grow">
      <div
        className="flex w-full flex-col-reverse 
        justify-end lg:grid lg:grid-cols-2"
      >
        <div
          className="justify-center 
          container flex flex-grow 
          py-6 relative"
        >
          <NavigateButton />

          <div className="mx-auto flex w-[380px] flex-col mt-14">
            <div className="flex flex-grow flex-col justify-center">
              {children}
            </div>
            <div
              className="flex justify-start 
              gap-4 self-end mt-8"
            >
              <Theme />
            </div>
          </div>
        </div>
        <div className="relative top-0 max-h-screen min-h-[150px] bg-muted lg:sticky">
          <Image
            priority
            src={"/bg/neki-bg.webp"}
            alt="Neki Background"
            fill
            className="object-cover"
            decoding="async" // Asynchronous decoding for better performance
            sizes="(max-width:768px) 70vw, (max-width: 1200px) 80vw, 100vw"
          />

          <div className="flex justify-center items-center h-full">
            <div className="relative w-full max-w-xs h-auto">
              <Image
                priority
                src={"/logo/neki-logo.webp"}
                alt="Neki Logo"
                layout="responsive"
                width={100}
                height={100}
                className="object-contain"
                decoding="async" // Asynchronous decoding for better performance
                sizes="(max-width:768px) 70vw, (max-width: 1200px) 80vw, 100vw"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
