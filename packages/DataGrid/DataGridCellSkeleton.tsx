import Skeleton from '../Skeleton/Skeleton';

interface Props {
    fill: string;
    small?: boolean;
}
function DatGridCellSkeleton(props: Props) {
    return (
        <div style={{ width: '100%', maxWidth: props.small ? '50px' : '190px' }} aria-hidden="true">
            <Skeleton {...props} />
        </div>
    );
}

export default DatGridCellSkeleton;
