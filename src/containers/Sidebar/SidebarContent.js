import { Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import CustomScrollbars from "util/CustomScrollbars";
import {
  // NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  // NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE
} from "../../constants/ThemeSetting";
import IntlMessages from "../../util/IntlMessages";
import SidebarLogo from "./SidebarLogo";

const SidebarContent = ({sidebarCollapsed, setSidebarCollapsed}) => {
  const {themeType} = useSelector(({settings}) => settings);
  const pathname = useSelector(({common}) => common.pathname);

  // const getNoHeaderClass = (navStyle) => {
  //   if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
  //     return "gx-no-header-notifications";
  //   }
  //   return "";
  // };

  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split('/')[1];

  return (
    <>
      <SidebarLogo sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed}/>
      <div className="gx-sidebar-content">
        {/*<div className={`gx-sidebar-notifications ${getNoHeaderClass(navStyle)}`}>*/}
        {/*  <AppsNavigation/>*/}
        {/*</div>*/}
        <CustomScrollbars className="gx-layout-sider-scrollbar">
          <Menu
            defaultOpenKeys={[defaultOpenKeys]}
            selectedKeys={[selectedKeys]}
            theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
            mode="inline">

            <Menu.Item key="disease-specific">
              <Link to="/disease-specific"><i className="icon icon-widgets"/>
                <span><IntlMessages id="sidebar.samplePage"/></span>
              </Link>
            </Menu.Item>

          </Menu>
        </CustomScrollbars>
      </div>
    </>
  );
};

export default React.memo(SidebarContent);

