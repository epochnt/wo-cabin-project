import styled from "styled-components";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../features/authentication/hooks";
import Spinner from "./Spinner";

const Fullpage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function ProtectedLayout({ children }) {
  const { isPending, isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isPending) navigate("/login");
  }, [isAuthenticated, isPending, navigate]);

  if (isPending)
    return (
      <Fullpage>
        <Spinner />
      </Fullpage>
    );

  if (isAuthenticated) return children;
}
