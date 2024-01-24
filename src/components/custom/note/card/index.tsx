import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

type NoteCardProps = {
  uid: string;
  title: string;
  description: string;
  completed: boolean;
};

export default function NoteCard({
  uid,
  title,
  description,
  completed,
}: NoteCardProps) {
  // truncate description to 15 chars
  const desc =
    description.length > 15
      ? description.substring(0, 15) + "..."
      : description;
  return (
    <Link href={`/note/${uid}`}>
      <Card className="cursor-pointer hover:bg-accent">
        <CardContent className="p-2">
          <div className="flex justify-between">
            <div className="text-2xl">{title}</div>
            {/* if completed green dot else oranfge dot */}
            {completed ? (
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            ) : (
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            )}
          </div>

          <div className="text-base text-slate-400">{desc}</div>
        </CardContent>
      </Card>
    </Link>
  );
}
