import React from 'react';
import { Button } from 'reactstrap';
import faUserCircle from '@fortawesome/fontawesome-free-solid/faUserCircle';
import FA from '../FontAwesome';

export default function MeButton(props) {
  return (
    <Button href="/me" {...props}>
      <FA icon={faUserCircle} /> 개인정보 수정
    </Button>
  );
}
