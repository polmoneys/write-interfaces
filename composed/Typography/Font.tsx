import Font, { Props } from '@/packages/Font/Font';
import styles from './Font.module.css';

const HelveticaNeue = (props: Props) => <Font {...props} compose={styles.helveticaNeue} />;
const HelveticaNeueMedium = (props: Props) => <Font {...props} compose={styles.medium} />;
const HelveticaNeueBold = (props: Props) => <Font {...props} compose={styles.bold} />;
const HelveticaNeueThin = (props: Props) => <Font {...props} compose={styles.thin} />;
const Grotesk = (props: Props) => <Font {...props} compose={styles.grotesk} />;

export { Grotesk, HelveticaNeue, HelveticaNeueMedium, HelveticaNeueBold, HelveticaNeueThin };
