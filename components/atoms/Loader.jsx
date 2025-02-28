import { BeatLoader } from 'react-spinners';

function Loader({ color = '#000000', size = 7 }) {
  return <BeatLoader color={color} size={size} />;
}

export default Loader;
