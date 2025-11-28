export const metadata = {
  title: "Landing Page",
};

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Layers, Pen, Pencil, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full ">
      <section className="w-full flex justify-center items-center h-[50vh] md:h-[70vh] ">
        <div className="flex flex-col justify-center items-center  w-full gap-4">
          <div className="flex flex-col justify-center items-center">
            <h1 className="font-bold text-4xl tracking-tight mb-2 sm:text-5xl md:text-6xl lg:text-7xl">
              Manage Your Content With Ease
            </h1>
            <p className="max-w-[700px] text-muted-foreground mx-auto">
              Streamline your content workflow, publish with confidence
            </p>
          </div>
          <div className="flex gap-3">
            <Button asChild>
              <Link href="/sign-in">Try it out!</Link>
            </Button>
            <Button variant={"outline"}>Learn More</Button>
          </div>
        </div>
      </section>
      <section className="min-h-[50vh] bg-gray-600/10 sm:min-h-[50vh] flex flex-col items-center justify-center h-[50vh] px-4">
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-2 md:grid-cols-3">
          <span className="flex flex-col justify-center items-center">
            <Pencil size={50} />
            <h1 className="text-xl font-bold text-foreground">
              Intuitive Editor
            </h1>
            <p className="text-gray-400 text-center w-[70%]">
              Create and edit content with user friendly interface
            </p>
          </span>
          <span className="flex flex-col justify-center items-center">
            <Layers size={50} />
            <h1 className="text-xl font-bold text-gray-100">Flexibal Tools</h1>
            <p className="text-gray-400 text-center w-[70%]">
              Create and edit content with user friendly interface
            </p>
          </span>
          <span className="flex flex-col justify-center items-center">
            <Zap size={50} />
            <h1 className="text-xl font-bold text-gray-100">Blazing Fast</h1>
            <p className="text-gray-400 text-center w-[70%]">
              Create and edit content with user friendly interface
            </p>
          </span>
        </div>
      </section>
      <section className="flex flex-col h-[50vh] sm:h-[50vh] w-full justify-center items-start">
        <div className="w-[50%] mx-auto space-y-3">
          <h4 className="text-2xl ">
            Ready To Transform Your Content Journey{" "}
          </h4>
          <p className="text-sm text-gray-400">
            Join thousends of content creators{" "}
          </p>
          <div className="flex gap-2">
            <Input type="email" placeholder="Enter Email" />
            <Button variant={"outline"}>Submit</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
