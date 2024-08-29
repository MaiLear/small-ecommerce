import FetchService from "@/services/FetchService.vue";

const fetchService = new FetchService();

const createFormData = ($form) => {
  const $inputs = $form.querySelectorAll("input");
  console.log($inputs);
  const formData = new FormData();
  $inputs.forEach((input) => {
    console.log(input.name);
    formData.append(input.name, input.value);
  });
  return formData;
};

export const post = async (fetchOptions, $form) => {
  const formData = createFormData($form);
  fetchOptions.fetchOptions.body = formData;
  await fetchService.fetchAll(fetchOptions);
};

export const handleSubtmit = async (e, fetchOptions, invalidate = false) => {
  if (invalidate) return;
  const $form = e.target.closest("form");
  await post(fetchOptions, $form);
};
