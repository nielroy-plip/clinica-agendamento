import styled from 'styled-components';

export const Card = styled.div`
  background: white;
  border-radius: ${props => props.theme.radii.xl};
  padding: 1.5rem;
  box-shadow: ${props => props.theme.shadows.md};
  border: 1px solid ${props => props.theme.colors.gray[200]};

  &: hover {
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;
