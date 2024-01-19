import { UserButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="h-screen">
      <h1>Hello</h1>
      <Button variant="outline">Button</Button>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
