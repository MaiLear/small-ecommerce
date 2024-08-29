<template>
  <main>
    <section class="w-100">
      <div class="w-100 mb-5" style="background-color: aliceblue">
        <p class="p-4 text-center fs-5">!Las mejores ofertas para ti</p>
      </div>

      <div class="d-flex w-100 justify-content-center card-container">
        <div
          class="w-50 gap-4"
          style="
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 2fr));
          "
        >
          <CardShop
            v-for="product in products"
            :product="product"
            @fetchService="fetchService"
            :key="product.id"
          />
        </div>
      </div>
      <div
        v-show="findProducts"
        class="w-100 d-flex justify-content-center align-items-center"
      >
        <h1 v-show="findProducts">Not Found Products</h1>
      </div>
    </section>
  </main>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import CardShop from "../components/CardShop.vue";
import FetchService from "@/services/FetchService.vue";
import { usePathStore } from "../stores/paths";

const fetchService = new FetchService();
let products = ref([]);
const fetchPath = ref(usePathStore().backendPaths.product.productPath);

const fetchOptions = {
  route: fetchPath.value,
  key: "products",
  fetchOptions: {},
  success: (response) => {
    console.log(response);
  },
  error: (err) => {
    console.log(err);
  },
};

onMounted(async () => {
  await fetchService.fetchAll(fetchOptions);
  products.value = fetchService.getResponse("products");
});

const findProducts = computed(() => {
  return !products.value || products.value.length === 0;
});
</script>

<style>


@media (max-width: 766px) {
  .card-container{
    margin-left: 3rem;
  }
}
</style>
