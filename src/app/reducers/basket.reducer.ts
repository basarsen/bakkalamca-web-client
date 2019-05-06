import * as BasketActions from '../actions/basket.actions';
import * as _ from 'lodash';
import { BasketState } from '../states/basket.state';
import { environment } from 'src/environments/environment.prod';

export type Action = BasketActions.All;

const initialState: BasketState = {
    products: []
}

export function basketReducer(state = initialState, action: Action) {

    switch (action.type) {
        case BasketActions.ADD_TO_BASKET:
            const exists = state.products.find(p => p._id === action.payload._id);

            if (exists) {
                exists.quantity++;
                return Object.assign({},
                    state, { products: state.products }
                );
            }
            action.payload.quantity = 1;
            action.payload.image = environment.imageEndPoint + '/product/' + action.payload._id + '.jpg';
            return Object.assign({},
                state, { products: [...state.products, action.payload] }
            );

        case BasketActions.REMOVE_FROM_BASKET:
            const product = state.products.find(p => p._id === action.payload._id);
            product.quantity--;
            if (product.quantity > 0) {
                return Object.assign({},
                    state, { products: state.products }
                );
            }
            action.payload.quantity = 0;
            _.remove(state.products, product => product._id == action.payload._id);
            return Object.assign({},
                state, { products: state.products }
            );

        case BasketActions.INIT_BASKET:
            return Object.assign({},
                state, { products: [...state.products, action.payload] }
            );

        case BasketActions.RESET_BASKET:
            state.products.forEach(p => p.quantity = 0);
            return Object.assign({},
                state, { products: [] }
            );
    }

}
