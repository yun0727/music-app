import { tw } from "@/twMerge";
import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useState,
} from "react";
import ArrowIcon from "@/assets/icons/play_arrow.svg?react";

const menuContext = createContext<{
  openSubmenuKey: string | null;
  onChangeOpenSubmenuKey: (openSubmenuKey: string | null) => void;
  onClose: () => void;
}>({
  openSubmenuKey: null,
  onChangeOpenSubmenuKey: () => {},
  onClose: () => {},
});

function Menu({
  className,
  children,
  onClose,
}: Cn<PropsWithChildren<{ onClose: () => void }>>) {
  const [openSubmenuKey, setOpenSubmenuKey] = useState<string | null>(null);
  const handleClose = () => {
    setOpenSubmenuKey(null);
    onClose();
  };
  return (
    <menuContext.Provider
      value={{
        openSubmenuKey,
        onChangeOpenSubmenuKey: setOpenSubmenuKey,
        onClose: handleClose,
      }}
    >
      <div
        className={tw(
          "absolute left-0 right-0 bg-gray600 border-2  border-[#D9D9D9]",
          className
        )}
      >
        {children}
      </div>
    </menuContext.Provider>
  );
}

function MenuItem({
  label,
  value,
  onSelect,
  children,
}: PropsWithChildren<{
  label: ReactNode;
  value: string;
  onSelect?: (value: string) => void;
}>) {
  const { onChangeOpenSubmenuKey, openSubmenuKey, onClose } =
    useContext(menuContext);

  const handleClick = () => {
    onSelect?.(value);
    if (children) {
      onChangeOpenSubmenuKey(openSubmenuKey === value ? null : value);
    } else {
      onClose();
    }
  };
  return (
    <div className="w-[275px] relative">
      <button className="p-8 " onClick={handleClick}>
        {label}
        {!!children && <ArrowIcon className="absolute top-8 right-7" />}
      </button>
      {!!children && openSubmenuKey === value && children}
      {/* {children} */}
    </div>
  );
}

function SubMenu({ children }: PropsWithChildren) {
  return (
    <div className="relative h-0 w-full">
      <div className="absolute right-full -top-13 bg-gray600 border-2 border-[#D9d9d9">
        {children}
      </div>
    </div>
  );
}

Menu.MenuItem = MenuItem;
Menu.Submenu = SubMenu;

export default Menu;
