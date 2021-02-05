import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  box-shadow: inset -2px -2px 1px black;
  color: ${({ theme }) => theme.colors.contrastText};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 0;
  width: 100%;
  padding: 10px 15px;
  font-weight: bold;
  font-size: 15px;
  line-height: 1;
  text-transform: uppercase;
  outline: 0;
  transition: .3s;
  cursor: pointer;

  &:hover {
    opacity: .8;
  }

  &:focus {
    box-shadow: inset 2px 2px 1px black;
  }
  
  &:disabled {
    background-color: #979797;
    box-shadow: inset -2px -2px 1px black;
    cursor: not-allowed;
  }
`;

Button.propTypes = {
  type: PropTypes.oneOf(['submit', 'type', 'button']).isRequired,
  children: PropTypes.node.isRequired,
};

export default Button;
