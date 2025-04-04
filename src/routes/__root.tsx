import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <div className="flex flex-col min-h-svh p-4">
      <nav className="mb-4 pb-3 border-b border-gray-200">
        <Link to="/" className="hover:text-blue-600">
          Home
        </Link>
        <span className="mx-4 text-gray-300">|</span>
        <Link to="/about" className="hover:text-blue-600">
          About
        </Link>
      </nav>
      <Outlet />
    </div>
  ),
});
