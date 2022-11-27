import { updateParamsCards } from 'bll/reducers/cards-reducer';
import { setSortPacks } from 'bll/reducers/packs-reducer';
import { useAppDispatch, useAppSelector } from 'bll/store/hooks';
import { NavLink } from 'react-router-dom';
import MiniSpinner from 'ui/components/MiniSpinner/MiniSpinner';
import DeleteModal from 'ui/components/Modals/Delete/DeleteModal';
import EditModal from 'ui/components/Modals/Edit/EditModal';
import { PATH } from 'ui/Main/Routes/RoutesPath';
import { formatDate } from 'ui/utils/formatDate';

import styles from './Table.module.scss';

const PackTable = () => {
    const packs = useAppSelector(state => state.packs.cardPacks);
    const sortPacks = useAppSelector(state => state.packs.packParams.sortPacks);
    const isLoading = useAppSelector(state => state.packs.packParams.isLoading);
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
                            <td>
                                <NavLink to={PATH.cards}>
                                    <button
                                        onClick={() => {
                                            onOpenPackHandler(pack._id);
                                        }}
                                        type="button"
                                    >
                                        {pack.name}
                                    </button>
                                </NavLink>
                            </td>
                            <td>{pack.cardsCount}</td>
                            <td>{formatDate(pack.updated)}</td>
                            <td>{pack.user_name}</td>
                            <td>
                                <DeleteModal id={pack._id} />
                                <EditModal />
                            </td>
                        </tr>
                    ))}
                </tbody>
            )}
        </table>
    );
};

export default PackTable;
