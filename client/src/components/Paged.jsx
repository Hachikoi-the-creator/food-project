import React from "react";
import { GenericFlexContainer, ButtonsList } from "./styles/FilterStuff";

export default function Paged({ total, page, setPage }) {
  const totalPages = Math.ceil(total / 10);

  // offset of +1 to start on page 1 end on totalPages+1
  return (
    <GenericFlexContainer className="pages-section">
      <ButtonsList className="pages-btns">
        {/* START */}
        {page >= 4 && (
          <li>
            <button onClick={() => setPage(0)}>{"<<"}</button>
          </li>
        )}

        {/* page - 2 */}
        {page >= 3 && (
          <li>
            <button onClick={() => setPage((prev) => prev - 2)}>
              {page - 2}
            </button>
          </li>
        )}

        {/* page - 1 */}
        {page >= 2 && (
          <li>
            <button onClick={() => setPage((prev) => prev - 1)}>
              {page - 1}
            </button>
          </li>
        )}
        <li>
          <button className="curr-page">{page}</button>
        </li>

        {/* page + 1 */}
        {page + 2 <= totalPages && (
          <li>
            <button onClick={() => setPage((prev) => prev + 1)}>
              {page + 1}
            </button>
          </li>
        )}

        {/* page + 2 */}
        {page + 3 <= totalPages && (
          <li>
            <button onClick={() => setPage((prev) => prev + 2)}>
              {page + 2}
            </button>
          </li>
        )}

        {/* END */}
        {page + 4 <= totalPages && (
          <li>
            <button onClick={() => setPage(totalPages - 1)}>{">>"}</button>
          </li>
        )}
      </ButtonsList>
    </GenericFlexContainer>
  );
}
