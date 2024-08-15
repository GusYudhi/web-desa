import React from "react";
import Icon from "../icon/Icon";
import classNames from "classnames";
import Link from "next/link";

export const LinkItem = ({ ...props }) => {
  return (
    <li>
      {props.tag !== "a" ? (
        <Link href={process.env.PUBLIC_URL + props.link} {...props} legacyBehavior>
          {props.icon ? <Icon name={props.icon} /> : null}{" "}
          <span>{props.text || props.children}</span>
        </Link>
      ) : (
        <Link
          href={process.env.PUBLIC_URL + props.link}
          onClick={(ev) => ev.preventDefault()}
          legacyBehavior>
          {props.icon ? <Icon name={props.icon} /> : null}{" "}
          <span>{props.text || props.children}</span>
        </Link>
      )}
    </li>
  );
};

export const LinkList = ({ ...props }) => {
  const listClasses = classNames({
    "link-list": !props.opt,
    "link-list-opt": props.opt,
    [`${props.className}`]: props.className,
  });
  return (
    <ul className={listClasses} onClick={props.click}>
      {props.children}
    </ul>
  );
};