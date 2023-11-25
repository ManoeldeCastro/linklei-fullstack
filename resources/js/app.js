import React from 'react';
import ReactDOM from 'react-dom';
import ExampleComponent from './ExempleComponent';

if (document.getElementById('app')) {
    ReactDOM.render(<ExampleComponent />, document.getElementById('app'));
}