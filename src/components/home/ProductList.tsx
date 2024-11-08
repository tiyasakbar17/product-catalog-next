import { formatCurrency } from "@/utils/currency.util";
import Image from "next/image";

export interface IProduct {
  id: number;
  name: string;
  price: number;
  image?: string;
  description: string;
  quantity: number;
}

type Props = {
  products: IProduct[];
};

export function ProductList({ products }: Props) {
  return (
    <section className="px-5 sm:p-0 w-full mt-[30px] mb-3">
      <h3 className="text-2xl mb-6">Products</h3>
      <div className="flex flex-wrap w-full gap-[20px] justify-between after:content('') after:w-[220px]">
        {products.map((item) => (
          <div className="w-[47%] sm:w-[220px] h:auto sm:h-[310px] bg-white rounded-md border-gray-300 border px-[10px] py-[9px] cursor-pointer overflow-hidden">
            <div className="w-full aspect-square bg-green-300 relative">
              <Image
                fill
                src={item.image || `https://picsum.photos/id/${item.id}/200/200`}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="pt-[14px] flex flex-col">
              <span className="font-semibold">{item.name}</span>
              <span>{formatCurrency(item.price)}</span>
              <span className="text-gray-500">
                {item.description.slice(0, 20)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
