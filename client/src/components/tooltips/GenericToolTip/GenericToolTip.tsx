import React, { useState } from 'react';
import styles from './GenericToolTip.module.css';
const Tooltip = ({ text, children, w, h }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnter = () => setIsVisible(true);
  const handleMouseLeave = () => setIsVisible(false);

  return (
    <div 
      className={styles.tooltipContainer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ width: w, height: h }}
    >
      {children}
      {isVisible && <span className={styles.tooltipText}>{text}</span>}
    </div>
  );
};

export default Tooltip;
