import { updateParamsCards } from 'bll/reducers/cards-reducer';
import { setSortPacks } from 'bll/reducers/packs-reducer';
import { useAppDispatch, useAppSelector } from 'bll/store/hooks';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Learn } from 'ui/assets/icons/learn.svg';
import DeleteModal from 'ui/components/Modals/DeleteModal/DeleteModal';
import EditModal from 'ui/components/Modals/EditModal/EditModal';

import { PATH } from '../../../routes/RoutesPath';
import { formatDate } from '../../../utils/formatDate';
import MiniSpinner from '../../common/MiniSpinner/MiniSpinner';

import styles from './Table.module.scss';

const PackTable = () => {
    const packs = useAppSelector(state => state.packs.cardPacks);
    const sortPacks = useAppSelector(state => state.packs.packParams.sortPacks);
    const isLoading = useAppSelector(state => state.packs.packParams.isLoading);
    const userId = useAppSelector(state => state.login.id);

    const dispatch = useAppDispatch();

    const onOpenPackHandler = (packId: string) => {
        dispatch(updateParamsCards({ cardsPack_id: packId }));
    };

    const onChangePacksSortHandler = (sortType: string) => {
        if (sortPacks === '0' + sortType) {
            dispatch(setSortPacks(`1${sortType}`));
        } else {
            dispatch(setSortPacks(`0${sortType}`));
        }
    };

    return (
        <table>
            <thead className={styles.thead}>
                <tr>
                    <th onClick={() => onChangePacksSortHandler('name')}>Name &#8681;</th>
                    <th onClick={() => onChangePacksSortHandler('cardsCount')}>Cards &#8681;</th>
                    <th onClick={() => onChangePacksSortHandler('created')}>
                        Last updated &#8681;
                    </th>
                    <th onClick={() => onChangePacksSortHandler('updated')}>Created by &#8681;</th>
                    <th>Actions</th>
                </tr>
            </thead>
            {isLoading ? (
                <MiniSpinner />
            ) : (
                <tbody>
                    {packs.map(pack => (
                        <tr key={pack._id}>
                            <td>{pack.name}</td>
                            <td>{pack.cardsCount}</td>
                            <td>{formatDate(pack.updated)}</td>
                            <td>{pack.user_name}</td>
                            <td>
                                <NavLink
                                    onClick={() => {
                                        onOpenPackHandler(pack._id);
                                    }}
                                    to={PATH.cards}
                                >
                                    <Learn className={styles.icon} />
                                </NavLink>
                                {userId === pack.user_id && (
                                    <>
                                        <DeleteModal id={pack._id} />
                                        <EditModal id={pack._id} />
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            )}
        </table>
    );
};

export default PackTable;
