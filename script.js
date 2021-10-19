const CORE_API_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
const GET_GOODS_URL = "/catalogData.json";
const GET_BASKET_GOODS_URL = "/getBasket.json ";


const GOODS = [
  { title: 'Shirt', price: 150 },
  { title: 'Socks', price: 50 },
  { title: 'Jacket', price: 350 },
  { title: 'Shoes', price: 250 },
]


const transformGoods = function (goods) {
  return goods.map((_good) => {
    return {
      id: _good.id_product,
      title: _good.product_name,
      price: _good.price
    }
  })
}

const service = (method, postfix) => (
  new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, `${CORE_API_URL}${postfix}`, true);
    xhr.send();
    xhr.onload = (event) => {
      resolve(JSON.parse(event.target.response));
    }
  })
);

// --------------------------------

Vue.component('custom-button', {
  data: function () {
    return {
      style: {
        backgroundImage: 'linear-gradient(45deg, #6ab1d7 0%, #33d9de 50%, #002878 100%',
        border: '3px solid #002878',
        padding: '10px',
        borderRadius: '50px',
        cursor: 'pointer'
      }
    }
  },
  template: `
    <button :style="style" @click="$emit('click')">
      <slot></slot>
    </button>
  `
})

// -------------------------------------

Vue.component('basket-goods-item', {
  props: ['item'],
  data: function () {
    return {
      style: {
        padding: '10px',
        display: 'grid',
        gridTemplateColumns: 'min-content 1fr min-content'
      }
    }
  },
  template: `
    <div class="basket-goods-item" :style="style">
      <div>{{ item.title }}</div>
      <div></div>
      <div>{{ item.price }}</div>
    </div>

  `
});
// -------------------------------------

Vue.component('basket-card', {
  props: ['textHeader'],
  data: function () {
    return {
      styles: {
        root: {
          display: 'grid',
          gridTemplateRows: 'min-content 1fr min-content'
        },
        header: {
          padding: '20px',
          background: 'grey'
        }
      },
      basketGoods: []
    }
  },
  template: `
    <div class="basket-card" :style="styles.root">
      <div :style="styles.header">
         <slot name="header"></slot>
      </div>
      <div>
         <slot></slot>
      </div>
      <div :style="styles.header">
         <slot name="footer"></slot>
      </div>
    </div>
  `
});

// -------------------------------------

Vue.component('goods-item', {
  props: ['item'],
  template: `
      <div class="goods-item">
         <div>{{ item.title }}</div>
         <div>
            {{ item.price }}
         </div>
         <div>
            <custom-button>добавить</custom-button>
         </div>
      </div>
  `,
});

// -------------------------------------

const app = new Vue({
  el: '#app',
  data: {
    styles: {
      border: "1px solid blue"
    },
    goods: GOODS,
    filteredGoods: GOODS,
    basketCardVision: false,
    search: ''
  },

  mounted: function () {
    service('GET', GET_GOODS_URL).then((goods) => {
      const resultGoods = transformGoods(goods);
      this.goods = resultGoods;
      this.filteredGoods = resultGoods;
    })
  },

  methods: {
    filterGoods: function (event) {
      this.filteredGoods = this.goods.filter(({ title }) => {
        return new RegExp(this.search, 'i').test(title);
      })
    },
    openCard: function () {
      this.basketCardVision = true;
    },
    closeCard: function () {
      this.basketCardVision = false;
    }
  }

});



