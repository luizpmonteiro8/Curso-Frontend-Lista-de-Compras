/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, useEffect, useState } from "react";
import ReactSelect from "react-select";
import { Pagination, PaginationParams } from "../../api/model/pagination";
import { productService } from "../../api/services/productService";
import { Container, ErrorMessage } from "./styles";

interface ResultProps {
  results: any[];
  pagination: Pagination;
}

interface OptionType {
  value: number;
  label: string;
  image?: string;
}

interface Props {
  value?: { value: number; label: string };
  loadServicePagination: (params?: PaginationParams) => Promise<ResultProps>;
  onChange: Dispatch<React.SetStateAction<number>>;
  label: string;
  error?: string;
  renderProductImage?: boolean;
}

export const CustomDropDownPaginated = ({
  value,
  loadServicePagination: loadService,
  onChange,
  label,
  error,
  renderProductImage,
}: Props) => {
  const [options, setOptions] = useState<OptionType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    callApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const callApi = async () => {
    if (page >= totalPages) return;
    setIsLoading(true);

    try {
      const result = await loadService({ page: page });
      const newOptions = await Promise.all(
        result.results.map(async (item) => {
          if (renderProductImage) {
            if (item.image) {
              const img = await productService.serveImage(item.id);
              const imageResult = img ? URL.createObjectURL(img) : "";
              return { value: item.id, label: item.name, image: imageResult };
            }
          }
          return { value: item.id, label: item.name };
        })
      );
      setOptions((prevState) => [...prevState, ...newOptions]);
      setPage(page + 1);
      setTotalPages(result.pagination.lastPage);
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading", error);
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <label>{label}</label>
      <ReactSelect
        placeholder="Selecione"
        value={value}
        options={options}
        formatOptionLabel={(option: OptionType) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            {option.image && (
              <img
                src={option.image}
                width={50}
                height={50}
                style={{ marginRight: "10px" }}
                loading="lazy"
              />
            )}
            {option.label}
          </div>
        )}
        onChange={(data) => {
          if (data == null) return;
          const value = data.value;
          if (value) {
            onChange(value);
          }
        }}
        isLoading={isLoading}
        loadingMessage={() => "Carregando..."}
        onMenuScrollToBottom={callApi}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
};
