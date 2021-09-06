import { Fragment } from 'react';
import ultramin from 'prism-react-renderer/themes/ultramin';
import Highlight, { defaultProps } from 'prism-react-renderer';
import { HelveticaNeueBold, HelveticaNeue } from '@/composed';

const Code = ({ children }) => {
    return (
        <Fragment>
            <div
                className="landscape-only"
                style={{
                    width: '100%',
                    maxWidth: '750px',
                    border: 'var(--component-border-width) solid currentColor',
                    boxShadow: 'var(--component-shadow)',
                }}
            >
                <Highlight {...defaultProps} theme={ultramin} code={children} language="javascript">
                    {({ className, style, tokens, getLineProps, getTokenProps }) => (
                        <pre
                            className={className}
                            style={{
                                ...style,
                                padding: '1.2em',
                                borderRadius: '4px',
                                wordBreak: 'break-all',
                                whiteSpace: 'pre-wrap',
                            }}
                        >
                            {tokens.map((line, i) => (
                                <div key={i} {...getLineProps({ line, key: i })}>
                                    {/* <span style={{ minWidth: '30px', display: 'inline-flex' }}>{i + 1}</span> */}
                                    {line.map((token, key) => (
                                        <span key={key} {...getTokenProps({ token, key })} />
                                    ))}
                                </div>
                            ))}
                        </pre>
                    )}
                </Highlight>
            </div>
            <div className="portrait-only">
                <HelveticaNeueBold>Code snippet hidden </HelveticaNeueBold>
                <HelveticaNeue>Your screen is too small.</HelveticaNeue>
            </div>
        </Fragment>
    );
};

export default Code;
