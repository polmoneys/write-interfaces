import { ReactNode } from 'react';
import { Col, Slots, SlotItemProps } from '@/core';
import { HelveticaNeueBold } from '@/composed';
import { Shape } from '@/packages';

interface Props {
    sides?: number;
    size?: number;
    fill: string;
    color: string;
    children: ReactNode | HTMLElement;
}

function BadgeShape(props: Props) {
    const { sides = 3, size = 128, fill = 'currentColor', children, color = 'currentColor' } = props;

    const slots: Array<SlotItemProps> = [
        {
            id: '1',
            label: '',
            children: (
                <Col className="cross-center">
                    <Shape sides={sides} size={size} fill={fill} />
                </Col>
            ),
            placement: 'center',
            x: [1, 2],
            y: [1, 2],
        },
        {
            id: '2',
            label: '',
            children: (
                <HelveticaNeueBold size={34} dangerousColor={color} className="font-center stretch-width">
                    {children}
                </HelveticaNeueBold>
            ),
            placement: 'center',
            x: [1, 2],
            y: [1, 2],
        },
    ];

    return <Slots portrait={slots} landscape={slots} x={1} y={1} gap="0" />;
}

export default BadgeShape;
