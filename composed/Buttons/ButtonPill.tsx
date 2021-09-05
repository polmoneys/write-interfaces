import Button, { Props as ButtonProps } from '@/packages/Button/Button';

function ButtonPill(props: ButtonProps) {
    return <Button {...props} variant="pill" />;
}

export default ButtonPill;
