import 'core-js/es6/map';
import 'core-js/es6/set';
import 'raf/polyfill';
import React from 'react';
import {render} from 'react-dom';

import '../mock/index';
import './utils/extendtools';
import './views/index.less';

import IndexComp from './views/index';

render(
    <IndexComp />,
    document.body.appendChild(document.createElement('div'))
);
