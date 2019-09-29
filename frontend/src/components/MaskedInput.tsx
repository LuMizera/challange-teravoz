import React from "react";
import MaskedInput from "react-text-mask";

interface OwnProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mask?: (string | RegExp)[] | undefined;
}

const Input: React.FC<OwnProps> = ({ mask, ...props }: OwnProps) => {
  return mask ? <MaskedInput mask={mask} {...props} /> : <input {...props} />;
};

Input.defaultProps = {
  mask: undefined
};

export default Input;
