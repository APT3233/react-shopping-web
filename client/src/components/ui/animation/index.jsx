import React, { useEffect } from "react";
import "animate.css";
import AOS from "aos";
import "aos/dist/aos.css";

const AnimatedWrapper = ({
  children,
  animation = "",
  duration = "1s",
  delay = "0s",
  aosAnimation = "",
  aosDelay = 0,
  aosDuration = 800,
  aosOnce = true,
  className = "",
  ...props
}) => {
  useEffect(() => {
    AOS.init({
      // Global settings
      offset: 120,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  // Determine which animation system to use
  const classes = animation
    ? `animate__animated animate__${animation} ${className}`.trim()
    : className;

  const style = animation
    ? {
        ...props.style,
        "--animate-duration": duration,
        "--animate-delay": delay,
      }
    : props.style;

  const aosProps = aosAnimation
    ? {
        "data-aos": aosAnimation,
        "data-aos-delay": aosDelay,
        "data-aos-duration": aosDuration,
        "data-aos-once": aosOnce,
      }
    : {};

  return (
    <div className={classes} style={style} {...aosProps} {...props}>
      {children}
    </div>
  );
};

export default AnimatedWrapper;
