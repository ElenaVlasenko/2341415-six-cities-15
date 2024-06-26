import { useAppSelector } from '../../hooks/app-dispatch';
import './error-message.css';

function ErrorMessage(): JSX.Element | null {
  const error = useAppSelector((state) => state.other.error);

  return (error)
    ? <div className='error-message'>{error}</div>
    : null;

}

export default ErrorMessage;
