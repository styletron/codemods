import { styled, withStyle } from "styletron-react";
const Foo = styled('div', {
  color: 'red'
});
const Bar = withStyle(Foo, {
  background: 'red'
});
