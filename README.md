# redux-model-tools

Helpers for Redux to reduce its boilerplate.

[![Sponsored by Evil Martians](https://evilmartians.com/badges/sponsored-by-evil-martians.svg)](https://evilmartians.com/?utm_source=postcss-modules)

## Using

Create namespaced constants:

```javascript
// model.js
import { createConstants } from 'redux-model-tools';


const constants = createConstants('POST', [
  'EDIT',
  'REMOVE',
  'PUBLISH',
]);

console.log(constants.EDIT); // 'POST/EDIT'
```

And use them to create the corresponding actions. An action creator will be created for each constant automatically:

```javascript
// actions.js
import { createActions } from 'redux-model-tools';
import { constants }     from './model';
import store             from './store';


const actions = createActions(constants, {
  asyncPublish() {
    return (dispatch) => { // using redux-thunk
      // every action created from a constant is assigned to `this`
      dispatch(this.publish());
    };
  }
})


// actions.edit(42)     -> { type: 'POST/EDIT', payload: 42 }
// actions.remove(42)   -> { type: 'POST/REMOVE', payload: 42 }
// actions.asyncPublish -> dispatch => {}
```

## Make a getter for your state

Suppose you have a state like this:

```javascript
{
  yourReducer: {
    foo: 'foo',
    bar: 'bar'
  }
}
```

Then you can make a getter in your model like so:

```javascript
import { makeGetter } from 'redux-model-tools';

const get = makeGetter('yourReducer');
```

And use it in containers like so:

```javascript
import { get } from './model';

function mapStateToProps(state) {
  return get(state, ['foo', 'bar']); // { foo: 'foo', bar: 'bar' }
}
```
