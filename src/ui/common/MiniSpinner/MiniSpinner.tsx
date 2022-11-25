import React from 'react';

import s from './MiniSpinner.module.scss';

type SpinnerPropsType = {
    customMainStyle?: string;
    customSizeStyle?: string;
    customContainerStyle?: string;
};

const MiniSpinner: React.FC<SpinnerPropsType> = ({
    customMainStyle,
    customSizeStyle,
    customContainerStyle,
}) => {
    const finalMainStyle = `${s.mainBlock} ${customMainStyle || ''}`;
    const finalSizeStyle = `${s.speedingWheel} ${customSizeStyle || ''}`;
    const finalContainerStyle = `${s.container} ${customContainerStyle || ''}`;

    return (
        <div className={finalMainStyle}>
            <div className={finalContainerStyle}>
                <div className={finalSizeStyle} />
            </div>
        </div>
    );
};

export default MiniSpinner;
