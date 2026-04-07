import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Wraps `react-toastify`'s ToastContainer so it can be dynamic-imported
 * from `_app.tsx`. Keeps the toast JS + stylesheet out of the main bundle
 * and out of the LCP critical path — the whole thing only ships after the
 * first paint, which is fine because the first toast can't happen before
 * the page is interactive anyway.
 */
export default function Toaster() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
}
