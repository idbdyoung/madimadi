import { useRouter } from 'next/dist/client/router';
import styled from 'styled-components';
import { menu as menuList } from '../data/menu.json';

type colorType = {
  route: string;
};

const Container = styled.div<colorType>`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding-top: 3px;
  border-bottom: 1px solid #E5E5E5;
  .header {
    justify-content: center;
    align-items: center;
  }
  .header-left {
    display: flex;
    flex: 1;
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
        button {
          width: 80px;
          height: 54px;
        }
        button:hover + .selected-menu-bar {
          visibility: visible;
          color: #2F80ED;
          opacity: 0.7;
        }
        button:hover {
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
    display: flex;
    flex: 1;
  }
`;

const Header: React.FC = () => {
  const router = useRouter();

  return (
    <Container route={router.pathname}>
      <div className='header header-left'>
        madimadi
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
                  <button
                    className={`
                      selected-menu-button
                      ${router.pathname === menu.route ? ' selected' : ''}
                      ${menu.route === '/ground' ? ' ground-menu-font' : ''}
                    `}
                    onClick={() => router.push(menu.route)}
                  >
                    {
                      menu.title
                    }
                  </button>
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
        계정
      </div>
    </Container>
  );
};

export default Header;
