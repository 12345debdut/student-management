import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SideBarSubItem from "./SideBarSubItem";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { SideBarConfig } from "@lib/config/sideBarUtils";
import {
  Accordion,
  AccordionTrigger,
  AccordionItem,
  AccordionContent,
} from "@components/atoms/ui/accordion";

interface SideBarItemProps {
  title: string;
  icon: IconProp;
  child: SideBarConfig[];
}
export default function SideBarItem(props: SideBarItemProps) {
  return (
    <div className="relative block w-full">
      <Accordion
        type="single"
        collapsible
        className="flex min-w-[240px] flex-col gap-1 text-base font-normal"
      >
        <AccordionItem value={props.title}>
          <AccordionTrigger>
            <div className="flex items-center w-full leading-tight transition-all rounded-lg outline-none text-start">
              <div className="flex items-center justify-between w-full text-xl antialiased font-semibold leading-snug text-left transition-colors text-accent">
                <div className="grid mr-4 place-items-center">
                  <FontAwesomeIcon icon={props.icon} className="w-5 h-5" />
                </div>
                <p className="block mr-auto text-base antialiased font-normal leading-relaxed text-accent">
                  {props.title}
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="block w-full py-1 text-base antialiased font-light leading-normal">
            {props.child.map((item) => (
              <SideBarSubItem
                title={item.title}
                count={item.count}
                url={item.url}
                key={item.url}
              />
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
