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
        "p-4",
        isSidebarOpen ? "ml-[72px]" : "ml-0",
        "transition-transform duration-300",
        className
      )}
    >
      {children}
    </main>
  );
}
