import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'

import App from './App';

import './index.scss';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    // <React.StrictMode>
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter basename="/test-task-softryzen-frontend-event-planner">
                <App />
            </BrowserRouter>
        </PersistGate>
    </Provider>
    // {/* </React.StrictMode> */}
);
