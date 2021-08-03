import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './container/App';

import 'antd/dist/antd.css';
import { ConfigProvider } from 'antd';
import ptBR from 'antd/lib/locale/pt_BR';

ReactDOM.render(
    <ConfigProvider locale={ptBR}>
        <App />
    </ConfigProvider>,
    document.getElementById('root')
);