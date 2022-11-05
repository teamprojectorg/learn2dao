type GradientProps = {
  id: string;
};

const LineGradient = ({ id }: GradientProps) => (
  // start gradient at (0, 100%) and move to (0,0)
  <linearGradient id={id} x1="0%" y1="100%" x2="0%" y2="0%">
    <stop offset="0%" stopColor="#540d6e" />
    <stop offset="25%" stopColor="#c14bbb" />
    <stop offset="50%" stopColor="#ff0000" />
    <stop offset="75%" stopColor="#ff8317" />
    <stop offset="100%" stopColor="#ffdd21" />
  </linearGradient>
);

export default LineGradient;
