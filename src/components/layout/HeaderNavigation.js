import React, { Component } from "react";

import { NavLink } from "react-router-dom";
import logo from "../../icons/logo.svg";

import classes from "./HeaderNavigation.module.css";

class HeaderNavigation extends Component {
  render() {
    return (
      <div className={classes.container}>
        <nav className={classes.header__navigation}>
          <ul>
            {this.props.categoryList.map((category) => (
              <li key={category.name}>
                <NavLink
                  to={"/" + category.name}
                  activeClassName={classes.active}
                >
                  {category.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className={classes.logo}>
          <img src={logo} alt="refresh-logo" />
        </div>
      </div>
    );
  }
}

export default HeaderNavigation;
