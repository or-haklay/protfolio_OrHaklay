/* object and image settings */
let imagesList = [
  {
    number: 1,
    src: "./images/image1.jpeg",
    photographer: "Kostiantyn Stupak",
    text: "panoramic View of Hedge and Raw Houses Across Large Body of Water",
    likes: [],
  },
  {
    number: 2,
    src: "./images/image2.jpeg",
    photographer: "Haley Black",
    text: "White Concrete Building",
    likes: [],
  },
  {
    number: 3,
    src: "./images/image3.jpeg",
    photographer: "Ahmad Basem",
    text: "Barred Spiral Andromeda Galaxy",
    likes: [],
  },
  {
    number: 4,
    src: "./images/image4.jpeg",
    photographer: "Cole Keister",
    text: "Empty Road in the Desert",
    likes: [],
  },
  {
    number: 5,
    src: "./images/image5.jpeg",
    photographer: "Kelly",
    text: "City in Israel by the Shore",
    likes: [],
  },
  {
    number: 6,
    src: "./images/image6.webp",
    photographer: "Aleksandr Nadyojin",
    text: "Brown Tabby Cat Lying on a Concrete Surface",
    likes: [],
  },
];
let accounts = [];

//sign-in
const closeSignInBtn = document.getElementById("closeSignInBtn");
const userSign = document.getElementById("userSign");
const passwordSign = document.getElementById("passwordSign");
const userNameElement = document.getElementById("userNameElement");
const signInBtn = document.getElementById("signInBtn");
const signOutBtn = document.getElementById("signOutBtn");
const signInScreen = document.getElementById("signInScreen");
const userSignMassage = document.getElementById("userSignMassage");
const passwordSignMassage = document.getElementById("passwordSignMassage");

let signedIn = false;
let correctUser;
//חלון כניסה
signInBtn.addEventListener("click", () => {
  signInScreen.style.display = "flex";
  passwordSignMassage.innerHTML = "";
  userSignMassage.innerHTML = "";
});
//התנתקות
signOutBtn.addEventListener("click", () => {
  signOutBtn.style.display = "none";
  signInBtn.style.display = "block";
  registerInBtn.style.display = "block";

  userNameElement.innerHTML = "Guest";
  correctUser = null;
  signedIn = false;
  buildPage();
});
//סגירת חלון
closeSignInBtn.addEventListener("click", () => {
  signInScreen.style.display = "none";
});

//פונקציית התחברות
function signIn() {
  //ניקוי הערות
  passwordSignMassage.innerHTML = "";
  userSignMassage.innerHTML = "";
  //משתנים
  let user = userSign.value;
  let pass = passwordSign.value;
  let error = "username";
  //בדיקה
  accounts.forEach((element) => {
    if (user == element.userName && pass == element.password) {
      console.log("yes");
      signedIn = true;
      error = false;
      correctUser = element;
      userNameElement.innerHTML = "@" + element.fname + " " + element.lname;
      signInBtn.style.display = "none";
      signOutBtn.style.display = "block";
      signInScreen.style.display = "none";
      registerInBtn.style.display = "none";
      buildPage();
    } else if (user == element.userName) {
      error = "password";
    }
  });
  if (error == "username") {
    userSignMassage.innerHTML = "User name don't familiar";
  } else if (error == "password") {
    passwordSignMassage.innerHTML = "wrong password";
  }
  //ניקוי שדות
  userSign.value = "";
  passwordSign.value = "";
}

//build-page
const Gallery = document.getElementById("Gallery");

function buildPage() {
  Gallery.innerHTML = "";

  imagesList.forEach((element, index) => {
    let isLiked = signedIn && element.likes.includes(correctUser?.userName);

    let divItem = document.createElement("div");
    divItem.classList.add("photoCard");
    divItem.innerHTML = `
    <div class="imgControl">
        <img src="${element.src}" alt="${element.text}">
    </div>
    <div class='cardControl'>
        <p class="photographer">@${element.photographer}</p>
        <button class="likeBtn ${isLiked ? "liked" : ""}" data-index="${index}">
          ${element.likes.length} ${isLiked ? "❤️" : "🤍"}
        </button>
    </div>
    `;

    Gallery.appendChild(divItem);
  });
  //
  updateLikes();
}

//like

function updateLikes() {
  document.querySelectorAll(".likeBtn").forEach((btn) => {
    btn.addEventListener("click", () => {
      //בדיקת חיבור
      if (!signedIn) {
        alert("You need to sign in to like images.");
        return;
      }

      let index = parseInt(btn.getAttribute("data-index"));
      let image = imagesList[index];

      if (!image.likes.includes(correctUser.userName)) {
        image.likes.push(correctUser.userName);
      } else {
        image.likes = image.likes.filter(
          (user) => user !== correctUser.userName
        );
      }

      localStorage.setItem("likedImages", JSON.stringify(imagesList));
      buildPage();
    });
  });
}

function loadLikes() {
  let savedLikes = localStorage.getItem("likedImages");
  if (savedLikes) {
    let parsedLikes = JSON.parse(savedLikes);

    imagesList.forEach((image, index) => {
      image.likes = parsedLikes[index].likes || [];
    });
  }
}

loadLikes();
buildPage();

/* account management*/

class Account {
  constructor(userName, password, age, fname, lname, level) {
    this.userName = userName;
    this.password = password;
    this.age = age;
    this.fname = fname;
    this.lname = lname;
    this.level = level ? level : "Member";
    accounts.push(this);
  }
}

//register
const registerScreen = document.getElementById("registerScreen");
const registerInBtn = document.getElementById("registerInBtn");
const closeRegisterBtn = document.getElementById("closeRegisterBtn");
const userRegister = document.getElementById("userRegister");
const passwordRegister = document.getElementById("passwordRegister");
const fnameRegister = document.getElementById("fnameRegister");
const lnameRegister = document.getElementById("lnameRegister");
const ageRegister = document.getElementById("ageRegister");
const userRegisterMassage = document.getElementById("userRegisterMassage");
const passwordRegisterMassage = document.getElementById(
  "passwordRegisterMassage"
);

registerInBtn.addEventListener("click", () => {
  registerScreen.style.display = "flex";
  passwordRegisterMassage.innerHTML = "";
  userRegisterMassage.innerHTML = "";
});
closeRegisterBtn.addEventListener("click", () => {
  registerScreen.style.display = "none";
});

function register() {
  passwordRegisterMassage.innerHTML = "";
  userRegisterMassage.innerHTML = "";
  const newFirstName = fnameRegister.value;
  const newLastName = lnameRegister.value;
  const newAge = ageRegister.value;
  const newUserName = userRegister.value;
  const newPassword = passwordRegister.value;

  if (
    !newFirstName ||
    !newLastName ||
    !newAge ||
    !newUserName ||
    !newPassword
  ) {
    alert("You forgot to enter some details...");
  } else if (accounts.some((account) => account.userName === newUserName)) {
    userRegisterMassage.innerHTML = "This user already exist";
  } else if (newPassword.length < 8) {
    passwordRegisterMassage.innerHTML = "Password must be longer then 8 notes";
  } else {
    const newUser = new Account(
      newUserName,
      newPassword,
      newAge,
      newFirstName,
      newLastName
    );

    userRegister.value = "";
    passwordRegister.value = "";
    fnameRegister.value = "";
    lnameRegister.value = "";
    ageRegister.value = "";
    console.log(newUser);

    signedIn = true;
    correctUser = newUser;
    userNameElement.innerHTML = "@" + newUser.fname + " " + newUser.lname;
    signInBtn.style.display = "none";
    signOutBtn.style.display = "block";
    registerInBtn.style.display = "none";
    registerScreen.style.display = "none";

    localStorage.setItem("localAccounts", JSON.stringify(accounts));
    buildPage();
  }
}
//upload local accounts

if (localStorage.getItem("localAccounts")) {
  let loadedAccounts = JSON.parse(localStorage.getItem("localAccounts"));
  accounts = loadedAccounts.map(
    (acc) =>
      new Account(
        acc.userName,
        acc.password,
        acc.age,
        acc.fname,
        acc.lname,
        acc.level
      )
  );
} else {
  new Account("adminUser", "admin123", 99, "Israel", "Israeli");
}
