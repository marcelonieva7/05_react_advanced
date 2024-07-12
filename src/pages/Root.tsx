import { Footer } from 'components/footer/footer';
import { Header } from 'components/header/header';
import react from 'react'
import { Outlet } from 'react-router-dom'

const Root:react.FC = () => {
  return (
    <>
      <Header />
      <Outlet/>    
      <Footer />
    </>
  );
};
  
export { Root };
  