import logo from '../images/logo.svg'

const Header = () => {
  return (
    <header className="header content content_place_header">
      <a className="page-link" href="./" target="_parent">
        <img className="logo" src={logo} alt="логотип" />
      </a>
    </header>
  );
};

export default Header