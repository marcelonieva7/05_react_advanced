import react from 'react'
import { Footer } from '@/components/footer/footer';
import { Header } from '@/components/header/header';
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
  