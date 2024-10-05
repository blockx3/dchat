"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useRouter } from "next/navigation";
import DeletePdf from "./DeletePdf";
import { Menu } from "lucide-react";
import { useState } from "react";

interface Collection {
  id: string;
  CollectionName: string;
  userID: string;
  pdfName: string;
}

interface CollectionListProps {
  list: Collection[];
  collectionName: string
}

export function SheetSide({ list,collectionName }: CollectionListProps) {
  const router = useRouter();
  const [activeCollection, setActiveCollection] = useState<string | null>(collectionName);

  function handleClick(CollectionName: string) {
    setActiveCollection(CollectionName);
    router.push(`/chat/${CollectionName}`);
  }

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
            <Menu className="text-white" />
        </SheetTrigger>
        <SheetContent side="left">
          <div className="text-white text-3xl py-10">
            Chat History
          </div>
          {list.map((collection) => {
            const isActive = activeCollection === collection.CollectionName;
            
            return (
              <div key={collection.id}>
                <SheetHeader className="flex items-center">
                  <Button
                    onClick={() => handleClick(collection.CollectionName)}
                    className={`p-4 w-64 ${
                      isActive
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-400 hover:bg-gray-600'
                    }`}
                  >
                    <SheetTitle> {collection.pdfName} </SheetTitle>
                  </Button>
                  <SheetDescription>
                    <DeletePdf collectionName={collection.CollectionName} />
                  </SheetDescription>
                </SheetHeader>
              </div>
            );
          })}
          <SheetFooter>
            <SheetClose asChild>
              <Button
                className=" hover:bg-gray-300 hover:font-bold bg-white"
                type="submit"
              >
                X
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
