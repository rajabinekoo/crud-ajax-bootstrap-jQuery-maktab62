let baseurl = (page) => `https://reqres.in/api/users?page=${page}`;
let dataset = [];
let page = 1;
let perpage = null;
let total_pages = null;

// function ajaxCallback(response) {
//   if (!total_pages) total_pages = response.total_pages;
//   if (!perpage) perpage = response.per_page;
//   dataset.push(...response.data);
//   request(response.page, response.total_pages);
// }
// function ajaxCallbackError(error) {
//   alert(error);
// }

// function request(page = 0, total_pages) {
//   if (page !== total_pages) {
//     $.ajax({
//       type: "GET",
//       url: baseurl(page + 1),
//       success: ajaxCallback,
//       error: ajaxCallbackError,
//     });
//   } else {
//     console.log(dataset);
//     render();
//   }
// }

async function request() {
  try {
    const response1 = await fetch(baseurl(1));
    const result1 = await response1.json();
    perpage = result1.per_page;
    total_pages = result1.total_pages;
    dataset.push(...result1.data);
    for (let index = 2; index <= result1.total_pages; index++) {
      const response2 = await fetch(baseurl(index));
      const result2 = await response2.json();
      dataset.push(...result2.data);
    }
    render();
  } catch (error) {
    console.log(error);
  }
}

request();
