<template>
  <div class="container" style="margin-top: 80px">
    <p v-show="responseMessage" class="text-center fs-4 text-success">
      {{ responseMessage }}
    </p>
    <p v-show="errorMessage" class="text-center fs-4 text-danger">
      {{ errorMessage }}
    </p>
    <div class="w-100 row row-cols-1 row-cols-lg-2">
      <img :src="pathStore.path + product.image" alt="producto" />
      <div class="col">
        <h1>{{ product.name }}</h1>
        <p class="d-block fs-4">${{ product.price }}</p>
        <input
          type="number"
          id="quantity"
          class="d-block p-1 w-25"
          min="1"
          pattern="[0-9]"
          aria-label="Cantidad"
          v-model="quantityInput"
        />
        <span v-show="validateEmptyField">El campo quantity es requerido</span>
        <br />
        <button
          @click="
            async () => {
              await doShop(doSaleOptions);
            }
          "
          class="btn btn-dark text-light p-2 mt-2"
        >
          Realizar compra
        </button>
      </div>
      <div class="col">
        <p>
          Descripción del producto. Es el lugar ideal para agregar más
          información sobre tu producto como su tamaño, materiales,
          instrucciones de uso y mantenimiento.
        </p>
      </div>
      <div class="col">
        <h2>Informacion del producto</h2>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni
          ducimus, facilis iusto impedit totam soluta a est illum atque
          distinctio nobis in doloribus architecto praesentium porro, velit
          consequuntur maxime odit.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted, watch, computed } from "vue";
import { usePathStore } from "../stores/paths";
import { useCustomerStore } from "@/stores/customer";
import { useAuthStore } from "@/stores/auth";

import FetchService from "@/services/FetchService.vue";
import router from "@/router";

const pathStore = ref(usePathStore());
const customerStore = ref(useCustomerStore());
const authStore = ref(useAuthStore());
const route = useRoute();

const customer = ref(customerStore.value.getCustomer("customer"));
const token = ref(authStore.value.getToken("token"));


const handleToken = computed(()=>{
  token.value = authStore.value.getToken("token");
  if(!token.value) return false;
  return true;
})

const productId = route.params.id;
const customerId = customer.value.id;

const fetchService = new FetchService();
const product = ref([]);

const responseMessage = ref("");

const errorMessage = ref("");

const quantityInput = ref(1);
const salePath = ref(`${pathStore.value.backendPaths.sale.salePath}`);
const productPath = ref(
  `${pathStore.value.backendPaths.product.productPath}/${productId}`
);

const fetchOptionsDoSale = {
  route: salePath.value,
  key: "sale",
  fetchOptions: {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token.value}`,
    },
    body: "",
  },
  success: (response) => {
    responseMessage.value = response;
    setTimeout(() => {
      responseMessage.value = "";
    }, 3000);
  },
  error: (err) => {
    errorMessage.value = err.errors;

    setTimeout(() => {
      errorMessage.value = "";
    }, 3000);
  },
};

const fetchOptionsGetProduct = {
  route: productPath.value,
  key: "oneProduct",
  success: (response) => {
    product.value = response;
  },
  error: (err) => {
    console.log(err);
  },
};

const doSaleOptions = {
  attributesId: ["quantity"],
  valuesAditional: {
    product_id: parseInt(productId),
    customer_id: parseInt(customerId),
  },
  fetchOptionsDoSale,
};

onMounted(async () => {
  await fetchService.fetchAll(fetchOptionsGetProduct);
});


const validateEmptyField = computed(() => {
  return quantityInput.value <= 0;
});

const createFormData = (attributesId, valueAditional = {}) => {
  const formData = new FormData();

  for (let i in valueAditional) {
    formData.append(i, valueAditional[i]);
  }

  for (let i = 0; i < attributesId.length; i++) {
    const id = attributesId[i];
    const element = document.getElementById(id);
    if (!element) continue;
    let elementValue =
      element.tagName == "INPUT" ? element.value : element.textContent;
    formData.append(id, elementValue);
  }
  return formData;
};

const doShop = async (options) => {
  let { attributesId, valuesAditional = {}, fetchOptionsDoSale } = options;

  if(!handleToken.value){
    router.push({name:'login'})
    return;
  }

  const formData = createFormData(attributesId, valuesAditional);
  fetchOptionsDoSale.fetchOptions.body = formData;
  await fetchService.fetchAll(fetchOptionsDoSale);

};
</script>

<style></style>
