import React from 'react';

import preloader_spinner from '../../../common/img/preloader_spinner.svg';

const Preloader = () => {
    return (
        <div style={{ position: 'fixed', top: '50%', textAlign: 'center', width: '90%' }}>
            <img
                src={preloader_spinner}
                style={{ width: 100, backgroundColor: 'transparent' }}
                alt="img"
            />
        </div>
    );
};

export default Preloader;
