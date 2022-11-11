import React from 'react';
import {InputText} from "../../../main/ui/common/components/InputText/InputText";
import {Button} from "../../../main/ui/common/components/Button/Button";
import {Checkbox} from "../../../main/ui/common/components/CheckBox/Checkbox";
import style from './Test.module.css'

export const Test = () => {
    return (
        <div className={style.test}>
            <h1>Test</h1>
            <div className={style.inputGroup}>
                <InputText/>
                <InputText/>
            </div>
            <div className={style.btnGroup}>
                <Button>SUBMIT</Button>
                <Checkbox/>
            </div>
        </div>
    )
}