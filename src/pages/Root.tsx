import react from 'react'
import { Outlet } from 'react-router-dom'

const Root:react.FC = () => {
  return (
    <>
      <nav>NAV BARRRRR</nav>
      <Outlet/>    
      <footer>Footer</footer>
    </>
  );
};
  
export { Root };
  