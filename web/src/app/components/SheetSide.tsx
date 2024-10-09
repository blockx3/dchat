"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
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
            <Menu className="cursor-pointer text-white" />
        </SheetTrigger>
        <SheetContent className="bg-[#0E0A24]" side="left">
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
                        ? 'bg-[#1b1446] hover:bg-[#3c2e9d] text-white'
                        : 'bg-[#0E0A24] hover:bg-[#13102b]'
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
        </SheetContent>
      </Sheet>
    </>
  );
}
