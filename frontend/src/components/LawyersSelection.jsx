import React from "react";
import styled from "styled-components";
import { SubmitButton } from "../pages/PeticoesStyles";

const Container = styled.div`
  padding: 2rem;
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

/**
 * Componente para seleção de advogados
 */
export default function LawyersSelection({ lawyers, selected, setSelected, onNext }) {
    const toggle = (id) => {
      if (selected.includes(id)) setSelected(selected.filter(x => x !== id));
      else setSelected([...selected, id]);
    };

    return (
      <Container>
        <h2>Selecione os Advogados</h2>
        <CheckboxGroup>
          {lawyers.map((adv) => (
            <label key={adv.id}>
              <input
                type="checkbox"
                checked={selected.includes(adv.id)}
                onChange={() => toggle(adv.id)}
              />{' '}
              {adv.nome} — OAB/{adv.uf} {adv.oab}
            </label>
          ))}
        </CheckboxGroup>
        <SubmitButton
          disabled={selected.length === 0}
          onClick={onNext}
          style={{ marginTop: '1rem' }}
        >
          Próximo
        </SubmitButton>
      </Container>
  );
}