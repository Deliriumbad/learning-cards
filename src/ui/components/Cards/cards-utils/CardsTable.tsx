import { setSortCards } from 'bll/reducers/cards-reducer';
import { useAppDispatch, useAppSelector } from 'bll/store/hooks';
import MiniSpinner from 'ui/common/MiniSpinner/MiniSpinner';
import CardEditModal from 'ui/components/Modals/CardEditModal/CardEditModal';
import { formatDate } from 'utils/formatDate';

import styles from './CardsTable.module.scss';

const CardsTable = () => {
    const dispatch = useAppDispatch();
    const userId = useAppSelector(state => state.login.userData._id);
    const isLoading = useAppSelector(state => state.cards.cardsParams.isLoading);
    const sortCards = useAppSelector(state => state.cards.cardsParams.sortCards);
    const packId = useAppSelector(state => state.packs.packParams.user_id);
    const cards = useAppSelector(state => state.cards.cards);

    const onChangeCardsSortHandler = (sortType: string) => {
        if (sortCards === '0' + sortType) {
            dispatch(setSortCards(`1${sortType}`));
        } else {
            dispatch(setSortCards(`0${sortType}`));
        }
    };

    return (
        <table>
            <thead className={styles.thead}>
                <tr className={styles.tr}>
                    <th
                        onClick={() => onChangeCardsSortHandler('question')}
                        className={styles.sortCell}
                    >
                        Question &#8681;
                    </th>
                    <th
                        onClick={() => onChangeCardsSortHandler('answer')}
                        className={styles.sortCell}
                    >
                        Answer &#8681;
                    </th>
                    <th
                        onClick={() => onChangeCardsSortHandler('updated')}
                        className={styles.sortCell}
                    >
                        Last updated &#8681;
                    </th>
                    <th
                        onClick={() => onChangeCardsSortHandler('grade')}
                        className={styles.sortCell}
                    >
                        Grade &#8681;
                    </th>
                    {userId === packId && <th>Actions</th>}
                </tr>
            </thead>
            {isLoading ? (
                <MiniSpinner />
            ) : (
                <tbody className={styles.tbody}>
                    {cards.map(card => {
                        return (
                            <tr key={card._id}>
                                <td>{card.question}</td>
                                <td>{card.answer}</td>
                                <td>{formatDate(card.updated)}</td>
                                <td>{card.grade}</td>
                                {userId === card.user_id && <CardEditModal id={card._id} />}
                            </tr>
                        );
                    })}
                </tbody>
            )}
        </table>
    );
};

export default CardsTable;
