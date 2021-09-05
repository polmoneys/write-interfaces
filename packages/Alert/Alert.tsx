/**
 *
 * May the gods bless @reach and @react-aria 🙏🏽
 * https://reach.tech/ and https://react-spectrum.adobe.com/react-aria/
 *
 */

import { default as AlertBase } from '@reach/alert';
import { DefaultProps } from '@/core/types';
import { clxs } from '@/utils/className';
import { is } from '@/utils/is';
import styles from './Alert.module.css';

interface Props extends Pick<DefaultProps, 'id' | 'className' | 'children'> {
    /** defaults to 'polite' so does not interrupt user */
    type?: 'assertive' | 'polite';
    /** defaults to 'transparent' */
    variant?: 'error' | 'success' | 'transparent';
}

function Alert(props: Props) {
    const { children, className, variant = 'transparent', type = 'polite' } = props;
    const isError = is(variant, 'error');
    const isSuccess = is(variant, 'success');

    const rootStyles = clxs(styles.root, className, isError && styles.error, isSuccess && styles.success);

    return (
        <AlertBase type={type} className={rootStyles}>
            {children}
        </AlertBase>
    );
}
export default Alert;
