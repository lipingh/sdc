const getOutfits = () => {
  let storageOutfits = JSON.parse(window.localStorage.getItem('outfits'));
  if (!Array.isArray(storageOutfits)) {
    window.localStorage.setItem('outfits', JSON.stringify([]));
    storageOutfits = [];
  }
  return storageOutfits;
};

const handleOutfitAction = (bool, productId) => {
  let storageOutfits = JSON.parse(window.localStorage.getItem('outfits'));
  if (bool) {
    storageOutfits.push(productId);
    window.localStorage.setItem('outfits', JSON.stringify(storageOutfits));
  } else {
    for (let j = 0; j < storageOutfits.length; j += 1) {
      if (storageOutfits[j] === productId) {
        storageOutfits.splice(j, 1);
        break;
      }
    }
    window.localStorage.setItem('outfits', JSON.stringify(storageOutfits));
  }
};

module.exports = {
  getOutfits,
  handleOutfitAction,
};
