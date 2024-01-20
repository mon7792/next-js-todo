import { FC } from "react";
import { LucideProps } from "lucide-react";

type IconProps = {
  icon: FC<LucideProps>;
  size: number;
  className: string;
};
export const Icon = ({ icon: Icon, className, size }: IconProps) => {
  return <Icon size={size} className={className} />;
};
