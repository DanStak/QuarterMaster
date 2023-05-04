import {StockroomCreateForm} from "@/components/StockroomCreateForm";
import {ProductItemForm} from "@/components/ProductItemForm";

export default async function Home() {

  return (
      <div style={{backgroundColor: 'red'}}>
            Strona główna

          <StockroomCreateForm/>

          <ProductItemForm productId='aaa'/>
      </div>
  )
}
