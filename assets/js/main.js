let next = document.getElementById('next');

let refresh = setInterval(() =>{next.click()},10000)

document.getElementById('next').onclick = function(){
    let lists = document.querySelectorAll('.item');
    document.getElementById('slide').appendChild(lists[0]);
    clearInterval(refresh);
    refresh = setInterval(() =>{next.click()},10000)
}
document.getElementById('prev').onclick = function(){
    let lists = document.querySelectorAll('.item');
    document.getElementById('slide').prepend(lists[lists.length - 1]);
    clearInterval(refresh);
    refresh = setInterval(() =>{next.click()},10000)
}

// account:start===================================================================
const signinBtns = document.querySelectorAll('.js-sign-in')
const signupBtns = document.querySelectorAll('.js-sign-up')

const signInPop = document.querySelector('.sign-in')
const signUpPop = document.querySelector('.sign-up')

const signinPopUp = document.querySelector('.sign-popup')
const closeBtn = document.querySelector('.js-root-close')
const noneClose = document.querySelector('.js-root-container')
const changeSignBtns = document.querySelectorAll('.sign-submit-btn')

const logOut = document.querySelector('.log-out')
const unsignedAcc = document.querySelectorAll('.unsign-account')
const signedinName = document.querySelector('.signed-in-name');
const unsigninacc = document.querySelector('.unsignin-account')
const unsignupacc = document.querySelector('.unsignup-account')
const cartNavNumber = document.querySelector('.cart-number-icon')
const cartIcon = document.querySelector('.cart-icon')
const cartSubIcon = document.querySelector('.cart-sub-icon')
const cartTab = document.querySelector('.cartTab')
const cartClose = document.querySelector('.close-cartTab')
const cartlist = document.querySelector('.cart-list')



for (const changeSignBtn of changeSignBtns) {
    changeSignBtn.addEventListener('click', () => {
        if (changeSignBtn.innerHTML === "Đăng kí") {
            signUpPop.classList.add('open-sign')
            signInPop.classList.remove('open-sign')
        } 
        else if (changeSignBtn.innerHTML === "Đăng nhập" ) {
            signInPop.classList.add('open-sign')
            signUpPop.classList.remove('open-sign')
        }
    })
}

function showIn() {
    signinPopUp.classList.add('open')
    signInPop.classList.add('open-sign')
    signUpPop.classList.remove('open-sign')
}

function showUp() {
    signinPopUp.classList.add('open')
    signUpPop.classList.add('open-sign')
    signInPop.classList.remove('open-sign')
}

function hidePopup() {
   signinPopUp.classList.remove('open')
}

for (const signinBtn of signinBtns) {
    signinBtn.addEventListener('click', showIn)
}


for (const signupBtn of signupBtns) {
    signupBtn.addEventListener('click', showUp)
}

signinPopUp.addEventListener('click', hidePopup)
closeBtn.addEventListener('click', hidePopup)

noneClose.addEventListener('click', function(event) {
    event.stopPropagation()
})


function signup(e) {
    event.preventDefault();
    const password1El = document.getElementById('password-up');
    const password2El = document.getElementById('re-password');
    let passwordsMatch = false;

    if (password1El.value === password2El.value) {
    passwordsMatch = true;
    password1El.style.borderColor = 'green';
    password2El.style.borderColor = 'green';
    var username = document.getElementById("username").value
    var account = document.getElementById("email-up").value
    var password = document.getElementById('password-up').value
    var user = { 
        username: username,
        password: password,
        accountt: account,
        signed: 0,
    }

    json = JSON.stringify(user)
    localStorage.setItem(account,json)
    alert("Đăng kí thành công");
    showIn()
    } else {
    passwordsMatch = false;
    password1El.style.borderColor = 'red';
    password2El.style.borderColor = 'red';
    alert("Mật khẩu không trùng khớp")
    return;
    }
}


let cartNumber = 0;
function signin(e) {
    event.preventDefault();
    var account = document.getElementById("email-in").value
    var password = document.getElementById('password-in').value
    const userJson = localStorage.getItem(account);
    const user = JSON.parse(userJson);
    
    if (user == null) {
        alert("Sai tài khoản hoặc mật khẩu")
    }
    else if (account == user.accountt && password == user.password) {
        window.location.href = "shop.html"
    }
    else {
        alert("Sai tài khoản hoặc mật khẩu")
    }
}

// account:end===================================================================

function Select() {
    alert("Bạn đã áp dụng thành công!");	
}



logOut.addEventListener('click', () => {
    signedinName.classList.remove('open-sign')
    logOut.classList.remove('open-sign')

    unsigninacc.classList.remove('remove')
    unsignupacc.classList.remove('remove')

    cartIcon.classList.remove('open-sign')
    cartNumber = 0;
    cartNavNumber.innerHTML = cartNumber
})


// =======================================================================================================================================
cartIcon.addEventListener('click', () => {
    cartTab.classList.toggle('showCart');
    showgiohangotherweb()
})

cartSubIcon.addEventListener('click', () => {
    cartTab.classList.toggle('showCart');
    showgiohangotherweb()
    document.getElementById('tablet-menu').classList.add('remove')
})

cartClose.addEventListener('click', () => {
    cartTab.classList.toggle('showCart');
    document.getElementById('tablet-menu').classList.remove('remove')
})


var giohang = new Array()
let cartList = document.querySelector('.cart-list')
cartNumber = 0;

function addtoCart() {
    var quantity = parseInt(document.querySelector('.number_sp').value);
    var nameSP = document.querySelector('.shopdetail-info p').innerText
    var price = parseInt(document.querySelector('.shopdetail-info span').innerText)
    var hinh  = document.querySelector('.main-img img').src
    var sp = new Array(hinh, price, quantity, nameSP);

    var kt = 0;
    for (let i = 0; i <giohang.length; i++)
    {
        if (nameSP == giohang[i][3]) {
            kt = 1;
            quantity += giohang[i][2];
            giohang[i][2] = quantity;
            localStorage.setItem("giohang", JSON.stringify(giohang))
            break;
        }
    }

    if (kt == 0) {
        giohang.push(sp)
        localStorage.setItem("giohang", JSON.stringify(giohang))
    }
    cartNumber += parseInt(quantity);
    cartNavNumber.innerHTML = cartNumber;
    showgiohangotherweb()
}



function xoaSP(x) {
    var sp = x.parentNode;
    var tensp = sp.children[0].innerText
    sp.remove()
    for (let i = 0; i < giohang.length; i++)
    {
      if (giohang[i][3] == tensp ) {
        giohang.splice(i,1);
      }
    }
}

function showgiohangotherweb() {
    var giohang = JSON.parse(localStorage.getItem("giohang"));
    cartNavNumber.innerHTML = giohang.length;
    if (document.querySelector('.cart-list').innerText == ""){
        var ttgh = "";
    }
    else {
        ttgh = document.querySelector('.cart-list').innerHTML;
    }
    for (let i = 0; i < giohang.length; i++)
    {
        var temp =  '<div class="cart-item">'+
        '<p><span class="tenSp">'+giohang[i][3]+'</span></p>'+
        '<img src="'+giohang[i][0]+'" alt="">'+
        '<p>Giá: <span class="giaSp">'+giohang[i][1]+'</span> VND</p>'+
        '<p>Số lượng <span class="soLuongSP">'+giohang[i][2]+'</span></p>'+
        '<p>Thành tiền <span class="thanhtienSP">'+(giohang[i][2] * giohang[i][1])+'</span></p>'+
        '<div class="xoaSP" onclick="xoaSP(this)">'+
            '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">'+
            '<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>'+
            '<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>'+
            '</svg>'+
        '</div>'+
        '<div class="clear"></div>'+
        '</div>'
        
        if (ttgh.search(temp.slice(0,80)) < 0) {
            ttgh += temp
        }
    }
    document.querySelector('.cart-list').innerHTML = ttgh;
}

