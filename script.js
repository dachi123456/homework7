function mySetTimeout(delay){
    return new Promise((resolve,reject) => {
        if(typeof delay !== 'number'){
            reject('its not a number')
            return
        }
        setTimeout(resolve,delay);
        
    })
}

mySetTimeout(4000)
.then(() => console.log('this is working'))
.catch(err => console.log(err))





//პირველი ვარიანტი
function makeToys(timeToMakeToy) {
    return new Promise((resolve, reject) => {
      mySetTimeout(timeToMakeToy).then(() => {
        if (Math.random() > 0.1) {
          resolve("undefected");
        } else {
          reject("defected");
        }
      });
    });
  }
  
  function sellToys(status, timeToSellToy) {
    return new Promise((resolve, reject) => {
      mySetTimeout(timeToSellToy).then(() => {
        if (status === "undefected") {
          if (Math.random() > 0.5) {
            resolve("Toy sold");
          } else {
            reject("Toy did not sell");
          }
        }
      });
    });
  }
  
  function deliverToys() {
    return new Promise(function exec(resolve) {
      mySetTimeout(2000).then(() => {
        resolve("Toys delivered");
      });
    });
  }
  
  const timeToMakeToy = 3000;
  const timeToSellToy = 1000; 
  
  makeToys(timeToMakeToy)
    .then((status) => {
      return sellToys(status, timeToSellToy);
    })
    .then((res) => {
      console.log(res);
      return deliverToys();
    })
    .then((deliveryStatus) => {
      console.log(deliveryStatus);
    })
    .catch((err) => console.log(err));


    //მეორე ვარიანტი

    function makeToys(timeToMakeToy) {
        return new Promise((resolve, reject) => {
          mySetTimeout(timeToMakeToy)
            .then(() => {
              if (Math.random() > 0.1) {
                resolve("undefected");
              } else {
                reject("defected");
              }
            })
            .catch(reject);
        });
      }
      
      function sellToys(status, timeToSellToy) {
        return new Promise((resolve, reject) => {
          mySetTimeout(timeToSellToy)
            .then(() => {
              if (status === "undefected") {
                if (Math.random() > 0.5) {
                  resolve("Toy sold");
                } else {
                  reject("Toy did not sell");
                }
              }
            })
            .catch(reject);
        });
      }
      
      function deliverToys() {
        return new Promise((resolve) => {
          mySetTimeout(2000)
            .then(() => {
              resolve("Toys delivered");
            })
            .catch(reject);
        });
      }
      
      async function distributeToys() {
        try {
          const status = await makeToys(3000);
          const sellingResult = await sellToys(status, 1000);
          console.log(sellingResult);
          const deliveryStatus = await deliverToys();
          console.log(deliveryStatus);
        } catch (err) {
          console.log(err);
        }
      }
      
      distributeToys();