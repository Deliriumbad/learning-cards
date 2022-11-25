import React, {ChangeEvent, useCallback} from 'react'
import s from './sliderRange.module.css'
import SliderDoubleRange from './SuperDoubleRange/SuperDoubleRange';


type PropsType = {
    value1: number
    value2: number
    setValue1: (value: number) => void
    setValue2: (value: number) => void
    maxNumberCards: number
};

const SliderRange: React.FC<PropsType> = ({value2, setValue2, value1, setValue1, maxNumberCards}) => {

    const onSuperDoubleRangeHandler = useCallback((nums: Array<number>) => {
        setValue1(nums[0])
        setValue2(nums[1])
    }, [])

    const filterNullHandler = () => {
        setValue1(0)
        setValue2(maxNumberCards)
    }

    const testHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue2(+e.currentTarget.value)
    }
    const testOnBlurHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (value2 < 1) {
            setValue2(maxNumberCards)
        }
    }

    return (
        <div style={{margin: '10px'}}>
            <h4 style={{margin: '0px'}}>Number of cards</h4>
            <div className={s.container}>
                <input style={{width: '36px', height: '36px', textAlign: 'center', fontSize: '16px', fontWeight: '600'}}
                       onChange={(e) => {
                           setValue1(+e.currentTarget.value)
                       }} type="text" value={value1}/>
                <SliderDoubleRange
                    max={maxNumberCards}
                    min={1}
                    value={[value1, value2]}
                    onChangeRange={onSuperDoubleRangeHandler}
                    setValue1={setValue1}
                    setValue2={setValue2}
                    value1={value1}
                    value2={value2}
                />
                <input style={{width: '36px', height: '36px', textAlign: 'center', fontSize: '16px', fontWeight: '600'}}
                       onBlur={testOnBlurHandler} onChange={testHandler} type="text" value={value2}/>
                <button style={{width: '56px', height: '36px', textAlign: 'center', fontSize: '16px', fontWeight: '600'}} onClick={filterNullHandler}>reset</button>
            </div>
        </div>
    )
}
export default SliderRange
