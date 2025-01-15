import { useEffect, useState } from "react";
import "./styles.css";

type PaginationType = {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  buttonsQnt: number;
};

const DOT3 = "...";

const Pagination = ({
  pageNumber,
  pageSize,
  totalPages,
  last,
  first,
  setPage,
  buttonsQnt,
}: PaginationType) => {
  const numbers: number[] = retornarListaNumeros({
    totalPages,
    pageSize,
    pageNumber,
    buttonsQnt,
  });
  const [paginatedItems, setPaginatedItems] = useState<any[]>([]);

  useEffect(() => {
    setPaginatedItems(add3Dot(numbers));
  }, [pageNumber, totalPages]);

  const nextPage = () => {
    pageNumber < totalPages - 1 && setPage((prevPage): any => prevPage + 1);
  };

  const prevPage = () => {
    pageNumber > 0 && setPage((prevPage): any => prevPage - 1);
  };

  const goPage = (number: number) => {
    setPage(number);
  };
  return (
    <>
      <div className="pagination">
        <div
          onClick={prevPage}
          className={`btn-change-page ${first ? "disabled" : ""}`}
        >
          <i className="fa-solid fa-arrow-left"></i>
        </div>
        {paginatedItems.map((paginatedItem, index): any => (
          <div
            className={`${
              paginatedItem === DOT3 ? "pagination-dot3" : "pagination-item"
            }  ${paginatedItem - 1 === pageNumber ? "active" : ""}`}
            key={index}
            onClick={() => goPage(paginatedItem - 1)}
          >
            {paginatedItem !== DOT3 ? (
              paginatedItem
            ) : (
              <i className="fa-solid fa-ellipsis"></i>
            )}
          </div>
        ))}
        <div
          onClick={nextPage}
          className={`btn-change-page ${last ? "disabled" : ""}`}
        >
          <i className="fa-solid fa-arrow-right"></i>
        </div>
      </div>
    </>
  );
};

export { Pagination };

const retornarListaNumeros = ({
  totalPages,
  pageSize,
  pageNumber,
  buttonsQnt,
}: any): number[] => {
  const numbers: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (pageSize === 1) {
      numbers.push(i);
      break;
    }
    if (i === 1) {
      numbers.push(i);
      continue;
    }
    if (i >= pageNumber + 1 - buttonsQnt && i <= pageNumber + 1 + buttonsQnt) {
      numbers.push(i);
      continue;
    }

    if (i === totalPages) {
      numbers.push(i);
      continue;
    }
  }

  return numbers;
};

const add3Dot = (numbersList: any) => {
  if (numbersList[1] - numbersList[0] > 1) {
    numbersList.splice(1, 0, DOT3);
  }

  if (
    numbersList[numbersList.length - 1] - numbersList[numbersList.length - 2] >
    1
  ) {
    numbersList.splice(numbersList.length - 1, 0, DOT3);
  }

  return numbersList;
};
