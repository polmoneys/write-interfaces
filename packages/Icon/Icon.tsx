/**
 *
 * 2021. Pol Moneys
 * Icon 1.0.0
 * Feedback at polmoneys on github
 *
 */

import { Fragment } from 'react';
import styles from './Icon.module.css';

/**
 *
 * Typings
 *
 */

export type IconVariants =
    | 'down'
    | 'up'
    | 'left'
    | 'right'
    | 'chevron'
    | 'chevronUp'
    | 'chevronRight'
    | 'chevronLeft'
    | 'chevronUnconstrained'
    | 'checkbox'
    | 'checkboxMixed'
    | 'heart'
    | 'loading'
    | 'close'
    | 'more';

interface Props {
    /** Icon fill */
    fill?: string;
    /** Adjust icon with translate() and scale() */
    transforms?: string;
    /** Icon name */
    variant: IconVariants;
}

/**
 *
 * Exported component
 *
 */

const Icon = (props: Props) => {
    const { fill = 'currentColor', variant, transforms } = props;
    return (
        <Fragment>
            {
                {
                    up: (
                        <svg
                            dangerousselector-icon=""
                            className={styles.icon}
                            style={{ ...(transforms && { transform: transforms }) }}
                            width="17"
                            height="22"
                            viewBox="2 -3 17 22"
                            aria-hidden="true"
                            focusable="false"
                        >
                            <g fill="none" fillRule="evenodd">
                                <g fill={fill}>
                                    <g>
                                        <path d="M10.086-1.825l-6.8 5.6c-.345.299-.375.808-.107 1.132.269.324.808.374 1.132.106L9.798.5v16.7c0 .442.359.8.8.8.442 0 .8-.358.8-.8V.5l5.488 4.513c.324.268.859.214 1.131-.106.287-.339.218-.863-.106-1.131l-6.8-5.6c-.389-.25-.682-.218-1.025 0" />
                                    </g>
                                </g>
                            </g>
                        </svg>
                    ),
                    down: (
                        <svg
                            dangerousselector-icon=""
                            className={styles.icon}
                            style={{
                                transform: 'rotate(180deg)',
                                ...(transforms && { transform: `${transforms} rotate(180deg)` }),
                            }}
                            width="17"
                            height="22"
                            viewBox="2 -3 17 22"
                            aria-hidden="true"
                            focusable="false"
                        >
                            <g fill="none" fillRule="evenodd">
                                <g fill={fill}>
                                    <g>
                                        <path d="M10.086-1.825l-6.8 5.6c-.345.299-.375.808-.107 1.132.269.324.808.374 1.132.106L9.798.5v16.7c0 .442.359.8.8.8.442 0 .8-.358.8-.8V.5l5.488 4.513c.324.268.859.214 1.131-.106.287-.339.218-.863-.106-1.131l-6.8-5.6c-.389-.25-.682-.218-1.025 0" />
                                    </g>
                                </g>
                            </g>
                        </svg>
                    ),
                    left: (
                        <svg
                            dangerousselector-icon=""
                            className={styles.icon}
                            style={{
                                transform: 'rotate(-90deg)',
                                ...(transforms && { transform: `${transforms} rotate(-90deg)` }),
                            }}
                            width="20"
                            height="16"
                            viewBox="0 -2 17 13"
                            aria-hidden="true"
                            focusable="false"
                        >
                            <g fill="none" fillRule="evenodd">
                                <g fill={fill}>
                                    <g>
                                        <path d="M8.165-1.455L2.64 3.079c-.28.242-.304.654-.086.916.218.263.656.304.919.086L7.932.427V13.95c0 .357.29.648.65.648.359 0 .65-.29.65-.648V.427l4.458 3.654c.264.218.698.174.92-.086.233-.274.177-.699-.087-.916L8.998-1.455c-.316-.202-.554-.176-.833 0" />
                                    </g>
                                </g>
                            </g>
                        </svg>
                    ),
                    right: (
                        <svg
                            dangerousselector-icon=""
                            className={styles.icon}
                            style={{
                                transform: 'rotate(90deg)',
                                ...(transforms && { transform: `${transforms} rotate(90deg)` }),
                            }}
                            width="20"
                            height="16"
                            viewBox="0 -2 17 13"
                            aria-hidden="true"
                            focusable="false"
                        >
                            <g fill="none" fillRule="evenodd">
                                <g fill={fill}>
                                    <g>
                                        <path d="M8.165-1.455L2.64 3.079c-.28.242-.304.654-.086.916.218.263.656.304.919.086L7.932.427V13.95c0 .357.29.648.65.648.359 0 .65-.29.65-.648V.427l4.458 3.654c.264.218.698.174.92-.086.233-.274.177-.699-.087-.916L8.998-1.455c-.316-.202-.554-.176-.833 0" />
                                    </g>
                                </g>
                            </g>
                        </svg>
                    ),
                    chevron: (
                        <svg
                            dangerousselector-icon=""
                            className={styles.icon}
                            style={{ transform: 'rotate(90deg)' }}
                            width="12"
                            height="9"
                            viewBox="-3 -1 12 9"
                            aria-hidden="true"
                            focusable="false"
                        >
                            <g fill="none" fillRule="evenodd">
                                <g fill={fill}>
                                    <g>
                                        <path d="M0 1.026L2.956 4 0 6.974 1.024 8 4.49 4.513 5 4 4.49 3.487 1.025 0z" />
                                    </g>
                                </g>
                            </g>
                        </svg>
                    ),
                    chevronUp: (
                        <svg
                            dangerousselector-icon=""
                            className={styles.icon}
                            style={{ transform: 'rotate(-90deg)' }}
                            width="12"
                            height="9"
                            viewBox="-4 0 12 9"
                            aria-hidden="true"
                            focusable="false"
                        >
                            <g fill="none" fillRule="evenodd">
                                <g fill={fill}>
                                    <g>
                                        <path d="M0 1.026L2.956 4 0 6.974 1.024 8 4.49 4.513 5 4 4.49 3.487 1.025 0z" />
                                    </g>
                                </g>
                            </g>
                        </svg>
                    ),
                    chevronRight: (
                        <svg
                            dangerousselector-icon=""
                            className={styles.icon}
                            style={{ transform: 'rotate(0)' }}
                            width="12"
                            height="9"
                            viewBox="-4 0 12 9"
                            aria-hidden="true"
                            focusable="false"
                        >
                            <g fill="none" fillRule="evenodd">
                                <g fill={fill}>
                                    <g>
                                        <path d="M0 1.026L2.956 4 0 6.974 1.024 8 4.49 4.513 5 4 4.49 3.487 1.025 0z" />
                                    </g>
                                </g>
                            </g>
                        </svg>
                    ),
                    chevronLeft: (
                        <svg
                            dangerousselector-icon=""
                            className={styles.icon}
                            style={{ transform: 'rotate(-180deg)' }}
                            width="12"
                            height="9"
                            viewBox="-4 0 12 9"
                            aria-hidden="true"
                            focusable="false"
                        >
                            <g fill="none" fillRule="evenodd">
                                <g fill={fill}>
                                    <g>
                                        <path d="M0 1.026L2.956 4 0 6.974 1.024 8 4.49 4.513 5 4 4.49 3.487 1.025 0z" />
                                    </g>
                                </g>
                            </g>
                        </svg>
                    ),
                    chevronUnconstrained: (
                        <svg
                            dangerousselector-icon=""
                            style={{ display: 'inline-flex' }}
                            width="12"
                            height="9"
                            viewBox="-4 0 12 9"
                            aria-hidden="true"
                            focusable="false"
                        >
                            <g fill="none" fillRule="evenodd">
                                <g fill={fill}>
                                    <g>
                                        <path d="M0 1.026L2.956 4 0 6.974 1.024 8 4.49 4.513 5 4 4.49 3.487 1.025 0z" />
                                    </g>
                                </g>
                            </g>
                        </svg>
                    ),
                    checkbox: (
                        <svg
                            dangerousselector-icon=""
                            width="30"
                            height="30"
                            aria-hidden="true"
                            viewBox="0 0 30 30"
                            focusable="false"
                            style={{ ...(transforms && { transform: transforms }) }}
                        >
                            <g fill="none" fillRule="evenodd">
                                <g strokeLinecap="round">
                                    <path stroke={fill} strokeWidth="1" d="M4.996 8.044l3.01 2.76L13.007 6" />
                                </g>
                            </g>
                        </svg>
                    ),
                    checkboxMixed: (
                        <svg
                            dangerousselector-icon=""
                            width="30"
                            height="30"
                            fill="none"
                            viewBox="0 0 30 30"
                            aria-hidden="true"
                            focusable="false"
                            style={{ ...(transforms && { transform: transforms }) }}
                        >
                            <path stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M18.25 12.25L5.75 12.25"></path>
                        </svg>
                    ),
                    heart: (
                        <svg
                            dangerousselector-icon=""
                            style={{ display: 'inline-flex', ...(transforms && { transform: transforms }) }}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            focusable="false"
                        >
                            <rect width="24" height="24" opacity="0" />
                            <path
                                fill={fill}
                                d="M12 21a1 1 0 0 1-.71-.29l-7.77-7.78a5.26 5.26 0 0 1 0-7.4 5.24 5.24 0 0 1 7.4 0L12 6.61l1.08-1.08a5.24 5.24 0 0 1 7.4 0 5.26 5.26 0 0 1 0 7.4l-7.77 7.78A1 1 0 0 1 12 21z"
                            />
                        </svg>
                    ),
                    loading: (
                        <i
                            className={styles.spinner}
                            aria-label={`loading`}
                            style={{
                                backgroundColor: fill,
                            }}
                        />
                    ),
                    close: (
                        <svg
                            dangerousselector-icon=""
                            style={{ display: 'inline-flex', ...(transforms && { transform: transforms }) }}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke={fill}
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    ),
                    more: (
                        <svg
                            dangerousselector-icon=""
                            style={{ display: 'inline-flex', ...(transforms && { transform: transforms }) }}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={fill}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="12" cy="12" r="1"></circle>
                            <circle cx="12" cy="5" r="1"></circle>
                            <circle cx="12" cy="19" r="1"></circle>
                        </svg>
                    ),
                }[variant]
            }
        </Fragment>
    );
};

export default Icon;
