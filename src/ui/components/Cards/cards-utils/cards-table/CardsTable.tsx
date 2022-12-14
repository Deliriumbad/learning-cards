import { setSortCards } from 'bll/reducers/cards-reducer';
import { useAppDispatch, useAppSelector } from 'bll/store/hooks';
import { useParams } from 'react-router-dom';
import styles from 'styles/Table.module.scss';
import CardDeleteModal from 'ui/components/Modals/CardDeleteModal/CardDeleteModal';
import CardEditModal from 'ui/components/Modals/CardEditModal/CardEditModal';
import { formatDate } from 'utils/formatDate';

const CardsTable = () => {
    const dispatch = useAppDispatch();
    const params = useParams();

    const userId = useAppSelector(state => state.login.userData._id);
    const sortCards = useAppSelector(state => state.cards.cardsParams.sortCards);
    const cards = useAppSelector(state => state.cards.cards);
    const currentCard = useAppSelector(state =>
        state.cards.cards.find(card => card.cardsPack_id === params.packId),
    );

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
                    {userId === currentCard?.user_id && <th>Actions</th>}
                </tr>
            </thead>

            <tbody className={styles.tbody}>
                {cards.map(card => {
                    return (
                        <tr key={card._id}>
                            <td>{card.question}</td>
                            <td>{card.answer}</td>
                            <td>{formatDate(card.updated)}</td>
                            <td>{card.grade}</td>

                            {userId === card.user_id && (
                                <td>
                                    <CardDeleteModal id={card._id} />
                                    <CardEditModal id={card._id} />
                                    <div />
                                </td>
                            )}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default CardsTable;
