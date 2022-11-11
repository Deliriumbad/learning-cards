import React from 'react';
import {InputText} from "../../../main/ui/common/components/InputText/InputText";
import {Button} from "../../../main/ui/common/components/Button/Button";
import {Checkbox} from "../../../main/ui/common/components/CheckBox/Checkbox";

export const Test = () => {
    return (
        <div>
            <div>Test</div>
            <InputText />
            <InputText />
            <Button>SUBMIT</Button>
            <Checkbox/>
        </div>
    )
}