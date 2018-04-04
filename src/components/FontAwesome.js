import React from 'react';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import * as fa from '@fortawesome/fontawesome-free-solid';

fontawesome.library.add(...fa);

export default function FontAwesome(props) {
  return <FontAwesomeIcon fixedWidth {...props} />;
}
