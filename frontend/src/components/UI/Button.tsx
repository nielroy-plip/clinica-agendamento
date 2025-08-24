import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary';
  disable?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disable = false
}) => {
  return (
    <button
    type={type}
    onClick={onClick}
    className={`btn btn-${variant}`}
    disable={disable}
    >
    {children}
    </button>
  );
};

export default Button;