import React from 'react';
import Button from '../../../UI/Button';
import Input from '../../../UI/Input';

import styles from './Controls.module.scss';

const Controls = ({ setQty, qty, decreaseQty, increaseQty }) => (
        <div className={styles.Controls}>
            <Button
                clsName={styles.SetQuantity}
                clickHandler={decreaseQty}
            >-</Button>
            <Input
                changeValue={setQty}
                value={qty}
            />
            <Button
                clsName={styles.SetQuantity}
                clickHandler={increaseQty}
            >+</Button>
        </div>
    );

export default Controls;