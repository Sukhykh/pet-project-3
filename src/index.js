import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/App.jsx';

import './assets/scss/general/_normalize.scss';
import './assets/scss/general/_reset.scss';
import './assets/scss/general/_basic.scss';
import './assets/scss/general/theme.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
