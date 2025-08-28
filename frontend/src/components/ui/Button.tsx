import styled from 'styled-components';
import { Theme } from '../../styles/theme';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = styled.button<ButtonProps>`
display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: ${props => props.theme.radii.lg};
  font-family: ${props => props.theme.fonts.body};
  font-weight: ${props => props.theme.fontWeights.semibold};
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  outline: none;
  
  /* Variantes */
  ${props => {
    switch (props.variant) {
      case 'secondary':
        return `
          background-color: ${props.theme.colors.primary[500]};
          color: white;
          &:hover {
            background-color: ${props.theme.colors.primary[600]};
          }
        `;
      case 'outline':
        return `
          background-color: transparent;
          color: ${props.theme.colors.dental[600]};
          border: 2px solid ${props.theme.colors.dental[500]};
          &:hover {
            background-color: ${props.theme.colors.dental[500]};
            color: white;
          }
        `;
      default: // primary
        return `
          background-color: ${props.theme.colors.dental[500]};
          color: white;
          &:hover {
            background-color: ${props.theme.colors.dental[600]};
          }
        `;
    }
  }}
  
  /* Tamanhos */
  ${props => {
    switch (props.size) {
      case 'sm':
        return `
          padding: 0.5rem 1rem;
          font-size: ${props.theme.fontSizes.sm};
        `;
      case 'lg':
        return `
          padding: 1rem 2rem;
          font-size: ${props.theme.fontSizes.lg};
        `;
      default: // md
        return `
          padding: 0.75rem 1.5rem;
          font-size: ${props.theme.fontSizes.base};
        `;
    }
  }}
  
  /* Estados */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &:focus-visible {
    outline: 2px solid ${props => props.theme.colors.dental[500]};
    outline-offset: 2px;
  }
`;