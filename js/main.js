//!HTML ELement
var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDescription");
var productSearch = document.getElementById("searchProduct");
var tableBody = document.getElementById("tBody");
var myBtn = document.getElementById("myBtn");
//^ Variable
var pIndex;
var pList;
if (localStorage.getItem("product") != null) {
  pList = JSON.parse(localStorage.getItem("product"));
  displayProduct(pList);
} else {
  pList = [];
}

//* Functions
function AddProduct() {
  if (myBtn.innerHTML !== "Update Product") {
    if (
      validationInput(productName) &
      validationInput(productPrice) &
      validationInput(productCategory) &
      validationInput(productDescription)
    ) {
      var product = {
        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        descrition: productDescription.value,
      };

      pList.push(product);
    }
  } else {
    pList[pIndex].name = productName.value;
    pList[pIndex].price = productPrice.value;
    pList[pIndex].category = productCategory.value;
    pList[pIndex].descrition = productDescription.value;
    myBtn.innerHTML = "Add Product";
    myBtn.classList.replace("btn-outline-warning", "btn-outline-primary");
  }
  localStorage.setItem("product", JSON.stringify(pList));
  displayProduct(pList);
  clearForm();
  console.log(pList);
}

function displayProduct(arr, term) {
  var Cartona = ``;
  if (arr.length != 0) {
    console.log(term);
    for (var i = 0; i < arr.length; i++) {
      Cartona += `
    <tr >
    <td>${i + 1}</td>
    <td>${
      term
        ? arr[i].name
            .toLowerCase()
            .replace(
              term.toLowerCase(),
              `<span class="text-danger fs-5 fw-bold">${term}</span>`
            )
        : arr[i].name
    }</td>
    <td>${arr[i].price}$</td>
    <td>${arr[i].category}</td>
    <td>${arr[i].descrition}</td>
    <td>
      <button onclick="updateProduct(${i})" class="btn btn-outline-warning py-2 px-4">Update</button>
    </td>
    <td>
      <button onclick="deleteProduct(${i})" class="btn btn-outline-danger py-2 px-4">Delete</button>
    </td>
    `;
    }
    tableBody.innerHTML = Cartona;
  } else {
    tableBody.innerHTML = ` <tr class="text-center">
                                <td colspan="7">
                                     <div class="alert alert-danger">No Match Found</div>
                                 </td>
                            </tr>`;
  }
}

function deleteProduct(index) {
  pList.splice(index, 1);
  localStorage.setItem("product", JSON.stringify(pList));
  displayProduct(pList);
}

function updateProduct(index) {
  pIndex = index;
  productName.value = pList[index].name;
  productPrice.value = pList[index].price;
  productCategory.value = pList[index].category;
  productDescription.value = pList[index].descrition;
  myBtn.innerHTML = "Update Product";
  myBtn.classList.replace("btn-outline-primary", "btn-outline-warning");
}

function searchProduct() {
  product = [];
  var term = productSearch.value;
  for (var i = 0; i < pList.length; i++) {
    if (pList[i].name.toLowerCase().includes(term.toLowerCase())) {
      console.log(pList[i].name.toLowerCase().includes(term.toLowerCase()));
      product.push(pList[i]);
    }
  }
  console.log(product);
  displayProduct(product, term);
}

function clearForm() {
  productName.value = "";
  productName.classList.remove("is-valid");
  productPrice.value = "";
  productPrice.classList.remove("is-valid");
  productCategory.value = "";
  productCategory.classList.remove("is-valid");
  productDescription.value = "";
  productDescription.classList.remove("is-valid");
}
function validationInput(element) {
  console.log(element.nextElementSibling);
  console.log(element.id, element.value);
  var regix = {
    productName: /[A-Za-z]{3,}/,
    productPrice: /^([1-4][0-9]{4}|50000)$/,
    productCategory: /^(mobile|tv|clothes|labtop)$/,
    productDescription: /^[A-Za-z]{20,}$/,
  };
  if (regix[element.id].test(element.value) == true) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.replace("d-block", "d-none");
    return true;
  } else {
    console.log("not match");
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    element.nextElementSibling.classList.replace("d-none", "d-block");
    return false;
  }
}
