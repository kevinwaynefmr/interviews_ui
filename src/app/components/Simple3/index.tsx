import * as React from 'react';
import {Simple2} from 'app/components/Simple2';
import {Simple1} from 'app/components/Simple1';

export function Simple3(props: any) {
  return (
    <React.Fragment>
      <Simple2/>
      <Simple1 value="hello"/>
    </React.Fragment>
  );
}
