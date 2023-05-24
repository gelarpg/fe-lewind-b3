import React from 'react';
import JumboNavSection from "@jumbo/components/JumboVerticalNavbar/JumboNavSection";
import JumboNavCollapsible from "@jumbo/components/JumboVerticalNavbar/JumboNavCollapsible";
import JumboNavItem from "@jumbo/components/JumboVerticalNavbar/JumboNavItem";
import { withRoles } from "app/components/withRoles";

const NAV_VARIANTS = {
    'section': JumboNavSection,
    'collapsible': JumboNavCollapsible,
    'nav-item': JumboNavItem
};

const JumboNavIdentifier = ({item, isNested, translate, ...props}) => {
    const {isSuperAdmin, isAdminDireksi, isAdminFinance, isAdminOperasional, isAdminPerencanaan} = props;
    if(!item) return null;

    if(item.type && ['section', 'collapsible', 'nav-item'].includes(item.type)) {
        if (!isSuperAdmin && item.id === "users") return null;
        if (!isSuperAdmin && item.id === "loginActivity") return null;
        if (!isSuperAdmin && !isAdminFinance && !isAdminPerencanaan && item.id === "generated-invoice") return null;
        if (!isAdminFinance && !isSuperAdmin && item.id === "invoices") return null;
        if (!isSuperAdmin && !isAdminDireksi && item.id === "master-data") return null;
        if (!isSuperAdmin && !isAdminDireksi && !isAdminPerencanaan && item.id === "licenses") return null;
        const NavComponent = NAV_VARIANTS[item.type];
        return <NavComponent translate item={item} isNested={isNested}/>
    }
};

JumboNavIdentifier.defaultProps = {
    isNested: false
};

export default withRoles(JumboNavIdentifier);