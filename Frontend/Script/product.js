
// function to append data

let data;
let List_div = document.querySelector("#list_div");
product();
async function product() {
  const response = await fetch("https://lovely-goat-long-underwear.cyclic.app/mobiles", {
    method: "GET", 
    headers: {
      "Content-Type": "application/json",
    },
    
  });
  data = await response.json(); 
    appendData(data,List_div)
}

    function appendData(d, location) {
      if (d.length == 0) {
        location.innerHTML = null;
      } else {
        let x = "";
        d.forEach((el, i) => {
          x += `<div class="mobile-div">
              <span id="wishlist">
                <a 
                  ><img
                    src="https://cdn-icons-png.flaticon.com/128/6320/6320703.png"
                    alt=""
                /></a>
              </span>
              <div class="img-div">
                <img
                  src="${el.img_url}"
                  alt="mobile image"
                />
              </div>
              <div>
                <p id="shipping">${el.model}</p>
                <div class="new-price">
                  <span class="p-price">₹${el.price}</span>
                  <span class="prd-discount">${el.discount}</span>
                </div>
                <div class="old-price">
                  <span>₹${Math.floor(Math.random() * (100000 - 3000) + 3000)}</span>
                  <span>₹${Math.floor(Math.random() * (200000 - 3000) + 3000)}</span>
                </div>
                <div>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star"></span>
                  <span class="fa fa-star"></span>
                </div>
                <p id="shipping"><i class="fal fa-truck"></i>Free Shipping</p>
                <button id="bt">Add to Cart</button>
              </div>
            </div>`;
          location.innerHTML = x;
          //let bt = document.querySelectorAll("#bt");
          // bt.forEach((el, i) => {
          //   el.addEventListener("click", () => {
          //     localStorage.setItem("productDetail", JSON.stringify(d[i]._id));
          //     alert("Product added to cart")
          //   });
          // });
          var description = "a";
    let bt = document.querySelectorAll("#bt");
    bt.forEach((e,i)=>{
      e.addEventListener("click",product1)
    })
        });
      }
    }
    var product_id = JSON.parse(localStorage.getItem("productDetail"));
    console.log(product_id)
async function product1() {
  alert("Product Added to Cart")
  const response = await fetch(`https://lovely-goat-long-underwear.cyclic.app/${product_id}`, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
        
    },
    // body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  data = await response.json(); // parses JSON response into native JavaScript objects

  
  let { img_url, price, discount, model } = data
    // get data from local storage
  addtocart()
    async function addtocart(){
      let userDetail = JSON.parse(localStorage.getItem("loginData"));
    if(userDetail != null && userDetail != ""){
      let obj = {
        img_url,
        model,
        price,
        dicount
      }
      obj = JSON.stringify(obj);
      console.log(obj)
    try {
      let url = "https://lovely-goat-long-underwear.cyclic.app/carts";
      let responce = await fetch(url, {
        method: "POST",
        body: obj,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userDetail.token}`,
        },
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  } 
  else{
    let addtoCart = document.querySelectorALL("#bt");

    addtoCart.addEventListener("click", addtocart);
    let arraytocart = JSON.parse(localStorage.getItem("cartData")) || [];
    function addtocart(){
      let obj = {
        img_url,
        model,
        price,
        discount
      }
        arraytocart.push(obj);
        localStorage.setItem("cartData", JSON.stringify(arraytocart));
        window.location.reload();
    }
  }
}
}

  // function for high to low
  let high_price = document.getElementById("high-price");

  high_price.addEventListener("click", highPrice);

  function highPrice() {
    let data1 = data.sort(function (a, b) {
      console.log("work");
      return b.price - a.price;
    });
    appendData(data1, List_div);
  }

  // function for low to high

  let low_price = document.getElementById("low-price");

  low_price.addEventListener("click", lowPrice);

  function lowPrice() {
    let data1 = data.sort(function (a, b) {
      console.log("work");
      return a.price - b.price;
    });
    appendData(data1, List_div);
  }


  // function for 2501-5000
  let price_filter = document.getElementById("price-one");

  price_filter.addEventListener("click", () => {
    document.getElementById("price-two").checked = false;
    if (price_filter.checked === true) {
      let data1 = data.filter((el) => {
        return el.price > 10000 && el.price < 50000;
      });
      appendData(data1, List_div);
    }
  });
  // function for above 5000

  let price_filter2 = document.getElementById("price-two");

  price_filter2.addEventListener("click", () => {
    document.getElementById("price-one").checked = false;
    if (price_filter2.checked === true) {
      let data1 = data.filter((el) => {
        return el.price > 50000;
      });
      appendData(data1, List_div);
    }
  });
  // function to clear all price
  let clear_all = document.querySelector(".clear-all");

  clear_all.addEventListener("click", () => {
    price_filter.checked = false;
    price_filter2.checked = false;
    appendData(data, List_div);
  });

  //function for dicount upto 20%

  let discount1 = document.querySelector(".twenty");

  discount1.addEventListener("click", () => {
    document.querySelector(".forty").checked = false;
    document.querySelector(".sixty").checked = false;
    document.querySelector(".eighty").checked = false;
    document.querySelector(".aboveAll").checked = false;
    if (discount1.checked === true) {
      let data1 = data.filter((el) => {
        return el.discount <= "20%";
      });
      appendData(data1, List_div);
    }
  });

  // discount for 21-40%
  let discount2 = document.querySelector(".forty");

  discount2.addEventListener("click", () => {
    document.querySelector(".twenty").checked = false;
    document.querySelector(".sixty").checked = false;
    document.querySelector(".eighty").checked = false;
    document.querySelector(".aboveAll").checked = false;
    if (discount2.checked === true) {
      let data1 = data.filter((el) => {
        return el.discount >= "25%" && el.discount <= "40%";
      });
      appendData(data1, List_div);
    }
  });

  // discount for 41-60%

  let discount3 = document.querySelector(".sixty");

  discount3.addEventListener("click", () => {
    document.querySelector(".twenty").checked = false;
    document.querySelector(".forty").checked = false;
    document.querySelector(".eighty").checked = false;
    document.querySelector(".aboveAll").checked = false;
    if (discount3.checked === true) {
      let data1 = data.filter((el) => {
        return el.discount >= "41%" && el.discount <= "60%";
      });
      appendData(data1, List_div);
    }
  });

  // discount for 61-80%

  let discount4 = document.querySelector(".eighty");

  discount4.addEventListener("click", () => {
    document.querySelector(".twenty").checked = false;
    document.querySelector(".forty").checked = false;
    document.querySelector(".sixty").checked = false;
    document.querySelector(".aboveAll").checked = false;
    if (discount4.checked === true) {
      let data1 = data.filter((el) => {
        return el.discount >= "61%" && el.discount <= "80%";
      });
      
      appendData(data1, List_div);
    }
  });

  // discount for above 80%

  let discount5 = document.querySelector(".aboveAll");

  discount5.addEventListener("click", () => {
    document.querySelector(".twenty").checked = false;
    document.querySelector(".forty").checked = false;
    document.querySelector(".sixty").checked = false;
    document.querySelector(".eighty").checked = false;
    if (discount5.checked === true) {
      let data1 = data.filter((el) => {
        return el.discount > "80%";
      });

      appendData(data1, List_div);
    }
  });

  // function to clear all discount

  let clear_all1 = document.querySelector(".clear-all1");

  clear_all1.addEventListener("click", () => {
    discount1.checked = false;
    discount2.checked = false;
    discount3.checked = false;
    discount4.checked = false;
    discount5.checked = false;
    appendData(data, List_div);
  });