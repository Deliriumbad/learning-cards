import styles from './Packs.module.scss';

type TableT = {
    headersArray: string[];
    data: any[];
};

const Table = ({ headersArray, data }: TableT) => {
    return (
        <table>
            <thead className={styles.thead}>
                <tr>
                    {headersArray.map(header => {
                        return <th>{header}</th>;
                    })}
                </tr>
            </thead>

            <tbody>
                {data.map(element => {
                    return (
                        <tr>
                            <td>{element}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default Table;
