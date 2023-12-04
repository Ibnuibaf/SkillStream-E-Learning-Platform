import AuthSection from "./AuthSection";
import {Link} from 'react-router-dom'
function BasicHeader() {
  return (
    <>
      <nav className="flex justify-between  items-center ">
        <div className="flex w-[50%] gap-x-16">
          <Link to={'/'} className="font-bold text-2xl">SkillStream</Link>
          <div className="flex mt-2 w-full gap-7">
            <Link to={'/'}>Home</Link>
            <Link to={'/courses'}>Courses</Link>
            <Link to={'/instructor'}>Teach On SkillStream</Link>
          </div>
        </div>
        <AuthSection />
      </nav>
    </>
  );
}

export default BasicHeader;
