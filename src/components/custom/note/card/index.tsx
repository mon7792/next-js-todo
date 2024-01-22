import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

type NoteCardProps = {
  uid: string;
  title: string;
  description: string;
};

export default function NoteCard({ uid, title, description }: NoteCardProps) {
  // truncate description to 15 chars
  const desc =
    description.length > 15
      ? description.substring(0, 15) + "..."
      : description;
  return (
    <Link href={`/note/${uid}`}>
      <Card className="cursor-pointer hover:bg-accent">
        <CardContent className="p-2">
          <div className="text-2xl">{title}</div>
          <div className="text-base text-slate-400">{desc}</div>
        </CardContent>
      </Card>
    </Link>
  );
}
