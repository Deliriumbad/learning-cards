import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, memo, useEffect, useState} from 'react'
import s from './SuperRange.module.css'

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperRangePropsType = DefaultInputPropsType & { // и + ещё пропсы которых нет в стандартном инпуте
    onChangeRange?: (value: number) => void
    value?: number
    max: number
    min: number
};

const SuperRange: React.FC<SuperRangePropsType> = React.memo(({
                                                                  type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
                                                                  onChange, onChangeRange,
                                                                  className, value,
                                                                  max, min,
                                                                  ...restProps// все остальные пропсы попадут в объект restProps
                                                              }) => {


    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChangeRange && onChangeRange(+e.currentTarget.value)
    }
    const finalRangeClassName = `${s.range} ${className ? className : ''}`

    return (
        <div className={s.singleInputWrapper}>
            <div className={s.slider}>
                <input
                    step={1}
                    max={max}
                    value={value}
                    type={'range'}
                    onChange={onChangeCallback}
                    className={finalRangeClassName}
                    {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
                />
            </div>
        </div>
    )
})

export default SuperRange
