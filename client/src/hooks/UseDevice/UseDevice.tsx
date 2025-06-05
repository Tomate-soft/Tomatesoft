import { useState } from 'react';
import Welcome from './welcome/Welcome';

export default function UseDevice() {
  const [state, setState] = useState({
    isLaoding: true,
    error: null,
    data: null,
  });

  const fectchingData = async () => {
    try {
      const response = await fetch('http://localhost:3000/device');
      const data = await response.json();
      setState({
        isLaoding: false,
        error: null,
        data,
      });
    } catch (error) {
      setState({
        isLaoding: false,
        error: null,
        data: null,
      });
    }

    return <Welcome />;
  };

  return { state, fectchingData };
}
