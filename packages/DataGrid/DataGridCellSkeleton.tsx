import Skeleton from '../Skeleton/Skeleton';

interface Props {
    lines?: number;
    fill: string;
}
function DatGridCellSkeleton(props: Props) {
    return (
        <div style={{ width: '100%', maxWidth: '210px' }} aria-hidden="true">
            <Skeleton {...props} />
        </div>
    );
}

export default DatGridCellSkeleton;
