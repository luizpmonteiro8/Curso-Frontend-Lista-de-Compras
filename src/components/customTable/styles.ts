import styled from "styled-components";

const TableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHeader = styled.th`
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.headerTable};
  border: 1px solid #ddd;
  text-align: left;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const TableCell = styled.td`
  padding: 12px;
  border: 1px solid #ddd;

  color: ${({ theme }) => theme.colors.text};
`;

export { TableCell, TableContainer, TableHeader };
