export default function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green", margin: "50px" , zIndex: 1 }}
      onClick={onClick}
    />
  );
}