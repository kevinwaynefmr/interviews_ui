import * as React from 'react';
import * as styles from './style.scss';
import * as placeholderSrc from '../../../static/images/placeholder.png';

export namespace Simple1 {
  export interface Props {
    value: string;
  }
}

export function Simple1(props: Simple1.Props) {
  return (
    <React.Fragment>
      <div className={styles.class1}>1</div>
      <div className={styles.class2}>2</div>
      <div>{props.value}</div>
      <img src={placeholderSrc}/>
    </React.Fragment>
  );
}
