import React, { useState } from 'react';

import img from '../../../common/img/edit-2.png';

import s from './style.module.css';

export const EditName = () => {
    const [editMode, setEditMode] = useState(false);
    const handlerDivMode = () => {
        setEditMode(false);
    };
    const handlerInputMode = () => {
        setEditMode(true);
    };
    return (
        <div>
            {editMode ?
                <div className={`${s.name} ${s.inputStyle}`}>
                <input onBlur={handlerDivMode} autoFocus className={s.inputStyle}/>
                </div>
                :
                <div className={s.edit_name} onDoubleClick={handlerInputMode}>
                    <div className={s.name}>Ivan</div>
                    <div className={s.div_img}>
                        <img src={img} alt='' />
                    </div>
                </div>
            }
        </div>
    );
};
