/// <reference path="../../5-else/ts/libs/jquery.d.ts" />
declare var Vue: any;
declare var VueMaterial: any;

// Main
Vue.use(VueMaterial);

Vue.material.registerTheme({
	default: {
		accent: 'yellow',
		primary: {
			color: 'yellow',
			hue: 700,
		},
	},
});

let json = 'https://api.mongolab.com/api/1/databases/dyscatalog/collections/products?apiKey=508eb961e4b0c54ca4492fad';

function fetchData() {
	let self = this;
	$.get(json, function(data) {
		return data[0];
		// self.items = data;
	});
}

let listOfProducts = [];
console.log(JSON.stringify(listOfProducts, undefined, 2));

new Vue({
	computed: {
		filteredList() {
			let searchTerm = this.filterName.toLowerCase();
			let searchCat = this.filterCat;
			let result = this.products.sort(function (a, b) {
				// sort A-Z
				if (a.name < b.name) {
					return -1;
				}

				if (a.name > b.name) {
					return 1;
				}

				return 0;
			});

			function isTermSearched(item) {
				let itemName  = item.name.toLowerCase();
				let itemDesc  = item.description.toLowerCase();
				let itemPrice = item.price.toLowerCase();
				let itemOs    = item.os.toLowerCase();
				if (itemName.includes(searchTerm) || itemDesc.includes(searchTerm) || itemPrice === searchTerm || itemOs.includes(searchTerm) ) {
					return item;
				}
			}

			function isCatSearched(item) {
				// if the user search is include in the title or the description of each product
				let itemCatName = item.categories[0].name;
				if (searchCat === 'Toutes catégories') {
					return item;
				} else if (itemCatName.includes(searchCat)) {
					return item;
				}
			}

			function isTermAndCatSearched(item) {
				let tempItemCat = isCatSearched(item);
				let tempItemTerm = isTermSearched(item);

				if ( tempItemCat !== undefined && tempItemTerm !== undefined && tempItemCat.name === tempItemTerm.name ) {
					return item;
				}
			}

			if (this.filterName && this.filterCat !== 'Toutes catégories') {
				return result.filter(isTermAndCatSearched);
			} else if (this.filterName) {
				return result.filter(isTermSearched);
			} else if (this.filterCat) {
				return result.filter(isCatSearched);
			} else {
				return result;
			}
		},
	},
	data: {
		filterCat: 'Toutes catégories',
		filterName: '',
		'products': listOfProducts,
		show: true,
	},
	el: '#app',
	methods: {
		getFullName: function () {
			//return this.firstName + ' ' + this.lastName;
		},
		toggleLeftSidenav() {
			this.$refs.leftSidenav.toggle();
		},
		open(ref) {
			console.log('Opened: ' + ref);
		},
		close(ref) {
			console.log('Closed: ' + ref);
		},
		openDialog(ref) {
			this.$refs[ref].open();
		},
		closeDialog(ref) {
			this.$refs[ref].close();
		},
		onOpen() {
			console.log('Opened');
		},
		onClose(type) {
			console.log('Closed', type);
		},
		pluralize(word, number) {
			if ( number >= 2 ) {
				return word + 's';
			} else {
				return word;
			}
		},
	},
});

let vm = new Vue({
    methods: {
		addClassAnimate() {
			$('.C--dys-product li').css('max-height', '0');
			$('.C--dys-product li').css('opacity', '0');
			$('.C--dys-product li').delay(2000).each(function (i, element) {
				$(element).delay(i * 250).queue(function (next) {
					$(this).animate({'max-height': '600px', 'opacity' : '1'}, 1000);
					next();
				});
			});
		},
    },
});

vm.addClassAnimate();
