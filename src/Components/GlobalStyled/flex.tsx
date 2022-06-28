import { css } from "styled-components";

export default function flex({
  justify = 'center"',
  align = "center",
  direction = "row",
}) {
  return css`
    display: flex;
    justify-content: ${justify};
    align-items: ${align};
    flex-direction: ${direction};
  `;
}

/* Sample */
// ${flex({ direction : 'column', gap : '24px' })}
