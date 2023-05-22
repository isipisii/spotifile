import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const Loader = (props) => {
  return (
    <section className="flex items-center justify-center">
      <div className="relative w-full max-w-[1200px] md:w-[92%] md:ml-[100px] p-8">
      </div>
    </section>
  );
};

export default Loader;
