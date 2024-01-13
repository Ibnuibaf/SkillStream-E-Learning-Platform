import AuthSection from "./AuthSection";
import { Link } from "react-router-dom";
function BasicHeader() {
  return (
    <>
      <nav className="flex justify-between  items-center ">
        <div className="flex w-[50%] gap-x-16 items-center">
          <div className="flex items-center">
            <Link to={"/"} className="font-bold text-2xl h-14 w-14  md:hidden">
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
          <div className="flex mt-2 w-full gap-7">
            <Link to={"/"}>Home</Link>
            <Link to={"/courses"}>Courses</Link>
            <Link to={"/instructor"} className="flex w-max truncate">
              Teach On SkillStream
            </Link>
          </div>
        </div>
        <AuthSection />
      </nav>
    </>
  );
}

export default BasicHeader;
