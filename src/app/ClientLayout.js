'use client';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/navbar/page';
import LoaderWrapper from '@/components/loader/wrapper';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  const isHome = pathname === '/';
  const hideLayout = pathname.startsWith('/userdashboard');
  const hideAdminLayout = pathname.startsWith('/admindashboard');

  return (
    <div
      className={
        isHome
          ? 'h-screen snap-y snap-mandatory overflow-y-scroll'
          : 'min-h-screen'
      }
    >
      {!hideLayout && !hideAdminLayout && <Navbar />}
      <LoaderWrapper>
      {children}
       <ToastContainer />
      </LoaderWrapper>
    </div>
  );
}
