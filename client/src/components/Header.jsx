import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {

  const {userInfo} = useSelector((state)=>state.auth);

  return (
    <header className='navbar'>

          <h1>Lingo Hive</h1>
              {
              userInfo
              ? 
              (
                <>
                <h3>Hi User</h3>
                </>
              )
              : 
              (
                <>
                <div className='header-button-container'>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                </div>
                </>
              )
              }
    </header>
  );
};

export default Header;