import AuthSection from "./AuthSection";
import { Link } from "react-router-dom";
function BasicHeader() {
  
  return (
    <div className="lg:px-10 lg:py-4 py-1 px-2">
      <nav className="flex justify-between w-full  items-center ">
        <div className="flex  lg:gap-x-16 items-center">
          <div className="flex items-center">
            <Link to={"/"} className="font-bold  h-14 w-14  md:hidden">
              <img
                src="/SkillStream-Logo-white.png"
                className="h-full w-full"
                alt="Skillstream Logo"
              />
            </Link>
            <Link to={"/"} className="font-bold text-2xl hidden md:block">
              SkillStream
            </Link>
          </div>
          <div className="flex mt-2 w-full gap-2 lg:gap-7 text-sm lg:text-md">
            <Link to={"/"}>Home</Link>
            <Link to={"/courses"}>Courses</Link>
            <Link to={"/instructor"} className="flex w-max truncate">
              Teach On SkillStream
            </Link>
          </div>
        </div>
        <AuthSection />
      </nav>
    </div>
  );
}

export default BasicHeader;
