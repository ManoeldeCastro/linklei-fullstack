import logo from '../../../public/assets/logo.svg'

export const Header = () => {
  return (
    <header className="bg-light border-bottom card-header">
      <div className="d-flex align-items-center justify-content-between">
        <img src={logo} alt="" />
        <button>Logout</button>
      </div>
    </header>
  );
};