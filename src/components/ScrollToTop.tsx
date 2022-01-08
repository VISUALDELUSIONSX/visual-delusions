import { useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface Props {
  history: RouteComponentProps['history'];
}

const ScrollToTop: React.FC<Props> = ({ history }) => {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, [history]);

  return null;
};

export default withRouter(ScrollToTop);
