import { FC } from "react";
import {
  PageButton,
  PageButtonContainer,
  PageButtons,
  PageInfo,
  PageInfoContainer,
  PaginationContainer,
} from "./styles";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const CustomPagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  const generatePageButtons = () => {
    const buttons = [];
    const maxButtons = 10;
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));

    if (totalPages - startPage < maxButtons - 1) {
      startPage = Math.max(1, totalPages - maxButtons + 1);
    }

    for (
      let i = startPage;
      i <= Math.min(totalPages, startPage + maxButtons - 1);
      i++
    ) {
      buttons.push(
        <PageButton
          key={i}
          onClick={() => handlePageChange(i)}
          style={{ fontWeight: i === currentPage ? "bold" : "normal" }}
        >
          {i}
        </PageButton>
      );
    }

    return buttons;
  };

  return (
    <PaginationContainer>
      <PageButtonContainer>
        <PageButton
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          &lt;&lt; {/* Botão para ir para a primeira página */}
        </PageButton>

        <PageButtons>{generatePageButtons()}</PageButtons>

        <PageButton
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          &gt;&gt; {/* Botão para ir para a última página */}
        </PageButton>
      </PageButtonContainer>

      <PageInfoContainer>
        <PageInfo>
          Página {currentPage} de {totalPages}
        </PageInfo>
      </PageInfoContainer>
    </PaginationContainer>
  );
};

export default CustomPagination;
