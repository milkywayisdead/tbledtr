import Image from "next/image";
import { TestForm } from "./ui/test";

export default function Home() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <TestForm />
    </>
  )
}