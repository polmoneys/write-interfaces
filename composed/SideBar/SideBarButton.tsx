import { useEffect, useState, ReactNode } from 'react';
import Button from '@/packages/Button/Button';
import { is } from '@/utils/is';
import { clxs } from '@/utils/className';
import styles from './SideBar.module.css';

export type SideBarStates = 'none' | 'compact' | 'full';

interface Props {
    initial: SideBarStates;
    /** cb  */
    onChange: (state?: SideBarStates) => void;
}

const SideBarButton = (props: Props) => {
    const { initial = 'compact', onChange = () => ({}) } = props;

    const [render, setRender] = useState<Array<ReactNode>>();

    useEffect(() => {
        if (is(initial, 'compact')) {
            setRender([
                <Button onTap={() => onChange('none')} ring={false}>
                    Hide
                </Button>,
                <Button onTap={() => onChange('full')} ring={false}>
                    Full
                </Button>,
            ]);
        }

        if (is(initial, 'none')) {
            setRender([
                <Button onTap={() => onChange('compact')} ring={false}>
                    Show
                </Button>,
            ]);
        }
        if (is(initial, 'full')) {
            setRender([
                <Button onTap={() => onChange('none')} ring={false}>
                    Hide
                </Button>,
            ]);
        }
    }, [initial]);

    const buttonClassName = clxs(styles.rootButton, is(initial, 'compact') && styles.narrow, is(initial, 'none') && styles.none);

    return <div className={buttonClassName}>{render}</div>;
};

export default SideBarButton;
