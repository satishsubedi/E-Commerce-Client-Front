import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DropDown = ({ logout }) => {
  const { user } = useSelector((state) => state.user);
  const firstLetter = user?.fName ? user.fName.charAt(0).toUpperCase() : "U";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="rounded-full w-6 h-6 flex items-center justify-center bg-blue-600 text-white font-bold p-0"
          variant="ghost"
        >
          {firstLetter}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 mr-4" align="start">
        <DropdownMenuLabel className="font-bold">
          {user?.fName}'s Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile Settings</DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/orderHistory">My Orders</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDown;
