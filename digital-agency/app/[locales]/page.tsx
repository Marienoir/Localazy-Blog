import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import LanguageSwitcher from "./languageSwitcher";

function Home() {
  const t = useTranslations();

  return (
    <main className="max-w-5xl m-auto min-h-screen flex-col items-center justify-between pt-20 pb-24">
      <div className="max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex mb-2">
        <div className="flex items-center">
          <Image
            src="/logo.svg"
            alt="Next.js Logo"
            width={50}
            height={137}
            priority
          />
          <p>DePRO</p>
        </div>

        <div>
          <ul className="items-center justify-between font-mono text-sm lg:flex">
            <li className="px-5 border-b-2 border-red-600">{t("home")}</li>
            <li className="px-5">{t("services")}</li>
            <li className="px-5">{t("portfolio")}</li>
            <li className="px-5">{t("about")}</li>
            <li className="px-5">{t("contact")}</li>
          </ul>
        </div>
        <LanguageSwitcher />
      </div>
      <div className="max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div>
          <h1 className="text-5xl w-9/12">{t("title")}</h1>
          <button className="my-6 p-3 border-4 border-red-600 px-4">
            {t("button")}
          </button>
        </div>
        <div>
          <Image
            src="/background.svg"
            alt="Next.js Logo"
            width="500"
            height={137}
            priority
          />
        </div>
      </div>

      <div className="flex">
        <div className="p-5 bg-red-800">
          <Image src="/pd.svg" alt="Next.js Logo" width={50} height={37} />
          <p className="my-8 border-b-2 pb-2 border-red-500">
            {t("productDesignTitle")}{" "}
          </p>
          <p>{t("productDesignDescription")}</p>
        </div>
        <div className="p-5 bg-gray-900 mx-2">
          <Image src="/no-code.svg" alt="Next.js Logo" width={50} height={37} />
          <p className="my-8 border-b-2 pb-2 border-red-500">
            {t("noCodeTitle")}
          </p>
          <p>{t("noCodeDescription")}</p>
        </div>
        <div className="p-5 bg-gray-900 ">
          <Image
            src="/solution.svg"
            alt="Next.js Logo"
            width={50}
            height={37}
          />
          <p className="my-8 border-b-2 pb-2 border-red-500">
            {t("innovativeTitle")}
          </p>
          <p>{t("innovativeDescription")}</p>
        </div>
      </div>
      <div className="max-w-xl mx-auto  mt-10 mb-2 text-center">
        <p>DIGITAL SOLUTIONS</p>
        <p className="text-4xl my-5">Request More Information</p>
        <p>
          Let's embark on a journey of efficiency, growth, and digital
          excellence together. Your vision, our expertise – unlocking
          possibilities in the digital realm. Explore, evolve, elevate with
          Digital Solutions.
        </p>

        <button className="my-8 p-3 bg-red-600 px-4">Contact Us</button>

        <div className="my-6">
          <ul className="items-center justify-between font-mono text-sm lg:flex">
            <li className="px-5">Home</li>
            <li className="px-5">Services</li>
            <li className="px-5">Portfolio</li>
            <li className="px-5">About</li>
            <li className="px-5">Contact</li>
          </ul>
        </div>
      </div>
    </main>
  );
}

export default Home;
