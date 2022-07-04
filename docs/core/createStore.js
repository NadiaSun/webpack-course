
export function createStore(rootReducer, initialState = {}) {
    let state = rootReducer({...initialState}, {type: '__INIT__'});
    let listeners = [];
    return {
        subscribe(fn) {
            listeners.push(fn)
            return {
                unsubscribe() {
                    listeners = listeners.filter(l => l !== fn)
                }
            }
        },
        dispatch(action) {
            state = rootReducer(state, action);
            listeners.forEach(sub => sub(state));
        },
        getState() {
            // JSON.stringify преобразует значение в строку
            // JSON.parse преобразовывает обратно в нужное состояние
            return JSON.parse(JSON.stringify(state))
        }
    }
}

// export class CreateStore {
//     constructor(rootReducer, initialStore) {
//         this.rootReducer = rootReducer
//         this.state = this.rootReducer(initialStore, {type: '__INIT__'});
//         this.listeners = [];
//     }
//
//     subscribe(sub) {
//         this.listeners.push(sub)
//     }
//
//     dispatch(action) {
//         this.state = this.rootReducer(this.state, action);
//         this.listeners.forEach(sub => sub());
//     }
//
//     getState() {
//         return this.state
//     }
// }
