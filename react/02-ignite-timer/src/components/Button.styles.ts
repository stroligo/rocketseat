import styled, { css } from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';
interface ButtonContainerProps {
  variant: ButtonVariant;
}

const buttonVariants = {
  primary: '#8257e6',
  secondary: '#6a6180',
  danger: '#e83f5b',
  success: '#04d361',
};

export const ButtonContainer = styled.button<ButtonContainerProps>`
  padding: 16px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.9);
  }

  background-color: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.white};

  /*   ${(props) => {
    return css`
      background-color: ${buttonVariants[props.variant]};
    `;
  }} */
`;
