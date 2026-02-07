import { useLogout } from "./hooks";

import { HiArrowRightOnRectangle } from "react-icons/hi2";
import SpinnerMini from "../../ui/SpinnerMini";
import ButtonIcon from "../../ui/ButtonIcon";

export default function Logout() {
  const { logout, isLoggingOut } = useLogout();
  return (
    <ButtonIcon onClick={logout} disabled={isLoggingOut}>
      {!isLoggingOut ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}
