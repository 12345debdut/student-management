import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface SideBarSubItemProps {
  title: string;
  count?: string;
  url: string;
}
export default function SideBarSubItem(props: SideBarSubItemProps) {
  return (
    <div className="w-full flex py-2 px-4 hover:rounded-lg hover:bg-accent/20">
      <div className="mr-4 place-items-center text-accent">
        <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
      </div>
      <Link href={props.url} className="text-accent">
        {props.title}
      </Link>
      <div className="grid ml-auto place-items-center justify-self-end">
        <div className="relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-full select-none whitespace-nowrap text-accent">
          <span className="">{props.count}</span>
        </div>
      </div>
    </div>
  );
}
