import styled from "styled-components";

interface StyledDivProps {
  $val?: number; // Prop customizada (prefixo `$` para evitar warnings no DOM)
  children?: React.ReactNode;
}

export const Line = styled.div`
  display: flex;
`;

export const Cell = styled.div<StyledDivProps>`
  display: flex;
  width: 15px;
  text-align: center;
  font-weight: ${(props) => (props.$val !== 1 ? "bold" : "normal")};
  color: ${({ $val }) => {
    if ($val === 3) return "blue";
    if ($val === 4) return "red";
    if ($val === 5) return "green";
  }};
`;
