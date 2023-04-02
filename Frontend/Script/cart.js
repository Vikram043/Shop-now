
let getdata;
// function to append cart data
appendData();

async function appendData(){
    
  let idtoken ="642528c19d6dab7d3e9f088e";

  if(idtoken !== null){
    let {id} = "642528c19d6dab7d3e9f088e";
    let url = `http://localhost:3000/carts/${id}`;

  try {
    let responce = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
       // Authorization: `Bearer ${token}`,
      },
    });

    getdata = await responce.json();
    console.log(getdata)
    if (getdata != null && getdata != "") {
        let locationof = document.getElementById("append");
    let x = "";
    let tt = 0;
    for(let i=0; i<getdata.length; i++){
        tt += +getdata[i].price;
    }
  
        getdata.forEach(({model,price,img_url,_id})=>{

            document.querySelector(".heading").innerHTML = `My Cart ( ${getdata.length} Item )`;
    
            x += `<div class="box1">
            <div class="img">
                <img
                class="small-img"
                src="${img_url}"
                alt="mobile phone"/>
            </div>
            <div class="text">
                <span class="box1-1">
                    <p class="product">${model}</p>
                    <p id="minus">-</p><p id="number">1</p><p class="plus">+</p>
                    <p class="price">Price :</p>
                    <p class="rate">Rs${price}</p>
                    <p  id="money">Rs${price}</p>
                </span>
                <span class="box1-2">
                    <p class="cod">COD not applicable</p>
                    <p class="remove">Remove</p>
                    <p class="fee">Shipping Fee :</p>
                    <p class="free">FREE</p>
                    <p class="tax">Inclusive of all the applicable taxes</p>
                </span>
            </div>
        </div>`
    
            locationof.innerHTML = x;
            let grandT=document.getElementById("amount");
            let total=document.getElementById("rs");
    
            grandT.textContent=`Rs${tt}`;
    
            total.textContent=`Rs${tt}`;

            
            let removefromcart = document.querySelectorAll(".remove");
            removefromcart.forEach((el)=>{
                el.addEventListener("click",async()=>{
                    let { token } = JSON.parse(localStorage.getItem("loginData"));
                    
                    console.log(getdata);

  let url = `http://localhost:3001/carts/${_id}`;

  try {
    let responce = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    window.location.reload();
  } catch (err) {
    console.log(err.message);
  }

                   
                })
            })
            let addof = document.querySelectorAll(".plus");
        
            addof.forEach((el)=>{
                console.log("add",price);
                el.addEventListener("click",add.bind(null,price,el));
            });
    
            let subof = document.querySelectorAll("#minus");
    
            subof.forEach((el)=>{
                console.log("sub",price);
                el.addEventListener("click",subs.bind(null,price,el));
            })
    
            var count = 1;
    
            function add(priceadded,el){
    
                count++;
                
                let num=el.closest(".box1-1").querySelector("#number");
                num.textContent=count;
    
                let totalPrice=el.closest(".box1-1").querySelector("#money");
                console.log(el.closest(".box1-1").querySelector("#money"));
                totalPrice.textContent=`Rs${count*priceadded}`;
    
                grandT.textContent=`Rs${count*priceadded}`;
    
                total.textContent=`Rs${count*priceadded}`;
    
            }
    
    
            function subs(priceremove,el){
                if(count>=2){ 
                count--;
                let num=el.closest(".box1-1").querySelector("#number");
                num.textContent=count;
    
                let totalPrice=el.closest(".box1-1").querySelector("#money");
                console.log(el.closest(".box1-1").querySelector("#money"));
    
                totalPrice.textContent=`Rs${count*priceremove}`;
            
                grandT.textContent=`Rs${count*priceremove}`;
    
                total.textContent=`Rs${count*priceremove}`;
            }
            }
        })
      }
  } catch (err) {
    console.log(err);
  }
  }
  else{
    let getdata = JSON.parse(localStorage.getItem("cartData"));
    let locationof = document.getElementById("append");
    let x = "";
    let tt = 0;
    for(let i=0; i<getdata.length; i++){
        tt += +getdata[i].price;
    }
  
        getdata.forEach(({product_name,price,image})=>{

            document.querySelector(".heading").innerHTML = `My Cart ( ${getdata.length} Item )`;
    
            x += `<div class="box1">
            <div class="img">
                <img
                class="small-img"
                src="${image}"
                alt="mobile phone"/>
            </div>
            <div class="text">
                <span class="box1-1">
                    <p class="product">${product_name}</p>
                    <p id="minus">-</p><p id="number">1</p><p class="plus">+</p>
                    <p class="price">Price :</p>
                    <p class="rate">Rs${price}</p>
                    <p  id="money">Rs${price}</p>
                </span>
                <span class="box1-2">
                    <p class="cod">COD not applicable</p>
                    <p class="remove">Remove</p>
                    <p class="fee">Shipping Fee :</p>
                    <p class="free">FREE</p>
                    <p class="tax">Inclusive of all the applicable taxes</p>
                </span>
            </div>
        </div>`
    
            locationof.innerHTML = x;
            let grandT=document.getElementById("amount");
            let total=document.getElementById("rs");
    
            grandT.textContent=`Rs${tt}`;
    
            total.textContent=`Rs${tt}`;
    
            let removefromcart = document.querySelectorAll(".remove");
            removefromcart.forEach((el,index)=>{
                el.addEventListener("click",()=>{
                    getdata.splice(index,1);
                    localStorage.setItem("cartData", JSON.stringify(getdata));
                    window.location.reload();
                })
            })
            let addof = document.querySelectorAll(".plus");
        
            
    
            addof.forEach((el)=>{
                console.log("add",price);
                el.addEventListener("click",add.bind(null,price,el));
            });
    
            let subof = document.querySelectorAll("#minus");
    
            subof.forEach((el)=>{
                console.log("sub",price);
                el.addEventListener("click",subs.bind(null,price,el));
            })
    
            var count = 1;
    
            function add(priceadded,el){
    
                count++;
                
                let num=el.closest(".box1-1").querySelector("#number");
                num.textContent=count;
    
                let totalPrice=el.closest(".box1-1").querySelector("#money");
                console.log(el.closest(".box1-1").querySelector("#money"));
                totalPrice.textContent=`Rs${count*priceadded}`;
    
                grandT.textContent=`Rs${count*priceadded}`;
    
                total.textContent=`Rs${count*priceadded}`;
    
            }
    
    
            function subs(priceremove,el){
                if(count>=2){ 
                count--;
                let num=el.closest(".box1-1").querySelector("#number");
                num.textContent=count;
    
                let totalPrice=el.closest(".box1-1").querySelector("#money");
                console.log(el.closest(".box1-1").querySelector("#money"));
    
                totalPrice.textContent=`Rs${count*priceremove}`;
            
                grandT.textContent=`Rs${count*priceremove}`;
    
                total.textContent=`Rs${count*priceremove}`;
            }
            }
        })
  }
    
}



// function to place order

let btn = document.querySelector(".place");

btn.addEventListener("click", ()=>{
    let paymentdata = getdata;

    let paymentAmt = document.getElementById("amount").textContent;

    localStorage.setItem("paymentdata", JSON.stringify(paymentdata));
    localStorage.setItem("paymentAmount", JSON.stringify(paymentAmt));
    let username = JSON.parse(localStorage.getItem("loginData"));
    if(!username){
        window.location.href = "../index.html";
        localStorage.setItem("pleaseSignin", JSON.stringify("1"));
    }
    else{
        window.location.href = "SelectAddress.html";
    }
    
})

