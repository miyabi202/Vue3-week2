import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
const baseUrl = "https://vue3-course-api.hexschool.io/v2/";

const app = {
  data(){
    return {
      user: {
        username: '',
        password: ''
      },
    }
  },
  methods: {
    login(){
      const signinApi = `${baseUrl}admin/signin`;
      //在 login 方法中，首先構建了一個要發送登入請求的 API 地址 signinApi，
      //這個地址從 baseUrl 和 /admin/signin 組合而成。
      axios.post(signinApi, this.user)
        .then((res) => {
          const { expired, token } = res.data;
          //將 token 存進 cookie
          //s.data 是從伺服器回應中獲取的資料物件。
          //這個資料物件可能包含了一些重要的資訊，其中包括 expired 和 token。
          //通過解構賦值的方式，將 res.data 中的 expired 和 token 屬性分別賦值給了 
          //expired 和 token 這兩個變數。
          
          
          
          document.cookie = `yanaToken=${token}; expires=${new Date(expired)};`;
          window.location = 'index.html'

          //這兩行程式碼主要是用於處理從後端獲取到的 token。
//第一行 document.cookie = yanaToken=${token}; expires=${new Date(expired)};`` 是在客戶端將 token 存儲到 cookie 中。在這裡，yanaToken 是 cookie 的名稱，token 是從後端獲取的身份驗證 token，expires 是指定 cookie 的過期時間。在這裡，new Date(expired) 用於將後端返回的 expired 時間轉換為 JavaScript 的日期對象，這樣可以確保 cookie 在指定的過期時間之後自動失效。

//第二行 window.location = 'index.html' 是用於將用戶重定向到登入成功後的首頁或其他指定的頁面。當用戶登入成功並且 token 已經存儲到 cookie 中後，通常會將用戶重定向到應用程序的主頁面或者其他需要身份驗證的頁面。

//總結起來，這兩行程式碼的作用是在用戶成功登入後，將從後端獲取到的 token 存儲到 cookie 中，同時將用戶重定向到指定的頁面。這樣就完成了用戶登入的流程。

        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    }
  }
};
createApp(app).mount("#app");
