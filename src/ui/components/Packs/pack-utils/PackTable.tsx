import { updateParamsCards } from 'bll/reducers/cards-reducer';
import { setSortPacks } from 'bll/reducers/packs-reducer';
import { useAppDispatch, useAppSelector } from 'bll/store/hooks';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Learn } from 'ui/assets/icons/learn.svg';
import PackDeleteModal from 'ui/components/Modals/PackDeleteModal/PackDeleteModal';
import PackEditModal from 'ui/components/Modals/PackEditModal/PackEditModal';

import { formatDate } from '../../../../utils/formatDate';
import MiniSpinner from '../../../common/MiniSpinner/MiniSpinner';

import styles from './PacksTable.module.scss';

const PackTable = () => {
    const packs = useAppSelector(state => state.packs.cardPacks);
    const sortPacks = useAppSelector(state => state.packs.packParams.sortPacks);
    const isLoading = useAppSelector(state => state.packs.packParams.isLoading);
    const userId = useAppSelector(state => state.login.userData._id);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onSetCurrentCardsHandler = (packId: string, path: string) => {
        dispatch(updateParamsCards({ cardsPack_id: packId }));
        navigate(`/${path}/${packId}`);
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
                    <th onClick={() => onChangePacksSortHandler('name')}>Name</th>
                    <th onClick={() => onChangePacksSortHandler('cardsCount')}>Cards </th>
                    <th onClick={() => onChangePacksSortHandler('created')}>Last updated;</th>
                    <th onClick={() => onChangePacksSortHandler('updated')}>Created by</th>
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
                                <button
                                    onClick={() => {
                                        onSetCurrentCardsHandler(pack._id, 'Cards');
                                    }}
                                    type="button"
                                >
                                    {pack.name}
                                </button>
                            </td>
                            <td>{pack.cardsCount}</td>
                            <td>{formatDate(pack.updated)}</td>
                            <td>{pack.user_name}</td>
                            <td>
                                <button
                                    onClick={() => {
                                        onSetCurrentCardsHandler(pack._id, 'learning');
                                    }}
                                    type="button"
                                >
                                    <Learn className={styles.icon} />
                                </button>

                                {userId === pack.user_id && (
                                    <>
                                        <PackDeleteModal id={pack._id} />
                                        <PackEditModal id={pack._id} />
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
