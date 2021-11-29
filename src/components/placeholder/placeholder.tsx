import { PlaceHolderProps } from "./placeholder.types";
function PlaceHolder(props: PlaceHolderProps) {
  const { isError, isLoading } = props;

  if (isError) {
    return (
      <h1 style={{ color: "red" }}>
        An Error has occurred, please try again later
      </h1>
    );
  }
  if (isLoading) {
    return <img src="/loading.png" className="svgLoader" alt="loading"></img>;
  }

  return null;
}

export default PlaceHolder;
