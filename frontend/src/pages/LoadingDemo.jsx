import LoadingSpinner from "@components/common/LoadingSpinner";
import SkeletonLoader from "@components/common/SkeletonLoader";

function LoadingDemo() {
  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Loading & Skeleton Components Demo</h1>

      <h2>Loading Spinner</h2>
      <LoadingSpinner size="small" />
      <LoadingSpinner size="medium" />
      <LoadingSpinner size="large" />

      <h2>Skeleton Loader</h2>
      <SkeletonLoader width="100%" height="2rem" />
      <SkeletonLoader width="50%" height="1rem" />
    </div>
  );
}

export default LoadingDemo;
