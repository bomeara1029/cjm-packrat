import { StateItem, AppContext, IngestionDispatchAction, ITEM_ACTIONS, defaultItem } from '../../../context';
import { useContext } from 'react';
import lodash from 'lodash';

interface UseItem {
    getSelectedItem: () => StateItem | undefined;
    addItems: (items: StateItem[]) => void;
    updateItem: (item: StateItem) => void;
}

function useItem(): UseItem {
    const {
        ingestion: { items },
        ingestionDispatch
    } = useContext(AppContext);

    const getSelectedItem = () => lodash.find(items, { selected: true });

    const addItems = (fetchedItems: StateItem[]): void => {
        const currentDefaultItem = lodash.find(items, { id: defaultItem.id });

        if (currentDefaultItem) {
            const addItemsAction = (items: StateItem[]): IngestionDispatchAction => ({
                type: ITEM_ACTIONS.ADD_ITEMS,
                items
            });

            if (!fetchedItems.length) {
                const selectedDefaultItem = { ...currentDefaultItem, selected: true };
                ingestionDispatch(addItemsAction([selectedDefaultItem]));
                return;
            }

            const newItemSelected = lodash.find(fetchedItems, { selected: true });

            if (newItemSelected) {
                currentDefaultItem.selected = false;
            }

            const newItems: StateItem[] = [currentDefaultItem].concat(fetchedItems);

            ingestionDispatch(addItemsAction(newItems));
        }
    };

    const updateItem = (item: StateItem) => {
        const { selected } = item;

        const updateItemAction = (item: StateItem): IngestionDispatchAction => ({
            type: ITEM_ACTIONS.UPDATE_ITEM,
            item
        });

        if (selected) {
            const alreadySelected: StateItem | undefined = getSelectedItem();

            if (alreadySelected) {
                const unselectedItem = {
                    ...alreadySelected,
                    selected: false
                };

                ingestionDispatch(updateItemAction(unselectedItem));
            }
        }

        ingestionDispatch(updateItemAction(item));
    };

    return {
        addItems,
        updateItem,
        getSelectedItem
    };
}

export default useItem;
