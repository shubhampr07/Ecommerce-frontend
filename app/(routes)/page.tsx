import getBillboard from "@/actions/get-billboard"
import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list";
import Billboard from "@/components/ui/billboard"
import Container from "@/components/ui/container"

export const revalidate = 0;

const HomePage = async () => {

  const products = await getProducts({ isFeatured: true });
  const billboard = await getBillboard("8d5a9a6a-70f4-4422-8804-fa3d41bcbb76");

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />
      </div>
      <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
        <ProductList title="Featured products" items={products}  />
      </div>
    </Container>
  )
}

export default HomePage