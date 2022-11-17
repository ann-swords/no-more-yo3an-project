import React, { useState } from 'react';
import ReactiveButton from 'reactive-button';

function ReApp() {
    const [state, setState] = useState('idle');

    const onClickHandler = () => {
        setState('loading');
        setTimeout(() => {
            setState('success');
        }, 2000);
    }

    return (
        <ReactiveButton
            buttonState={state}
            onClick={onClickHandler}
        />
    );
}

export default ReApp;