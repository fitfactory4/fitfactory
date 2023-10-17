import { Link, Route, Routes } from "react-router-dom";

// Auto generates routes from files under ./pages
// https://vitejs.dev/guide/features.html#glob-import
const pages = import.meta.glob("./pages/*/*.jsx", { eager: true });

const routes = Object.keys(pages).map((path) => {
  const file = path.match(/\.\/pages\/(.*)\.jsx$/)[1];
  const name = file.split("/")[1];
  const pathName = file.split("/")[0];
  console.log(name);
  console.log(pathName);
  return {
    name,
    path: name === "Home" ? "/" : `/${name.toLowerCase()}`,
    component: pages[path].default,
  };
});

export default function App() {
  return (
    <>
      <nav>
        <ul>
          {routes.map(({ name, path }) => {
            return (
              <li key={path}>
                <Link to={path}>{name}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <Routes>
        {routes.map(({ path, component: RouteComp }) => {
          return <Route key={path} path={path} element={<RouteComp />}></Route>;
        })}
      </Routes>
    </>
  );
}
