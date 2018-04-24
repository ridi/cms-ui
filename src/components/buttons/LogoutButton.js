import React from 'react';
import { Button } from 'reactstrap';
import faSignOutAlt from '@fortawesome/fontawesome-free-solid/faSignOutAlt';
import FA from '../FontAwesome';

export default function LogoutButton(props) {
  return (
    <Button href="/logout" {...props}>
      <FA icon={faSignOutAlt} /> 로그아웃
    </Button>
  );
}
