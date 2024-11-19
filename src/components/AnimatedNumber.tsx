import * as React from "react";

interface AnimatedNumberProps {
  value: number;
  color: string;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value, color }) => {
  const [displayValue, setDisplayValue] = React.useState(0);

  React.useEffect(() => {
    const duration = 1000;
    const startTime = Date.now();
    const endValue = value;

    const updateValue = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const currentValue = Math.floor(progress * endValue);
      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(updateValue);
      }
    };

    requestAnimationFrame(updateValue);
  }, [value]);

  return (
    <div className="text-2xl font-bold" style={{ color }}>
      {displayValue}
    </div>
  );
};

export default AnimatedNumber;