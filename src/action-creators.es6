import request from 'superagent';

export const FETCH_RECIPES = 'FETCH_RECIPES';
export const FETCH_FEATURED_RECIPE = 'FETCH_FEATURED_RECIPE';

export function fetchRecipes() {
  return dispatch => {
    return dispatch({
      type: 'SET_RECIPES',
      payload: new Promise((resolve, reject) => {
        request.get('http://localhost:3000/recipes')
          .end((err, res)=>{
            if (err) {
              console.log("err", err)
              reject(err);
            }
            resolve(res.body.recipes);
          })
        })
    })
  }
}

export function fetchFeaturedRecipe() {
  return dispatch => {
    return dispatch({
        type: 'SET_FEATURED_RECIPE',
        payload: new Promise((resolve, reject) => {
          request.get('http://localhost:3000/featured')
            .end((err, res)=>{
              if (err) {
                reject(err);
              }
              resolve(res.body.recipe);
            })
        })
    })
  }
}

export function getHomePageData() {
  return (dispatch, getState) => {
    return Promise.all([
      dispatch(fetchFeaturedRecipe()),
      dispatch(fetchRecipes())
    ])
  }
}


//TODO add checks for existence of data so that things don't get rerequested on the browser
