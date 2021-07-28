const allInOrder = arr => {
  for (let i of arr) {
    const sellersArr = [];
    const restArr = [];
    let obj = i.answers;
    for (let key in obj) {
      if(obj[key].answerer_name === 'Seller') {
        sellersArr.push(obj[key]);
      } else {
        restArr.push(obj[key]);
      }
    }
    const sortRest = restArr.sort(
      (a, b) => { return b.helpfulness - a.helpfulness}
      );
      i.answers = sellersArr.concat(sortRest);
      return arr;
  }
}
export default allInOrder;