import styled from 'styled-components';

const Widget = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
  border: 3px solid black;
  background-color: ${({ theme }) => theme.colors.mainBg};
  box-shadow: inset -4px -4px 1px #1A5276;
  border-radius: 20px;
  overflow: hidden;

  h1, h2, h3 {
    font-size: 16px;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 0;
  }

  p {
    font-size: 15px;
    font-weight: 400;
    line-height: 1;
  }
`;

Widget.Header = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-transform: uppercase;
  padding: 18px 32px;
  background-color: ${({ theme }) => theme.colors.primary};
  box-shadow: inset -4px 0px 1px #922B21;
  
  * {
    margin: 0;
  }
`;

Widget.Content = styled.div`
  padding: 24px 32px 32px 32px;

  & > *:first-child {
    margin-top: 0;
  }

  & > *:last-child {
    margin-bottom: 0;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
`;

Widget.Topic = styled.a`
  outline: 0;
  text-decoration: none;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.contrastText};
  background-color: ${({ theme }) => theme.colors.primary};
  box-shadow: inset -2px -2px 1px black;
  padding: 10px 15px;
  margin-bottom: 10px;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: .3s;
  display: block;
  
  &:hover {
    opacity: .8;
    background-color: #EFD249;
    color: black;
  }

  &:focus {
    box-shadow: inset 2px 2px 1px black;
    background-color: #EFD249;
    color: black;
  }
`;

export default Widget;
