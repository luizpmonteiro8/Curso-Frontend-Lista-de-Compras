/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomButton } from "../customButton";
import { Spinner } from "../spinner/styles";
import { TableCell, TableContainer, TableHeader } from "./styles";

interface Props {
  headers: string[];
  data: any[][];
  isLoading?: boolean;
  onEdit?: (rowIndex: number) => void;
  onDelete?: (rowIndex: number) => void;
}

export const CustomTable = ({
  data,
  isLoading,
  headers,
  onDelete,
  onEdit,
}: Props) => {
  if (isLoading) return <Spinner />;

  if (data.length == 0 && !isLoading) return <p>Nenhum item encontrado</p>;

  return (
    <TableContainer>
      <thead>
        <tr>
          {headers.map((item, index) => (
            <TableHeader key={"header" + index}>{item}</TableHeader>
          ))}
          {(onDelete || onEdit) && <TableHeader>Ações</TableHeader>}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={"categoryTable" + rowIndex}>
            {row.map((cell, cellIndex) => (
              <TableCell key={"rowIndexCategory" + cellIndex}>{cell}</TableCell>
            ))}
            {(onDelete || onEdit) && (
              <TableCell>
                {onEdit && (
                  <CustomButton
                    onClick={() => onEdit(rowIndex)}
                    style={{ marginRight: "15px" }}
                  >
                    Editar
                  </CustomButton>
                )}
                {onDelete && (
                  <CustomButton
                    color="secondary"
                    onClick={() => onDelete(rowIndex)}
                  >
                    Remover
                  </CustomButton>
                )}
              </TableCell>
            )}
          </tr>
        ))}
      </tbody>
    </TableContainer>
  );
};
