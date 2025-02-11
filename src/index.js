import React from 'react';
import ReactDOM from 'react-dom';
import InventoryApp from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<InventoryApp />, document.getElementById('root'));

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(() => console.log('Service Worker Registered'))
        .catch(err => console.log('Service Worker Registration Failed:', err));
}
