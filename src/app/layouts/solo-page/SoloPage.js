import React from "react";
import JumboLayout from "@jumbo/components/JumboLayout";
import useJumboLayout from "@jumbo/hooks/useJumboLayout";
import useJumboLayoutSidebar from "@jumbo/hooks/useJumboLayoutSidebar";
import layoutConfig from "./layoutConfig";

const SoloPage = ({children}) => {
    const {setJumboLayoutOptions} = useJumboLayout();
    const {setSidebarOptions} = useJumboLayoutSidebar();

    React.useEffect(() => {
        setJumboLayoutOptions(layoutConfig);
        setSidebarOptions({hide: true, open: false});
    }, []);

    return (
        <JumboLayout>
            {children}
        </JumboLayout>
    );
};

export default SoloPage;
