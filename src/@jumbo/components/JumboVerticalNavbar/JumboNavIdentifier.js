import React from 'react';
import JumboNavSection from "@jumbo/components/JumboVerticalNavbar/JumboNavSection";
import JumboNavCollapsible from "@jumbo/components/JumboVerticalNavbar/JumboNavCollapsible";
import JumboNavItem from "@jumbo/components/JumboVerticalNavbar/JumboNavItem";
import useJumboAuth from "@jumbo/hooks/useJumboAuth";

const NAV_VARIANTS = {
    'section': JumboNavSection,
    'collapsible': JumboNavCollapsible,
    'nav-item': JumboNavItem
};

const JumboNavIdentifier = ({item, isNested, translate}) => {
    const {authUser} = useJumboAuth();
    if(!item) return null;

    if(item.type && ['section', 'collapsible', 'nav-item'].includes(item.type)) {
        if (authUser?.roles_id !== 1 && item.uri === "/users") return null;
        const NavComponent = NAV_VARIANTS[item.type];
        return <NavComponent translate item={item} isNested={isNested}/>
    }
};

JumboNavIdentifier.defaultProps = {
    isNested: false
};

export default JumboNavIdentifier;