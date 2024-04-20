import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

interface SideBarSingleItemProps {
  title: string;
  icon: IconProp;
  url: string;
}
export default function SideBarSingleItem(props: SideBarSingleItemProps) {
  return (
    <div
      role="button"
      className="flex items-center w-full py-3 leading-tight transition-all rounded-lg text-accent outline-none text-start hover:bg-accent/20 p-2 hover:bg-opacity-20"
    >
      <div className="grid mr-4 place-items-center text-accent">
        <FontAwesomeIcon icon={props.icon} className="w-4 h-4" />
      </div>
      <Link href={props.url}>{props.title}</Link>
    </div>
  );
}
