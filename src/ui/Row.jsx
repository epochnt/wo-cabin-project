import { css, styled } from "styled-components";

const Row = styled.div.attrs((props) => ({
  type: props.type || "vertical",
}))`
  display: flex;
  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}

  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}
`;

export default Row;
