import styles from '../styles/modules/Hello.module.scss';

const Hello = () => {
    let name = 'Satinder';

    return (
        <div>
            <h2 className={styles.test}>
                Content color has bee applied using css modules
            </h2>
        </div>
    );
};

export default Hello;
