import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react';

import s from './Checkbox.module.css';

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type SuperCheckboxPropsType = DefaultInputPropsType & {
  onChangeChecked?: (checked: boolean) => void;
  spanClassName?: string;
};

const Checkbox: React.FC<SuperCheckboxPropsType> = ({
  type,
  onChange,
  onChangeChecked,
  className,
  spanClassName,
  children,
  ...restProps
}) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);
    onChangeChecked && onChangeChecked(e.currentTarget.checked);
  };

  const finalInputClassName = `${s.checkbox} ${className || ''}`;

  return (
    <label htmlFor="checkbox" className={s.checkboxLabel}>
      <input
        id="checkbox"
        type="checkbox"
        onChange={onChangeCallback}
        className={finalInputClassName}
        {...restProps}
      />
      {children && <span className={s.spanClassName}>{children}</span>}
    </label>
  );
};

export default Checkbox;
