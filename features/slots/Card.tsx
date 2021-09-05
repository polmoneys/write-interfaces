import Image from 'next/image';
import { ButtonAccent, HelveticaNeue, HelveticaNeueBold } from '@/composed';
import { SlotItemProps, Col, Spacer, Slots } from '@/core/';
import { LoremMD } from '@/utils/strings';

const Artwork = () => (
    <div style={{ height: '100%', position: 'relative' }}>
        <Image
            layout="fill"
            objectFit="cover"
            objectPosition="top center"
            alt=" "
            src="https://pbs.twimg.com/profile_images/1396773723609387008/4OIYafWJ_400x400.jpg"
        />
    </div>
);

const Content = () => (
    <Col>
        <HelveticaNeueBold as="h2" size={34}>
            I'm a Slots component in disguise.
        </HelveticaNeueBold>
        <Spacer space={10} />
        <HelveticaNeue>{LoremMD}</HelveticaNeue>
        <Spacer space={10} />
        <HelveticaNeue>{LoremMD}</HelveticaNeue>
    </Col>
);

export default function SlotCard() {
    const slotsPortrait: Array<SlotItemProps> = [
        {
            id: '0',
            label: '',
            children: <Artwork />,
            x: [1, 7],
            y: [1, 4],
        },
        {
            id: '3',
            label: '',
            children: <Content />,
            x: [1, 7],
            y: [4, 6],
        },
        {
            id: '4',
            label: '',
            children: <ButtonAccent className="stretch-width-recursive unset-height">Main Action</ButtonAccent>,
            placement: 'end',
            x: [1, 7],
            y: [6, 7],
        },
    ];
    const slotsLandscape: Array<SlotItemProps> = [
        {
            id: '1',
            label: '',
            children: <Artwork />,
            x: [1, 4],
            y: [1, 7],
        },
        {
            id: '2',
            label: '',
            children: <Content />,
            x: [4, 7],
            y: [1, 6],
        },
        {
            id: '4',
            label: '',
            children: <ButtonAccent className="stretch-width-recursive unset-height">Main Action</ButtonAccent>,
            placement: 'end',
            x: [4, 7],
            y: [6, 7],
        },
    ];

    return <Slots portrait={slotsPortrait} landscape={slotsLandscape} x={6} y={6} gap="1em" />;
}
