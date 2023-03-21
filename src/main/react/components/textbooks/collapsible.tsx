import React, { useState } from "react";

interface CollapsibleProps {
    title: string;
    content: string|Element;
    activeIcon?: string;
    closedIcon?: string;
}

const defaultProps = {
    activeIcon: "fa fa-chevron-down",
    closedIcon: "fa fa-chevron-right"
}

const Collapsible = ({ title, content, activeIcon, closedIcon }: CollapsibleProps & typeof defaultProps) => {
    const [active, setActive] = useState(false);
    const [icon, setIcon] = useState(closedIcon ? closedIcon : defaultProps.closedIcon)

    const handleClick = () => {
        setActive(!active);
        setIcon(active ? (closedIcon || defaultProps.closedIcon) : (activeIcon || defaultProps.activeIcon));
    }

    return (
        <>
            <button className={`accordion${active ? " active" : ""}`} onClick={handleClick}>
                {title}
                <i className={icon}></i>
            </button>
            { active &&
                <div className="panel">{content}</div>
            }
        </>
    )
}

export default Collapsible;