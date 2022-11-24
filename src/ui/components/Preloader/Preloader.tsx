import React from 'react';

import preloader_spinner from '../../assets/images/preloader_spinner.svg';

const Preloader = () => {
    return (
        <div style={{ position: 'fixed', top: '45%', left: '5%', width: '90%' }}>
            <img
                src={preloader_spinner}
                style={{ width: 100, backgroundColor: 'transparent' }}
                alt="img"
            />
        </div>
    );
};

export default Preloader;
