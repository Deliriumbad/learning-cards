import React, { DetailedHTMLProps, HTMLAttributes, InputHTMLAttributes, useState } from 'react';

import InputText from '../InputText/InputText';

import s from './EditableSpan.module.scss';

type DefaultInputPropsType = DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>;
type DefaultSpanPropsType = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

type SuperEditableSpanType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void;
    onEnter?: () => void;
    error?: string;
    spanClassName?: string;

    spanProps?: DefaultSpanPropsType;
};

const EditableSpan: React.FC<SuperEditableSpanType> = ({
    autoFocus, // игнорировать изменение этого пропса
    onBlur,
    onEnter,
    spanProps,

    ...restProps // все остальные пропсы попадут в объект restProps
}) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const { children, onClick, className, ...restSpanProps } = spanProps || {};

    const onEnterCallback = () => {
        setEditMode(false); // выключить editMode при нажатии Enter

        onEnter && onEnter();
    };
    const onBlurCallback = (e: React.FocusEvent<HTMLInputElement>) => {
        setEditMode(false); // выключить editMode при нажатии за пределами инпута

        onBlur && onBlur(e);
    };
    const onClickCallBack = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        setEditMode(true); // включить editMode при двойном клике

        onClick && onClick(e);
    };

    return (
        <div>
            {editMode ? (
                <InputText
                    autoFocus // пропсу с булевым значением не обязательно указывать true
                    onBlur={onBlurCallback}
                    onEnter={onEnterCallback}
                    {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
                />
            ) : (
                <span
                    onClick={onClickCallBack}
                    role="button"
                    className={s.span}
                    tabIndex={0}
                    onKeyPress={() => {}}
                    {...restSpanProps}
                >
                    {/* если нет захардкодженного текста для спана, то значение инпута */}
                    {children || restProps.value} &#9998;
                </span>
            )}
        </div>
    );
};

export default EditableSpan;
