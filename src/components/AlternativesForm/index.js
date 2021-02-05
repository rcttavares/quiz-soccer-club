import styled from 'styled-components';

const AlternativesForm = styled.form`
  label {
    &[data-selected="true"] {
      color: black;
      background-color: ${({ theme }) => theme.colors.wrong};
      box-shadow: inset 2px 2px 1px black;
      
      &[data-status="SUCCESS"] {
        color: ${({ theme }) => theme.colors.contrastText};
        background-color: ${({ theme }) => theme.colors.success};
        box-shadow: inset 2px 2px 1px black;
      }
      
      &[data-status="ERROR"] {
        color: ${({ theme }) => theme.colors.contrastText};
        background-color: ${({ theme }) => theme.colors.error};
        box-shadow: inset 2px 2px 1px black;
      }
    }

    &:focus {
      opacity: 0.8;
    } 
  }

  button {
    margin-top: 24px;
  }
`;

export default AlternativesForm;
