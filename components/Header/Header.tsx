import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import styled from 'styled-components';

import menuList from '../../data/menuList.json';
import { AppHeightAction } from '../../store/appHeight';

import LogoIcon from '../../public/static/images/logo.svg'
import UserContainer from '../../containers/UserContainer';

type colorType = {
  route: string;
};

const Container = styled.div<colorType>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 57px;
  padding-top: 2px;
  border-bottom: 1px solid #E5E5E5;
  .header {
    justify-content: center;
    align-items: center;
  }
  .header-left {
    width: 292px;
    display: flex;
    justify-content: flex-start;
    .header-logo {
      cursor: pointer;
    }
  }
  .header-middle {
    display: flex;
    justify-content: center;
    width: 790px;
    ul {
      display: flex;
      height: 100%;
      list-style: none;
      padding: 0;
      margin: 0;
      .menu-item {
        float: left;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 100%;
        .selected-menu-bar {
          visibility: hidden;
          width: 80px;
          height: 3px;
          background: ${(props) => props.route === '/ground' ? '#219653' : '#2F80ED'};;
        }
        .selected {
          visibility: visible;
          font-weight: bold;
          color: ${(props) => props.route === '/ground' ? '#219653' : '#2F80ED'};
        }
        .selected-menu-button {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 90px;
          height: 54px;
          font-size: 16px;
        }
        .selected-menu-button:hover + .selected-menu-bar {
          visibility: visible;
          color: #2F80ED;
          opacity: 0.7;
        }
        .selected-menu-button:hover {
          opacity: 0.7;
        }
        .ground-menu-font {
          font-weight: bold;
          color: #219653;
        }
        .ground-menu-background {
          background: #219653;
        }
      }
    }
  }
  .header-right {
    width: 292px;
    display: flex;
    justify-content: flex-end;
  }
`;

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const containerRef: any = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (containerRef.current) {
      dispatch(AppHeightAction.setHeaderHeight(containerRef.current.offsetHeight));
    }
  }, [containerRef.current]);

  return (
    <Container
      ref={containerRef}
      route={router.pathname}
    >
      <div className='header header-left'>
        <LogoIcon
          className='header-logo'
          onClick={() => router.push({
            pathname: '/'
          })}
        />
      </div>
      <div className='header header-middle'>
        <ul>
          {
            menuList.map(menu => {
              return (
                <li
                  className='menu-item'
                  key={menu.title}
                >
                  {
                    menu.isServerSideRendering ? (
                      <a
                        href={menu.route}
                        className={`
                          selected-menu-button
                          ${router.pathname === menu.route ? ' selected' : ''}
                          ${menu.route === '/ground' ? ' ground-menu-font' : ''}
                        `}
                      >
                        {
                          menu.title
                        }
                      </a> ) : (
                      <Link href={menu.route}>
                        <a className={`
                            selected-menu-button
                            ${router.pathname === menu.route ? ' selected' : ''}
                            ${menu.route === '/ground' ? ' ground-menu-font' : ''}
                          `}
                        >
                          {
                            menu.title
                          }
                        </a>
                      </Link>
                    )
                  }
                  <div
                    className={`
                      selected-menu-bar
                      ${router.pathname === menu.route ? 'selected' : ''}
                      ${menu.route === '/ground' ? ' ground-menu-background' : ''}
                    `}
                  />
                </li>
              );
            })
          }
        </ul>
      </div>
      <div className='header header-right'>
        <UserContainer />
      </div>
    </Container>
  );
};

export default Header;
