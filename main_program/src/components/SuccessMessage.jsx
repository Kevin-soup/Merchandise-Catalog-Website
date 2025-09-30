import { useEffect, useState } from "react";

/**
 * SuccessMessage component displays a success message for a limited time.
 *
 * @param {string} message - The success text to display.
 * @param {boolean} trigger - When true, shows the message and starts timer.
 * @param {number} duration - Duration (ms) to show the message before hiding.
 * @param {function} onComplete - Optional callback when message hides.
 */
function SuccessMessage({ message, trigger, duration = 3000, onComplete }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (trigger) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        if (onComplete) onComplete();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [trigger, duration, onComplete]);

  if (!visible) return null;

  return (
    <p className="update-success-message">
      {message}
    </p>
  );
}

export default SuccessMessage;
