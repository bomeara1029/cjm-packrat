import { Collapse } from '@material-ui/core';
import { fade, withStyles, Theme } from '@material-ui/core/styles';
import { TreeItem, TreeItemProps } from '@material-ui/lab';
import React from 'react';
import { animated, useSpring } from 'react-spring';

interface TransitionComponentProps {
    in?: boolean;
}

function TransitionComponent(props: TransitionComponentProps): React.ReactElement {
    const style = useSpring({
        from: { opacity: 0, transform: 'translate3d(20px,0,0)' },
        to: {
            opacity: props.in ? 1 : 0,
            transform: `translate3d(${props.in ? 0 : 20}px,0,0)`
        }
    });

    return (
        <animated.div style={style}>
            <Collapse {...props} />
        </animated.div>
    );
}

const StyledTreeItem = withStyles(({ palette, typography }: Theme) => ({
    iconContainer: {
        '& .close': {
            opacity: 0.3
        }
    },
    root: {
        marginTop: 5
    },
    group: {
        marginLeft: 8,
        paddingLeft: 20,
        borderLeft: `1px dashed ${fade(palette.text.primary, 0.4)}`
    },
    label: {
        fontSize: '20px',
        fontWeight: typography.fontWeightLight,
        borderRadius: 10,
        padding: '5px 12px'
    }
}))((props: TreeItemProps) => <TreeItem {...props} TransitionComponent={TransitionComponent} />);

export default StyledTreeItem;
