import {LAYOUT_CONTAINER_STYLES} from "@jumbo/utils/constants/layout";
import {mainTheme} from "../themes/main/default";
import {headerTheme} from "../themes/header/default";
import {sidebarTheme} from "../themes/sidebar/default";
import {footerTheme} from "../themes/footer/default";
import LAYOUT_NAMES from "../layouts/layouts";
import {createJumboTheme} from "@jumbo/utils";
import baseAxios from "app/services/AxiosInterceptor";

const getAuthUserService = async () => {
  try {
    const {data} = await baseAxios.get('/auth/profile');
    if (data?.meta?.success) {
      return data?.data ?? null;
    }
    return null;
  } catch (error) {
    return {
      hasError: true,
      error: "Error while getting the current user"
    }
  }
};

const config = {

  defaultLayout: LAYOUT_NAMES.VERTICAL_DEFAULT,
  containerStyle: LAYOUT_CONTAINER_STYLES.FLUID,

  theme: createJumboTheme(mainTheme, headerTheme, sidebarTheme, footerTheme),
  authSetting: {
    axiosObject: baseAxios,
    fallbackPath: "/login",
    getAuthUserService: getAuthUserService,
    redirectNotAuthenticatedPath: "/dashboard",
  },
};

export {config};
