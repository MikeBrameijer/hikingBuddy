function HikingListController(hikingService) {
    const ctrl = this;
    ctrl.hikingList = [];
    // ctrl.addFavorite = (favoriteParam) => {
    //   recipeService.setFavorites(favoriteParam);
    //   console.log("you clicked it");
    // }
  
    ctrl.getList = () => {
      hikingService.getTrails()
        .then((resultes) => {
          ctrl.hikingList = []
          console.log("it worked!!!!!!")
          console.log(resultes)
        //   let listFromApi = recipes;
        //   listFromApi.forEach(function (spot, index){
        //     let recipeObj = {
        //       label: spot.recipe.label,
        //       img: spot.recipe.image,
        //       calories: spot.recipe.calories,
        //       ingredients: spot.recipe.ingredients.length,
        //       servings: spot.recipe.yield,
        //       bookmark: spot.bookmarked,
        //       url: spot.recipe.url,
        //       source: spot.recipe.source
        //     }
        //     ctrl.recipesList.push(recipeObj);
        //   })
        })
        .catch((err) => {
          console.log("it didnt work")
          console.log(err);
        });
    }
  
  }
  
  
  angular
    .module('HikingApp')
    .component('hikingList', {
      template: `
            <p> this is the hiking list component </p>
    `, // or use templateUrl
      controller: HikingListController,
      // bindings: {
      //   me: '<',
      //   onDelete: '&',
      //   onUpdate: '&'
      // }
    });