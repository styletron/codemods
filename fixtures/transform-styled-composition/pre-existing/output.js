import { styled, withStyle as woot } from "styletron-react";
const Foo = styled('div', {
  color: 'red'
});
const Bar = woot(Foo, {
  background: 'red'
});
