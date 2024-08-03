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
            const total = this.items.reduce((sum, item) => sum + (item.qty*item.rate), 0);
            return Math.round(total);
        },
        pdf: function() {
            window.print();
        },
        totalInWords: function() {
            num = this.total();

            if (num === 0) return "Zero";

            const units = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
            const teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
            const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
            const thousands = ["", "Thousand", "Million", "Billion", "Trillion"];
        
            let words = '';
        
            function getChunk(num) {
                let chunk = '';
        
                if (num >= 100) {
                    chunk += units[Math.floor(num / 100)] + " Hundred ";
                    num %= 100;
                }
        
                if (num >= 20) {
                    chunk += tens[Math.floor(num / 10)] + " ";
                    num %= 10;
                } else if (num >= 10) {
                    chunk += teens[num - 10] + " ";
                    num = 0;
                }
        
                chunk += units[num];
        
                return chunk.trim();
            }
        
            let chunkIndex = 0;
        
            while (num > 0) {
                let chunk = num % 1000;
                if (chunk > 0) {
                    words = getChunk(chunk) + " " + thousands[chunkIndex] + " " + words;
                }
                num = Math.floor(num / 1000);
                chunkIndex++;
            }
        
            return words.trim();
        },
        roundoff: function(num, power = 0) {
            return (Math.round(num*10**power)/(10**power));
        }
    },
  setup() {
    const invoiceNumber = ref(1);
    const screen = ref(0);
    const now = new Date();
    const invoiceDate = ref(`${now.getFullYear()}-${leadingZero(now.getMonth()+1,2)}-${now.getDate()}`);
    const partyName = ref('');
    const remarks = ref('');
    const items = ref([{detail: '',qty: 1,rate: 0}]);
    return {
        screen,
        invoiceNumber,
        invoiceDate,
        partyName,
        items,
        remarks
    };
  }
}).mount('#app')
