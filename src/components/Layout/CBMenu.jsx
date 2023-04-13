import React from 'react';
import { Link } from 'react-router-dom';

const CBMenu = () => {
  return (
    <div>
      <div className="NavBar">
        <ul>
          <Link exact to="/">
            <li>
              <a>
                <img
                  border="0"
                  alt="W3Schools"
                  src="https://d32xj74kbqkoqn.cloudfront.net/uploads/organization/org_logo/1/Mono_Wide_Light.png"
                  width="70"
                  height="25"
                />
              </a>
            </li>
          </Link>

          <Link exact to="/">
            <li>
              <img
                border="0"
                src="http://worldartsme.com/images/tent-black-and-white-clipart-1.jpg"
                width="40"
                height="20"
              />{' '}
              Home
            </li>
          </Link>

          <Link to="/Instructor">
            <li>
              <img
                border="0"
                src="https://support.zerocancer.org/custom/GG16/img/face-guy.png"
                width="30"
                height="20"
              />{' '}
              Instructor
            </li>
          </Link>

          <Link to="/Español">
            <li>Español</li>
          </Link>

          <li>
            <a>
              UserName ∨
              <img
                className="Fluff"
                border="0"
                alt="W3Schools"
                src="http://rentals.supplies/wp-content/uploads/2016/09/tech.png"
                width="40"
                height="40"
              />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CBMenu;
