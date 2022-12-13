import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react';

import s from './Checkbox.module.scss';

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
        <input
            id="checkbox"
            type="checkbox"
            onChange={onChangeCallback}
            className={finalInputClassName}
            {...restProps}
        />
    );
};

export default Checkbox;
