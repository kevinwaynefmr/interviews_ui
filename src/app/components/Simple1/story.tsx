import {Simple1} from './index';
import * as React from 'react';
import {text} from '@storybook/addon-knobs';

export default {
  title: 'Simple1',
  component: Simple1,
};


export const Configured = () => <Simple1 value="3"/>;

export const Knobx = () => <Simple1 value={text('value', 'test value')}/>;
