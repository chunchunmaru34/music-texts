type DisplayOnConditionProps = {
    children: JSX.Element;
    condition: boolean;
};

export const DisplayOnCondition = ({
    children,
    condition
}: DisplayOnConditionProps) => condition && children;
