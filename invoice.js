const { createApp, ref, computed } = Vue

const leadingZero = (val, size) => {
    const l = size - (`${val}`).length;
    return Array.from(new Array(l)).map(i => '0').join('') + val;
}

createApp({
    methods: {
        removeItem: function(index) {
            this.items.splice(index, 1);
        },
        back: function() {
            this.screen = 0;
        },
        submitForm: function() {
            this.screen = 1;
        },
        addItem: function() {
            this.items.push({ detail: '', qty: 1, rate: 0 });
        },
        date2display: function() {
            const dt = new Date(this.invoiceDate);
            return `${dt.getDate()}-${leadingZero(dt.getMonth()+1,2)}-${dt.getFullYear()}`;
        },
        inNumDisplay: function() {
            return leadingZero(this.invoiceNumber, 4);
        },
        total: function() {
            return this.items.reduce((sum, item) => sum + (item.qty*item.rate), 0);
        },
        pdf: function() {
            window.print();
        }

    },
  setup() {
    const invoiceNumber = ref(1);
    const screen = ref(0);
    const now = new Date();
    const invoiceDate = ref(`${now.getFullYear()}-${leadingZero(now.getMonth()+1,2)}-${now.getDate()}`);
    const partyName = ref('');
    const items = ref([{ detail: 'Sample', qty: 1, rate: 0 }]);
    return {
        screen,
        invoiceNumber,
        invoiceDate,
        partyName,
        items,
    };
  }
}).mount('#app')
