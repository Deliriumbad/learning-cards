import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

import s from "./Button.module.css";

type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type SuperButtonPropsType = DefaultButtonPropsType & {
  red?: boolean;
};

const Button: React.FC<SuperButtonPropsType> = ({
  red,
  className,
  ...restProps
}) => {
  const finalClassName = `${red ? s.red : s.default} ${className}`;

  return <button className={`${finalClassName} ${s.button}`} {...restProps} />;
};

export default Button;
