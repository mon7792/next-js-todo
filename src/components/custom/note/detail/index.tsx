"use client";
import { useState, useOptimistic, useTransition } from "react";
import { Card, CardContent, CardDescription } from "@/components/ui/card";

import { Note } from "@/types/note";

import Image from "next/image";

type NoteDetailProps = {
  note: Note;
  completed?: boolean;
  setCompleted?: (status: boolean) => Promise<void>;
};

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

// sample async function with timmer of 2 sec
const asyncFunction = () => {
  return new Promise((resolve) =>
    setTimeout(() => resolve(console.log("asyncFunction started")), 2000)
  );
};

const asyncThrowErrFunction2 = () => {
  return new Promise((resolve, reject) =>
    setTimeout(() => reject(console.error("asyncFunction throw erroe")), 2000)
  );
};

// sample reducer function to toggle the state
const toggleReducer = (state: boolean) => !state;

export function NoteDetialsOpts({
  note,
  completed,
  setCompleted,
}: NoteDetailProps) {

  const [isPending, startTransition] = useTransition();
  const [optCheck, setOptCheck] = useOptimistic(
    (completed as boolean) || false,
    toggleReducer
  );

  console.log("optCheck: ", optCheck);  


  const toggleOptimistically = async () => {
    startTransition(() => {
      setOptCheck(!optCheck);
    });
    
    if (!setCompleted) return;
    await setCompleted(!optCheck);
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-row-reverse gap-2">
          <Switch
            className="data-[state=checked]:bg-green-500"
            id="completed"
            defaultChecked={note.completed as boolean}
            checked={optCheck}
            onCheckedChange={toggleOptimistically}
          />
          <Label htmlFor="completed">
            Status:
            {optCheck ? "true" : "false"}
          </Label>
        </div>
        <CardDescription>{note.description}</CardDescription>
        {note.receipt && note.receipt.length > 0 && (
          <Image
            width={200}
            height={200}
            src={note.receipt as string}
            alt={note.title}
          />
        )}

        <div className="flex flex-row-reverse">
          {optCheck ? (
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          ) : (
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function NoteDetail({ note }: NoteDetailProps) {
  const [check, setCheck] = useState(note.completed as boolean);

  const setCompleted = async (status: boolean): Promise<void> => {
    setCheck(!check);
    try {
    await asyncThrowErrFunction2();
    } catch (error) {
      setCheck(prev => !prev);
      console.error(error);
    }
  };

  return (
    <NoteDetialsOpts
      note={note}
      completed={check}
      setCompleted={setCompleted}
    />
  );
}

// function useOptimistic(defaultValue: boolean) {
//   const [state, setState] = useState(defaultValue);

//   const toggleOptimistically = async (asyncFunction: () => Promise<any>) => {
//     // Optimistically toggle the state
//     setState(!state);

//     try {
//       // Execute the async function
//       await asyncFunction();
//       console.log("asyncFunction completed");
//     } catch (error) {
//       // If the async function fails, revert the state
//       setState(state);
//       console.error(error);
//     }
//   };

//   return [state, toggleOptimistically] as const;
// }
