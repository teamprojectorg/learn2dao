import { RiseLoader } from "react-spinners";

const LoadingPage = () => (
  <div
    style={{ height: "65vh" }}
    className="flex flex-column items-center justify-center"
  >
    <RiseLoader size={25} color="#2E7DAF" />
  </div>
);

export default LoadingPage;
