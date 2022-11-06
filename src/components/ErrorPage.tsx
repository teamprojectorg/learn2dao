import Text from "./Text";

type ErrorPageProps = {
  code?: string | number;
  message?: string;
};

const ErrorPage = ({ code, message }: ErrorPageProps) => {
  return (
    <div
      style={{ height: "70vh" }}
      className="flex flex-column justify-center items-center gap-1"
    >
      <Text.bodyBigger className="tc">Error {code}</Text.bodyBigger>
      <Text.bodyBig className="tc">{message}</Text.bodyBig>
    </div>
  );
};

export default ErrorPage;
