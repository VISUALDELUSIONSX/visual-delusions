import CategoryAddDialogContainer from './CategoryAddDialogContainer';
import CategoryDeleteDialogContainer from './CategoryDeleteDialogContainer';
import ShopItemAddDialogContainer from './ShopItemAddDialogContainer';
import ShopItemDeleteDialogContainer from './ShopItemDeleteDialogContainer';

const Dialogs = () => {
  return (
    <>
      <CategoryAddDialogContainer />
      <CategoryDeleteDialogContainer />
      <ShopItemAddDialogContainer />
      <ShopItemDeleteDialogContainer />
    </>
  );
};

export default Dialogs;
