import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import './navigationBar.styles.scss';
import React from "react";

const NavigationBar = () => {
    return (
      <React.Fragment>
        <div className="navigation">
            <Link className='logo-container' to='/'>
              <CrownLogo/>
            </Link>
            <div className="nav-links-container">
                <Link className='nav-link' to='shop'>
                SHOP
                </Link>
                <Link className='nav-link' to='sign-in'>
                SIGN IN
                </Link>
            </div>
        </div>
        <Outlet />
      </React.Fragment>
    );
  };

  export default NavigationBar;