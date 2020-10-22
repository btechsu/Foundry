function ConditionalWrap({ condition, wrap, children }) {
  return condition ? wrap(children) : children ? children : null;
}

export default ConditionalWrap;
