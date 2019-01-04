function checkCashRegister(price, cash, cid) {
  var status = {}; //map to return
  let change = [["ONE HUNDRED", 0], ["TWENTY", 0], ["TEN", 0], ["FIVE", 0], ["ONE", 0], ["QUARTER", 0], ["DIME", 0], ["NICKEL", 0], ["PENNY", 0]]; //presorted array to return for problem 3
  // because JS is dumb and cant delete a key/value pair form a dictionary properly
  let changeFinal = [];
  
  // a value lookup table for change
  var denominationValue = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];

  var changeOwe = cash-price;

  // get value of change in drawer
  var totalCid = 0;
  var numCurr = cid.length;
  for (var i = 0; i < numCurr; i++) {
    totalCid = totalCid + cid[i][1];
  }
  totalCid = Math.round(totalCid *100)/100; //round number to the nearest decimal

  // first problems first half solution
  if (totalCid < changeOwe) {
    status["status"] = "INSUFFICIENT_FUNDS";
    status["change"] = [];
    return status;
  }

  // second problems solution
  if (totalCid == changeOwe) {
    status["status"] = "CLOSED";
    status["change"] = cid;
    return status;
  }

  if (totalCid > changeOwe) {
    for (var i = 0; numCurr > i; i++) {
      var cidIter = numCurr - i - 1;
      while (changeOwe >= denominationValue[i] && cid[cidIter][1] >= denominationValue[i])
      {
        changeOwe -= denominationValue[i];
        change[i][1] += denominationValue[i];
        cid[cidIter][1] -= denominationValue[i];
        changeOwe = Math.round(changeOwe *100)/100;
      };
    }
    if (changeOwe == 0) {
      for (var i = 0; i < change.length; i++) {
        if (change[i][1] > 0) {
          changeFinal.push(change[i]);
        }
      }
      status["status"] = "OPEN";
      status["change"] = changeFinal;
      return status;
    } else {
      status["status"] = "INSUFFICIENT_FUNDS";
      status["change"] = []
      return status;
    }
  }
}

//example to call func
checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
