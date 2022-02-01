import { useState } from 'react';
import styles from '../styles/modules/Mdx.module.scss';

const Mdx = () => {
    const [textValue, setTextValue] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(textValue);
    };

    return (
        <div>
            <h2>MDX</h2>
            <form>
                <textarea
                    className={styles.textarea}
                    value={textValue}
                    onChange={(e) => setTextValue(e.currentTarget.value)}
                    placeholder="When I type something here and click on the button, it will covert it into html and display it below this element!"
                />
                <button type="submit" onClick={onSubmit}>
                    Convert to MDX
                </button>
            </form>
        </div>
    );
};

export default Mdx;
