import { compose, mapProps, setDisplayName, setPropTypes, wrapDisplayName } from 'recompose';

function mapClassName(className = '') {
  return (props) => {
    const {
      className: originalClassName = '',
      ...restProps
    } = props;

    return ({
      ...restProps,
      className: `${originalClassName} ${className}`,
    });
  };
}

export default function addClassName(className) {
  return (Component) => {
    const enhance = compose(
      setPropTypes(Component.propTypes),
      mapProps(mapClassName(className)),
    );

    const WrappedComponent = enhance(Component);

    if (process.env.NODE_ENV !== 'production') {
      const wrappedName = wrapDisplayName(Component, 'addClassName');
      return setDisplayName(wrappedName)(WrappedComponent);
    }

    return WrappedComponent;
  };
}
