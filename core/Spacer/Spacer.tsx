import { clxs } from '@/utils/className';
import { is } from '@/utils/is';
import styles from './Spacer.module.css';

export type Props =
    | {
          /** How much vertical space should take in px */
          space: number;
          em?: never;
          /** Show at orientation media query only*/
          show?: 'portrait' | 'landscape';
      }
    | {
          /** How much vertical space should take in px */
          space?: never;
          em: string;
          /** Show at orientation media query only*/
          show?: 'portrait' | 'landscape';
      }
    | {
          space?: never;
          em?: never;
          /** Show at orientation media query only*/
          show?: 'portrait' | 'landscape';
      };

const Spacer = (props: Props) => {
    const { space, em, show } = props;
    const onPortrait = is(show, 'portrait');
    const onLandscape = is(show, 'landscape');
    const rootStyles = clxs(styles.spacer, onPortrait && styles.portraitOnly, onLandscape && styles.landscapeOnly);
    return (
        <span
            className={rootStyles}
            style={{
                ...(space && { minHeight: `${space}px` }),
                ...(em && { minHeight: `${em}em` }),
            }}
            aria-hidden="true"
        />
    );
};

export default Spacer;
