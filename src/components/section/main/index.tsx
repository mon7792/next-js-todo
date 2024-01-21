import { cn } from "@/lib/utils";

type MainProps = {
  className?: string;
  isSidebarOpen: boolean;
  children: React.ReactNode;
};
export default function Main({
  className,
  isSidebarOpen,
  children,
}: MainProps) {
  return (
    <main
      className={cn(
        isSidebarOpen ? "ml-[72px]" : "ml-0",
        "transition-transform",
        "container px-4",
        className
      )}
    >
      {children}
    </main>
  );
}
