import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
const baseUrl = "https://vue3-course-api.hexschool.io/v2/";
const apiPath = 'yana';

const app = {
  data(){
    return {
      tempProduct: {},
      products: {}
    }
  },
  methods: {
    checkAdmin() {
      const url = `${baseUrl}api/user/check`;
      axios.post(url)
        .then(() => {
          this.getProducts();
        })
        .catch((err) => {
          alert(err.response.data.message);
          window.location = 'login.html';
        })
    },
    getProducts(){
      const url = `${baseUrl}api/${apiPath}/admin/products/all`;
      axios.get(url)
        .then((res) => {
          this.products = res.data.products;
        })
        .catch((err) => {
          alert(err.response.data.message);
        })
    },
    openProduct(item) {
      this.tempProduct = item;
    }
  },

  //getProducts 方法用於從後端獲取產品列表，它發送了一個 GET 請求到後端的 /api/${apiPath}/admin/products/all 端點，
  //並將獲取到的產品資料存儲到 products 屬性中。
//openProduct 方法用於打開單個產品，它接受一個產品項目作為參數，並將該產品資料存儲到 tempProduct 屬性中。
  mounted(){
    //取出 token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)yanaToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;
    this.checkAdmin()
  }
}
createApp(app).mount('#app');
/***|^.*$：如果之前的匹配失敗（即沒有找到 yanaToken），則匹配整個 cookie 字符串。
這樣的正則表達式能夠保證提取出來的 token 符合 yanaToken=value 的格式。

axios.defaults.headers.common.Authorization = token;：這行程式碼設置了 
axios 的默認請求標頭中的 Authorization 屬性為 token，即將 token 攜帶在每一個
後端請求的標頭中，以便後端能夠識別用戶的身份。 
this.checkAdmin()：這行程式碼調用了 Vue 實例中的 checkAdmin 方法，用於檢查用戶是否是管理員。在 checkAdmin 方法中，它發送了一個 POST 請求到後端的 /api/user/check 端點，用於檢查用戶的身份，並根據返回的結果執行相應的操作。** */
