import React from "react";
import {
  SearchWrapper,
  SearchInputWrapper,
  SearchInput,
  SearchIcon,
  CreateButton
} from "../pages/PeticoesStyles";

export default function SearchBar({ searchTerm, setSearchTerm, onCreateClick }) {
  return (
    <SearchWrapper>
      <SearchInputWrapper>
        <SearchIcon />
        <SearchInput
          type="text"
          placeholder="Buscar petições..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchInputWrapper>

      <CreateButton onClick={onCreateClick}>
        Gerar / Criar Petição
      </CreateButton>
    </SearchWrapper>
  );
}
