import { TabsTrigger } from "@lib/components/ui/tabs";
import { EXTENSION_KEY, IExtension } from "@app/models/types";
import { useAppDispatch } from "@app/store";
import {
  closeAllTag,
  closeTag,
  closeToRight,
  moveToSecondTab,
} from "@app/store/slice";
import clsx from "clsx";
import { X } from "lucide-react";
import React from "react";
import { useDrag } from "react-dnd";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@lib/components/ui/context-menu";
interface DropResult {
  name: string;
}

const Tab = ({ tab }: { tab: IExtension }) => {
  const dispatch = useAppDispatch();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "box",
    item: { name: tab.key },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        dispatch(moveToSecondTab(item.name as EXTENSION_KEY));
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  return (
    <TabsTrigger
      value={tab.key}
      className={clsx("flex items-center gap-1", { "opacity-70": isDragging })}
      ref={drag}
      onAuxClick={(e) => {
        if (e.button === 1) {
          e.stopPropagation();
          dispatch(closeTag(tab.key));
        }
      }}
    >
      <ContextMenu>
        <ContextMenuTrigger>{tab.title}</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={() => dispatch(closeToRight(tab.key))}>
            Close to the right
          </ContextMenuItem>
          <ContextMenuItem onClick={() => dispatch(closeAllTag(tab.key))}>
            Close all
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <X
        className="w-3 h-3 hover:bg-slate-200 dark:hover:bg-slate-700 rounded z-20"
        onClick={(e) => {
          e.stopPropagation();
          dispatch(closeTag(tab.key));
        }}
      />
    </TabsTrigger>
  );
};

const TabsHeader = ({ extensions }: { extensions: IExtension[] }) => {
  return (
    <React.Fragment>
      {extensions.map((tab) => (
        <Tab tab={tab} key={tab.key} />
      ))}
    </React.Fragment>
  );
};

export default TabsHeader;
