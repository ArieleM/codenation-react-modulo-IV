const promotions = ['SINGLE LOOK', 'DOUBLE LOOK', 'TRIPLE LOOK', 'FULL LOOK'];

// Realiza uma busca pelos ids e armazena todos os dados de cada objeto
function filterIds(ids, productsList) {
	return ids.map(id => productsList.find(producto => producto.id === id));
}

// Filtra o nome e a categoria de cada produto do carrinho.
function infoProducts(products) {
	return products.map(produto => {
		return {
			name: produto.name,
			category: produto.category
		}
	});
}

// Retorna as categorias diferentes encontradas
function getCategory(products) {

	let categorias = [];
	products.map(product => {
		if (!categorias.includes(product.category)) {
			categorias.push(product.category)
		}
	});
	return categorias
}
// Retorna a categoria de promoção que será aplicada no carrinho
function getCategoryPromotion(categorys) {
	return promotions[categorys.length - 1];
}

// Armazena o preço caso exista promoção, do contrário armazena o preço regular para casa produto 
function getPrice(produto, categoria) {
	const prod = produto.promotions.filter(cat => cat.looks.includes(categoria));
	if (prod.length == 1) {
		return prod[0].price

	} else {
		return produto.regularPrice
	}
}

// Realiza a soma dos preços do carrinho
function totalPricePromotions(produtos, categoria) {
	const total = produtos.reduce((sum, product) => {
		return sum + getPrice(product, categoria)
	}, 0)
	return total.toFixed(2);
}

function totalRegularPrice(products) {
	const price = products.reduce((sum, product) => {
		return sum + product.regularPrice;
	}, 0)
	return price.toFixed(2);
}

function totalDiscountValue(totalPrice, totalPromotions) {
	return (totalPrice - totalPromotions).toFixed(2);
}

function calcDiscountPercentage(totalDiscount, totalPrice) {
	return totalDiscount / totalPrice * 100
}

function getShoppingCart(ids, productsList) {
	const produtos = filterIds(ids, productsList);
	products = infoProducts(produtos);
	const categorias = getCategory(produtos);
	promotion = getCategoryPromotion(categorias);
	const regularPrice = totalRegularPrice(produtos);
	const total = totalPricePromotions(produtos, promotion)
	totalPrice = total;
	discountValue = totalDiscountValue(regularPrice, total)
	const discount = calcDiscountPercentage(discountValue, regularPrice).toFixed(2) + '%';

	return {
		products,
		promotion,
		totalPrice,
		discountValue,
		discount
	}
}

module.exports = {
	getShoppingCart
};