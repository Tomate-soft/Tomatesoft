export const formatPrice = (price: string) => {
   if(price === "ON_SITE") return "Restaurante"
   if(price === "TOGO") return "Para llevar"
   if(price === "RAPPI") return "Rappi"
   if(price === "PHONE") return "Telefonico"
   if(price === "PRICE_LIST_FIVE") return "Lista 5"
   if(price === "PRICE_LIST_SIX") return "Lista 6"
   if(price === "PRICE_LIST_SEVEN") return "Lista 7"
   if(price === "PRICE_LIST_EIGHT") return "Lista 8"
   if(price === "PRICE_LIST_NINE") return "Lista 9"
   if(price === "PRICE_LIST_TEN") return "Lista 10"
}