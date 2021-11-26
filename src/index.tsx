import React from 'react';
import ReactDOM from 'react-dom';
import { registerLocale } from 'react-datepicker';
import cs from 'date-fns/locale/cs';

import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { LOCALE } from './constants';

registerLocale(LOCALE, cs);

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
