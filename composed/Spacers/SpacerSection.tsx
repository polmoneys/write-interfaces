import Spacer, { Props } from '@/core/Spacer/Spacer';

function SpacerSection(props: Omit<Props, 'em'>) {
    return <Spacer {...props} space={34} />;
}

export default SpacerSection;
