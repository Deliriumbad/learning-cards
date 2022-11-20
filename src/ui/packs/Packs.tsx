import { useEffect } from 'react';

import { requestPacks } from 'bll/reducers/packs-reducer';
import { useAppDispatch, useAppSelector } from 'bll/store/hooks';

const Packs = () => {
    const packs = useAppSelector(state => state.packs.packs);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(requestPacks());
    }, []);
    return <div>{JSON.stringify(packs)}</div>;
};

export default Packs;
