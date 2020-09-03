// const moment = require("moment")

//======================================================================================
// 
// This block of functions is set up to keep all of our date manipulation functions in 
//   one place so we can standardize all of our our date display, storage, and 
//   manipulation all in one place and bring them in wherever we need to. 
// 
//======================================================================================

const API = {

    displayDate : rawDate => {
        if (rawDate.slice(0,2) === "00" ) return rawDate.slice(6)
        else return rawDate
    }

}

module.exports = API