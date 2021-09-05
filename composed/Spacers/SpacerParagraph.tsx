import Spacer, { Props } from '@/core/Spacer/Spacer';

function SpacerParagraph(props: Omit<Props, 'space'>) {
    return <Spacer {...props} em="1.2" />;
}

export default SpacerParagraph;
