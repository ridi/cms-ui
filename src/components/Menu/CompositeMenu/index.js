import React from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup, Card } from 'reactstrap';
import { getPassThroughProps } from '../../../utils/component';
import { modularizeClassNames as cm } from '../../../utils/css';
import MeButton from '../../buttons/MeButton';
import LogoutButton from '../../buttons/LogoutButton';
import FilterableMenu from '../FilterableMenu';

export default class CompositeMenu extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    items: FilterableMenu.propTypes.items,
  };

  static defaultProps = {
    className: undefined,
    items: FilterableMenu.defaultProps.items,
  };

  render() {
    const { className, items } = this.props;

    return (
      <Card className={cm(className, 'composite_menu')} {...getPassThroughProps(this)}>
        <ButtonGroup className={cm('button_group')} size="sm">
          <MeButton tag="a" color="link" />
          <LogoutButton tag="a" color="link" />
        </ButtonGroup>

        <FilterableMenu items={items} />
      </Card>
    );
  }
}
