import styled from "@emotion/styled";

export const Dropdown = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 10px;
  p {
    color: black;
  }
  .Dropdown-icon {
    background-color: lightgray;
    width: 20px;
    border-radius: 20px;
    margin: 0px auto;
  }
  .dropdown-content {
    width: 400px;
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    padding: 12px 16px;
    z-index: 1;
    p {
      font-size: 16px;
    }
  }
  :hover .dropdown-content {
    display: block;
  }
`;
