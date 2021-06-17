import styled from "styled-components";

const SearchContainer = styled.div`
  border: none;
  background: #e7e1e0;
  border-radius: 40px;
  padding: 5px 10px;
  display: flex;
  width: min-content;
  @media screen and (max-width: 1030px) {
    width: 100%;
    box-sizing: border-box;
  }
`;

const SearchField = styled.input`
  border: none;
  background: #e7e1e0;
  width: 200px;
  height: 24px;
  &:focus {
    outline: none;
  }
  @media screen and (max-width: 1030px) {
    width: calc(100% - 30px);
    
  }
`;

const SearchBtn = styled.button`
  border: none;
  background: url(./search.svg);
  width: 24px;
  height: 24px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

export default function Search({
  value,
  onChange,
  onSubmit,
  onKeyDown,
  ...props
}) {
  return (
    <SearchContainer>
      <SearchField
        value={value}
        onKeyDown={onKeyDown}
        onChange={onChange}
        {...props}
      ></SearchField>
      <SearchBtn onClick={() => onSubmit()}></SearchBtn>
    </SearchContainer>
  );
}
