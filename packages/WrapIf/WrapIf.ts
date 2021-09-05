/**
 *
 * Can't remember source 🙏🏽
 *
 */

import { cloneElement } from 'react';

export type Props = {
    /* If true, wrap with container */
    condition: boolean;
    /* Wrapper/Container */
    container: (child: JSX.Element) => JSX.Element;
    /* JSX */
    children: JSX.Element;
};

const WrapIf = (args: Props) => {
    const { condition, children, container } = args;
    return condition ? cloneElement(container(children)) : children;
};

export default WrapIf;
