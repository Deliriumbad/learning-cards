import React from 'react';

import Button from '../../components/Button/Button';
import Checkbox from '../../components/CheckBox/Checkbox';
import InputText from '../../components/InputText/InputText';

import style from './Test.module.css';

const Test = () => {
    return (
        <div className={style.test}>
            <h1>Test</h1>
            <div className={style.inputGroup}>
                <InputText />
                <InputText />
            </div>
            <div className={style.btnGroup}>
                <Button>SUBMIT</Button>
                <Checkbox />
            </div>
        </div>
    );
};

export default Test;
