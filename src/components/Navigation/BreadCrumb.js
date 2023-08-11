import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb } from "antd";

const BreadCrumbComponent = ({ separator, navigation }) => {
  return (
    <div className="gx-d-flex gx-justify-content-between gx-align-items-center">
    <Breadcrumb separator={separator || ">"} className="mb-2">
      {navigation.map((item, i) => {
        return (
          <Breadcrumb.Item key={i}>
            {item.link ? (
              <Link to={item.link}>
                <span className="gx-link gx-link-breadcrumb">{item.title}</span>
              </Link>
            ) : (
              <span className="gx-link-breadcrumb">{item.title} </span>
            )}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
    </div>
  );
};
export default BreadCrumbComponent;
