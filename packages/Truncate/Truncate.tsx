import { useState, useCallback } from 'react';
import styles from './Truncate.module.css';

type ChildrenPropAsString<T = {}> = T & {
    children: string;
};

export type TruncateProps = {
    maxLength: number;
} & ChildrenPropAsString;
export type TruncateMiddleProps = {
    width: string;
} & ChildrenPropAsString;
export type TruncateFileProps = {
    extension: string;
} & ChildrenPropAsString;

export const Truncate = (props: TruncateProps) => {
    const { children, maxLength } = props;
    const [hidden, setHidden] = useState(true);
    if (children.length <= maxLength) {
        return <span>{children}</span>;
    }
    return (
        <span>
            {hidden ? `${children.substr(0, maxLength).trim()} ...` : children}
            {hidden ? (
                <button type="button" onClick={() => setHidden(false)}>
                    read more
                </button>
            ) : (
                <button type="button" onClick={() => setHidden(true)}>
                    read less
                </button>
            )}
        </span>
    );
};

export const TruncateMiddle = (props: TruncateMiddleProps) => {
    const { children, width } = props;
    const prepEllipse = (node: any) => {
            const parent = node.parentNode,
                child = parent.querySelector('.constrainedChild') /* Legacy. */ || node.childNodes[0],
                txtToEllipse = parent.querySelector('.ellipseMe') || parent.querySelector('.constrainedEllipse') /* Legacy. */ || child;

            if (child !== null && txtToEllipse !== null) {
                // (Re)-set text back to data-original-text if it exists.
                if (txtToEllipse.hasAttribute('data-original')) {
                    txtToEllipse.textContent = txtToEllipse.getAttribute('data-original');
                }

                ellipse(
                    // Use the smaller width.
                    node.offsetWidth > parent.offsetWidth ? parent : node,
                    child,
                    txtToEllipse
                );
            }
        },
        measuredParent = useCallback((node) => {
            if (node !== null) {
                window.addEventListener('resize', () => {
                    prepEllipse(node);
                });
                prepEllipse(node);
            }
        }, []);

    return (
        <div ref={measuredParent} style={{ ...(width && { width: width }) }}>
            {children}
        </div>
    );
};

const ellipse = (parentNode: any, childNode: any, txtNode: any) => {
    const childWidth = childNode.offsetWidth,
        containerWidth = parentNode.offsetWidth,
        txtWidth = txtNode.offsetWidth,
        targetWidth = childWidth > txtWidth ? childWidth : txtWidth;
    if (targetWidth > containerWidth) {
        const str = txtNode.textContent,
            txtChars = str.length,
            avgLetterSize = txtWidth / txtChars,
            canFit = (containerWidth - (targetWidth - txtWidth)) / avgLetterSize,
            delEachSide = (txtChars - canFit + 5) / 2,
            endLeft = Math.floor(txtChars / 2 - delEachSide),
            startRight = Math.ceil(txtChars / 2 + delEachSide);

        txtNode.setAttribute('data-original', txtNode.textContent);
        txtNode.textContent = str.substr(0, endLeft) + '...' + str.substr(startRight);
    }
};

export const TruncateFile = (props: TruncateFileProps) => {
    const { children = 'this-file-has-a-really-really-really-long-filename.', extension = 'pdf' } = props;
    return (
        <div className={styles.filename}>
            <span className={styles.name}>{children}</span>
            <span className={styles.extension}>{extension}</span>
        </div>
    );
};
