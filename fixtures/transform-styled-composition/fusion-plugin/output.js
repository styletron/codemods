import { styled, withStyle } from "fusion-plugin-styletron-react";
const Foo = styled('div', {
  color: 'red'
});
const Bar = withStyle(Foo, {
  background: 'red'
});
