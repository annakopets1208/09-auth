"use client";

type ErrorProps = {
  error: Error;
};

const Error = ({ error }: ErrorProps) => {
  console.log(error);
  return <p>Something went wrong. {error.message}.</p>;
};

export default Error;
